import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  ContactMessage,
  getAdminPasscode,
  getMessages,
  saveMessages,
  addMessage,
  isAuthorizedRequest,
} from "../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 100, email: 200, topic: 80, message: 4000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function GET(req: Request) {
  if (!(await isAuthorizedRequest(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const messages = await getMessages();
  return NextResponse.json({ messages });
}

export async function PATCH(req: Request) {
  if (!(await isAuthorizedRequest(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const messages = await getMessages();

    if (body.markAllRead) {
      const updated = messages.map((m) => (m.status === "unread" ? { ...m, status: "read" as const } : m));
      await saveMessages(updated);
      return NextResponse.json({ ok: true, messages: updated });
    }

    const id = String(body.id ?? "");
    const status: ContactMessage["status"] =
      body.status === "read" || body.status === "replied" || body.status === "unread" ? body.status : "read";
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    await saveMessages(updated);
    return NextResponse.json({ ok: true, messages: updated });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthorizedRequest(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const messages = await getMessages();
    const updated = id ? messages.filter((m) => m.id !== id) : messages;
    await saveMessages(updated);
    return NextResponse.json({ ok: true, messages: updated });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const topic = clean(body.topic, MAX.topic) || "General enquiry";
  const message = clean(body.message, MAX.message);

  if (!name || !message || message.length < 10) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const entry: ContactMessage = {
    id: crypto.randomBytes(6).toString("hex"),
    timestamp: new Date().toISOString(),
    name,
    email,
    topic,
    message,
    status: "unread",
  };

  // Save to persistent storage
  await addMessage(entry);

  const to = process.env.CONTACT_TO_EMAIL || "ptech8000@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "P-TECH Website <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: oneLine(`[P-TECH site] ${topic} — ${name}`),
          text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n`,
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, id: entry.id, delivery: "resend" });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json({ ok: true, id: entry.id, delivery: "dashboard" });
}
