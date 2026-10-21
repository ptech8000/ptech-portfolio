"use client";
import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  Mail,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Download,
  Lock,
  LogOut,
  Search,
  Copy,
  Check,
  Inbox,
  Clock,
} from "lucide-react";

type ContactMessage = {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "unread" | "read" | "replied";
};

type Filter = "all" | "unread" | "read" | "replied";

export default function DashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMessages = useCallback(async (key: string) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/contact", {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });
      if (res.status === 401) {
        setAuthError("Invalid admin passcode.");
        setSavedKey(null);
        sessionStorage.removeItem("ptech_admin_key");
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
        setSavedKey(key);
        sessionStorage.setItem("ptech_admin_key", key);
      }
    } catch {
      setAuthError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("ptech_admin_key");
    if (stored) {
      fetchMessages(stored);
    }
  }, [fetchMessages]);

  useEffect(() => {
    if (!savedKey) return;
    const timer = setInterval(() => {
      fetchMessages(savedKey);
    }, 15000);
    return () => clearInterval(timer);
  }, [savedKey, fetchMessages]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    await fetchMessages(passcode.trim());
  }

  function onLogout() {
    sessionStorage.removeItem("ptech_admin_key");
    setSavedKey(null);
    setPasscode("");
    setMessages([]);
  }

  async function updateStatus(id: string, status: ContactMessage["status"]) {
    if (!savedKey) return;
    const res = await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": savedKey },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.messages)) setMessages(data.messages);
    }
  }

  async function markAllRead() {
    if (!savedKey) return;
    const res = await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": savedKey },
      body: JSON.stringify({ markAllRead: true }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.messages)) setMessages(data.messages);
    }
  }

  async function deleteMessage(id: string) {
    if (!savedKey) return;
    const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-key": savedKey },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.messages)) setMessages(data.messages);
    }
  }

  function copyEmail(id: string, email: string) {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function exportCsv() {
    const header = ["ID", "Timestamp", "Status", "Name", "Email", "Topic", "Message"];
    const rows = messages.map((m) =>
      [m.id, m.timestamp, m.status, m.name, m.email, m.topic, m.message]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ptech-messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const readCount = messages.filter((m) => m.status === "read").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  const filtered = messages.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.topic.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <main>
      <Nav />
      <section className="section container">
        {!savedKey ? (
          <div className="dash-auth-card">
            <span className="eyebrow">
              <Lock size={13} style={{ display: "inline", marginRight: 6 }} />
              P-TECH ADMIN CONSOLE
            </span>
            <h1>MESSAGES DASHBOARD</h1>
            <p>Enter your P-TECH admin passcode to view and manage inquiries sent from the Contact page.</p>
            <form onSubmit={onLogin} className="dash-auth-form">
              <label>
                ADMIN PASSCODE
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode (default: ptech8000)"
                  required
                  autoFocus
                />
              </label>
              {authError && <p className="form-error">{authError}</p>}
              <button type="submit" className="button primary" disabled={loading}>
                {loading ? "VERIFYING…" : "UNLOCK DASHBOARD"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="dash-top">
              <div>
                <span className="eyebrow">P-TECH ADMIN / INBOX</span>
                <h1 className="page-title" style={{ margin: "12px 0 8px" }}>
                  CONTACT MESSAGES
                </h1>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  Live inbox for all inquiries submitted through the P-TECH Contact form.
                </p>
              </div>
              <div className="dash-actions">
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => fetchMessages(savedKey)}
                  disabled={loading}
                >
                  <RefreshCw size={15} /> {loading ? "SYNCING…" : "REFRESH"}
                </button>
                {unreadCount > 0 && (
                  <button type="button" className="button secondary" onClick={markAllRead}>
                    <CheckCircle2 size={15} /> MARK ALL READ
                  </button>
                )}
                {messages.length > 0 && (
                  <button type="button" className="button secondary" onClick={exportCsv}>
                    <Download size={15} /> EXPORT CSV
                  </button>
                )}
                <button type="button" className="button secondary" onClick={onLogout}>
                  <LogOut size={15} /> LOCK
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="stats" style={{ marginBottom: 32 }}>
              <div>
                <strong>{messages.length}</strong>
                <span>TOTAL INQUIRIES</span>
              </div>
              <div>
                <strong style={{ color: unreadCount > 0 ? "var(--accent)" : "var(--text)" }}>
                  {unreadCount}
                </strong>
                <span>UNREAD MESSAGES</span>
              </div>
              <div>
                <strong>{readCount}</strong>
                <span>READ</span>
              </div>
              <div>
                <strong style={{ color: "var(--success)" }}>{repliedCount}</strong>
                <span>REPLIED</span>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="dash-toolbar">
              <div className="filter-row" style={{ margin: 0 }}>
                {(
                  [
                    ["all", "ALL", messages.length],
                    ["unread", "UNREAD", unreadCount],
                    ["read", "READ", readCount],
                    ["replied", "REPLIED", repliedCount],
                  ] as const
                ).map(([key, label, count]) => (
                  <button
                    key={key}
                    type="button"
                    className={filter === key ? "on" : ""}
                    onClick={() => setFilter(key)}
                  >
                    {label} <sup>{count}</sup>
                  </button>
                ))}
              </div>

              <div className="dash-search">
                <Search size={15} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, email, topic, or message…"
                />
              </div>
            </div>

            {/* Messages List */}
            {filtered.length === 0 ? (
              <div className="dash-empty">
                <Inbox size={32} />
                <h3>NO MESSAGES FOUND</h3>
                <p>
                  {messages.length === 0
                    ? "New messages sent from the /contact page will appear here automatically."
                    : "No messages match your current filter or search query."}
                </p>
              </div>
            ) : (
              <div className="dash-list">
                {filtered.map((m) => {
                  const dateStr = new Date(m.timestamp).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const replySubject = `Re: [P-TECH Inquiry] ${m.topic}`;
                  const replyBody = `Hello ${m.name},\n\nThank you for contacting P-TECH regarding "${m.topic}".\n\n---\nYour original message:\n${m.message}\n`;
                  const mailtoHref = `mailto:${m.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;

                  return (
                    <article
                      key={m.id}
                      className={`dash-msg-card ${m.status === "unread" ? "is-unread" : ""}`}
                    >
                      <div className="dash-msg-header">
                        <div className="dash-msg-badges">
                          <span className={`dash-status-pill ${m.status}`}>
                            ● {m.status.toUpperCase()}
                          </span>
                          <span className="exp-badge" style={{ margin: 0 }}>
                            {m.topic}
                          </span>
                        </div>
                        <span className="dash-msg-time">
                          <Clock size={12} /> {dateStr}
                        </span>
                      </div>

                      <div className="dash-msg-sender">
                        <div>
                          <h3>{m.name}</h3>
                          <a href={`mailto:${m.email}`} className="dash-msg-email">
                            {m.email}
                          </a>
                        </div>
                      </div>

                      <div className="dash-msg-body">{m.message}</div>

                      <div className="dash-msg-footer">
                        <a
                          href={mailtoHref}
                          className="button primary"
                          onClick={() => updateStatus(m.id, "replied")}
                        >
                          <Mail size={15} /> REPLY VIA EMAIL
                        </a>
                        <button
                          type="button"
                          className="button secondary"
                          onClick={() => copyEmail(m.id, m.email)}
                        >
                          {copiedId === m.id ? <Check size={15} /> : <Copy size={15} />}
                          {copiedId === m.id ? "COPIED" : "COPY EMAIL"}
                        </button>
                        {m.status === "unread" ? (
                          <button
                            type="button"
                            className="button secondary"
                            onClick={() => updateStatus(m.id, "read")}
                          >
                            <CheckCircle2 size={15} /> MARK READ
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="button secondary"
                            onClick={() => updateStatus(m.id, "unread")}
                          >
                            MARK UNREAD
                          </button>
                        )}
                        <button
                          type="button"
                          className="button secondary dash-delete-btn"
                          onClick={() => deleteMessage(m.id)}
                          aria-label={`Delete message from ${m.name}`}
                        >
                          <Trash2 size={15} /> DELETE
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}

