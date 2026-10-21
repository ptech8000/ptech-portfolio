import { NextResponse } from "next/server";
import { readFile, writeFile, appendFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type ContactMessage = {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "unread" | "read" | "replied";
};

const LOG_PATH = path.join(process.cwd(), "contact-submissions.jsonl");
const ADMIN_PASSCODE = process.env.ADMIN_PASSWORD || "ptech8000";

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

function isAuthorized(req: Request) {
  const key = req.headers.get("x-admin-key") ?? "";
  return key === ADMIN_PASSCODE;
}

async function readMessages(): Promise<ContactMessage[]> {
  try {
    const raw = await readFile(LOG_PATH, "utf8");
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    let mutated = false;
    const parsed: ContactMessage[] = [];

    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        const id =
          typeof obj.id === "string" && obj.id
            ? obj.id
            : crypto
                .createHash("sha1")
                .update(`${obj.timestamp ?? ""}:${obj.email ?? ""}:${obj.message ?? ""}`)
                .digest("hex")
                .slice(0, 12);
        const status: ContactMessage["status"] =
          obj.status === "read" || obj.status === "replied" ? obj.status : "unread";
        if (!obj.id || !obj.status) mutated = true;
        parsed.push({
          id,
          timestamp: String(obj.timestamp ?? new Date().toISOString()),
          name: String(obj.name ?? "Anonymous"),
          email: String(obj.email ?? ""),
          topic: String(obj.topic ?? "General enquiry"),
          message: String(obj.message ?? ""),
          status,
        });
      } catch {
        // Ignore malformed line
      }
    }

    if (mutated) {
      await writeMessages(parsed);
    }

    return parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch {
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]) {
  const content = messages.map((m) => JSON.stringify(m)).join("\n") + (messages.length ? "\n" : "");
  await writeFile(LOG_PATH, content, "utf8");
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const messages = await readMessages();
  return NextResponse.json({ messages });
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const messages = await readMessages();
    if (body.markAllRead) {
      const updated = messages.map((m) => (m.status === "unread" ? { ...m, status: "read" as const } : m));
      await writeMessages(updated);
      return NextResponse.json({ ok: true, messages: updated });
    }
    const id = String(body.id ?? "");
    const status: ContactMessage["status"] =
      body.status === "read" || body.status === "replied" || body.status === "unread" ? body.status : "read";
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    await writeMessages(updated);
    return NextResponse.json({ ok: true, messages: updated });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const messages = await readMessages();
    const updated = id ? messages.filter((m) => m.id !== id) : messages;
    await writeMessages(updated);
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

  try {
    await appendFile(LOG_PATH, JSON.stringify(entry) + "\n", "utf8");
  } catch {
    // Ignore on read-only filesystem
  }

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
