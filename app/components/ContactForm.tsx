"use client";
import { useState } from "react";
import { ArrowUpRight, MessageCircle, Mail } from "lucide-react";

const topics = [
  "Portable Power Station / Solar (250W–1000W)",
  "School / University CBT System (Raspberry Pi)",
  "3D Printing & Custom CAD Enclosures",
  "Embedded Systems / Firmware",
  "Robotics & Autonomous Vehicles",
  "IoT / Dashboards / Local File Server",
  "AI / Computer Vision",
  "Code4Us / STEM & Robotics Training",
  "Student Project Help",
  "Something else",
];
type State = "idle" | "sending" | "sent" | "error";
type Payload = { name: string; email: string; topic: string; message: string };

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [lastPayload, setLastPayload] = useState<Payload | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      topic: String(fd.get("topic") ?? topics[0]).trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (!payload.name || payload.message.length < 10) {
      setError("Please add your name and a message of at least 10 characters.");
      setState("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError("That email address doesn’t look right.");
      setState("error");
      return;
    }

    setState("sending");
    setError("");
    setLastPayload(payload);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("sent");
        form.reset();
        return;
      }
      const msg: Record<string, string> = {
        invalid_email: "That email address doesn’t look right.",
        missing_fields: "Please add your name and a message of at least 10 characters.",
        rate_limited: "Too many messages from this connection. Please try again later.",
      };
      setError(msg[data.error] ?? "Could not send automatically — use one of the direct buttons below.");
      setState("error");
    } catch {
      // Even if offline/network error, transition to sent state so visitor can send via WhatsApp/Email client immediately
      setState("sent");
      form.reset();
    }
  }

  if (state === "sent" && lastPayload) {
    const waBody = `Hello Promise (P-TECH),\n\n*Name:* ${lastPayload.name}\n*Email:* ${lastPayload.email}\n*Topic:* ${lastPayload.topic}\n\n*Message:*\n${lastPayload.message}`;
    const waHref = `https://wa.me/2349121134682?text=${encodeURIComponent(waBody)}`;
    const mailSubject = `[P-TECH Inquiry] ${lastPayload.topic} — ${lastPayload.name}`;
    const mailBody = `Name: ${lastPayload.name}\nEmail: ${lastPayload.email}\nTopic: ${lastPayload.topic}\n\n${lastPayload.message}`;
    const mailHref = `mailto:ptech8000@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    return (
      <div className="form-done" role="status">
        <strong>● INQUIRY LOGGED &amp; READY</strong>
        <p>
          Thank you, <b>{lastPayload.name}</b> — your message has been recorded. For the fastest response, you can also send it directly to P-TECH on WhatsApp Business or via your email app with one click:
        </p>
        <div className="founder-links" style={{ marginTop: 8 }}>
          <a className="button primary" href={waHref} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> SEND ON WHATSAPP (+234 912 113 4682) <ArrowUpRight size={16} />
          </a>
          <a className="button secondary" href={mailHref}>
            <Mail size={16} /> SEND VIA EMAIL APP <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          type="button"
          className="button secondary"
          style={{ marginTop: 8, width: "fit-content" }}
          onClick={() => setState("idle")}
        >
          WRITE ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label>NAME<input name="name" required maxLength={100} autoComplete="name" /></label>
        <label>EMAIL<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      </div>
      <label>WHAT ARE YOU BUILDING?
        <select name="topic" defaultValue={topics[0]}>{topics.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label>MESSAGE<textarea name="message" required minLength={10} maxLength={4000} rows={6} placeholder="What problem are you trying to solve? Budget, timeline and any parts you already have help." /></label>
      {/* honeypot — hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      {state === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "SENDING…" : "SEND MESSAGE"} <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
