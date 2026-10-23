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
  KeyRound,
  X,
  AlertCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import type { StoredReview } from "../lib/storage";

type ContactMessage = {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "unread" | "read" | "replied";
};

type Filter = "all" | "unread" | "read" | "replied" | "reviews";

export default function DashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [adminReviews, setAdminReviews] = useState<StoredReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Change password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotMethod, setForgotMethod] = useState<"key" | "code">("key");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newForgotPw, setNewForgotPw] = useState("");
  const [confirmForgotPw, setConfirmForgotPw] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSentMessage, setCodeSentMessage] = useState("");

  const getAdminHeaders = useCallback(
    (extra: Record<string, string> = {}) => {
      const token =
        (typeof window !== "undefined"
          ? sessionStorage.getItem("ptech_admin_token") || localStorage.getItem("ptech_admin_token")
          : null) ||
        savedKey ||
        "";
      const hash =
        (typeof window !== "undefined" ? localStorage.getItem("ptech_admin_hash") : null) || "";
      const rawKey =
        (typeof window !== "undefined"
          ? sessionStorage.getItem("ptech_admin_key") || localStorage.getItem("ptech_admin_key")
          : null) ||
        savedKey ||
        "";
      return {
        "x-admin-key": rawKey || token,
        "x-admin-token": token,
        "x-admin-hash": hash,
        ...extra,
      };
    },
    [savedKey]
  );

  const fetchMessages = useCallback(
    async (activeKeyOrToken?: string) => {
      setLoading(true);
      setAuthError("");

      const token =
        activeKeyOrToken ||
        savedKey ||
        (typeof window !== "undefined"
          ? sessionStorage.getItem("ptech_admin_token") ||
            localStorage.getItem("ptech_admin_token") ||
            sessionStorage.getItem("ptech_admin_key") ||
            localStorage.getItem("ptech_admin_key")
          : null) ||
        "";

      const hash =
        (typeof window !== "undefined" ? localStorage.getItem("ptech_admin_hash") : null) || "";

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const headers: Record<string, string> = {
          "x-admin-key": token,
          "x-admin-token": token,
          "x-admin-hash": hash,
        };

        const [resContact, resReviews] = await Promise.all([
          fetch("/api/contact", {
            headers,
            cache: "no-store",
          }),
          fetch("/api/reviews?all=true", {
            headers,
            cache: "no-store",
          }),
        ]);

        if (resContact.status === 401) {
          setAuthError("Session expired or invalid passcode.");
          setSavedKey(null);
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("ptech_admin_key");
            sessionStorage.removeItem("ptech_admin_token");
          }
          setLoading(false);
          return;
        }

        const dataContact = await resContact.json();
        if (Array.isArray(dataContact.messages)) {
          setMessages(dataContact.messages);
          setSavedKey(token);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("ptech_admin_key", token);
            sessionStorage.setItem("ptech_admin_token", token);
          }
        }

        if (resReviews.ok) {
          const dataRev = await resReviews.json();
          if (Array.isArray(dataRev.reviews)) {
            setAdminReviews(dataRev.reviews);
          }
        }
      } catch {
        setAuthError("Could not reach the server.");
      } finally {
        setLoading(false);
      }
    },
    [savedKey]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token =
      sessionStorage.getItem("ptech_admin_token") || localStorage.getItem("ptech_admin_token");
    const stored =
      sessionStorage.getItem("ptech_admin_key") || localStorage.getItem("ptech_admin_key");
    const keyToUse = token || stored;
    if (keyToUse) {
      setSavedKey(keyToUse);
      fetchMessages(keyToUse);
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
    setAuthError("");
    const clean = passcode.trim();
    if (!clean) {
      setAuthError("Please enter your admin passcode.");
      return;
    }

    setLoading(true);
    try {
      const clientHash =
        typeof window !== "undefined" ? localStorage.getItem("ptech_admin_hash") || "" : "";

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: clean, clientHash }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthError(data.error || "Invalid admin passcode.");
        setLoading(false);
        return;
      }

      const activeToken = data.token || clean;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ptech_admin_token", activeToken);
        localStorage.setItem("ptech_admin_token", activeToken);
        sessionStorage.setItem("ptech_admin_key", clean);
        localStorage.setItem("ptech_admin_key", clean);
        if (data.passcodeHash) {
          localStorage.setItem("ptech_admin_hash", data.passcodeHash);
        }
      }

      setSavedKey(activeToken);
      setPasscode("");
      await fetchMessages(activeToken);
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function onLogout() {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ptech_admin_key");
      sessionStorage.removeItem("ptech_admin_token");
      localStorage.removeItem("ptech_admin_key");
      localStorage.removeItem("ptech_admin_token");
      // Keep ptech_admin_hash in localStorage so they can re-login with their customized passcode
    }
    setSavedKey(null);
    setPasscode("");
    setMessages([]);
    setAdminReviews([]);
  }

  async function updateStatus(id: string, status: ContactMessage["status"]) {
    if (!savedKey) return;
    // Optimistic local update
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));

    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: getAdminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) setMessages(data.messages);
      }
    } catch {
      // Revert if error
      fetchMessages(savedKey);
    }
  }

  async function markAllRead() {
    if (!savedKey) return;
    // Optimistic update
    setMessages((prev) => prev.map((m) => (m.status === "unread" ? { ...m, status: "read" } : m)));

    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: getAdminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ markAllRead: true }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) setMessages(data.messages);
      }
    } catch {
      fetchMessages(savedKey);
    }
  }

  async function deleteMessage(id: string) {
    if (!savedKey) return;
    // Optimistic remove
    setMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) setMessages(data.messages);
      }
    } catch {
      fetchMessages(savedKey);
    }
  }

  async function toggleReviewApproval(id: string, newStatus: "approved" | "pending") {
    if (!savedKey) return;
    setAdminReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    try {
      await fetch("/api/reviews", {
        method: "PATCH",
        headers: getAdminHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch {
      fetchMessages(savedKey);
    }
  }

  async function deleteAdminReview(id: string) {
    if (!savedKey) return;
    if (!confirm("Are you sure you want to delete this review?")) return;
    setAdminReviews((prev) => prev.filter((r) => r.id !== id));
    try {
      await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: getAdminHeaders(),
      });
    } catch {
      fetchMessages(savedKey);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (newPw !== confirmPw) {
      setPwError("New passcodes do not match.");
      return;
    }
    if (newPw.length < 4) {
      setPwError("New passcode must be at least 4 characters.");
      return;
    }

    setPwLoading(true);
    try {
      const clientHash =
        typeof window !== "undefined" ? localStorage.getItem("ptech_admin_hash") || "" : "";

      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPasscode: currentPw,
          newPasscode: newPw,
          clientHash,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwError(data.error || "Failed to update passcode.");
      } else {
        setPwSuccess("Passcode updated successfully!");
        const token = data.sessionToken || newPw;
        if (typeof window !== "undefined") {
          sessionStorage.setItem("ptech_admin_token", token);
          localStorage.setItem("ptech_admin_token", token);
          sessionStorage.setItem("ptech_admin_key", newPw);
          localStorage.setItem("ptech_admin_key", newPw);
          if (data.passcodeHash) {
            localStorage.setItem("ptech_admin_hash", data.passcodeHash);
          }
        }
        setSavedKey(token);
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
        setTimeout(() => {
          setShowPasswordModal(false);
          setPwSuccess("");
        }, 1500);
      }
    } catch {
      setPwError("Network error. Please try again.");
    } finally {
      setPwLoading(false);
    }
  }

  async function handleSendResetCode() {
    setForgotError("");
    setForgotSuccess("");
    setCodeSentMessage("");
    setSendingCode(true);

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_code" }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setForgotError(data.message || data.error || "Failed to send reset code.");
      } else {
        setCodeSentMessage(data.message || "Code sent to registered admin email.");
      }
    } catch {
      setForgotError("Network error. Please try using your Master Recovery Key.");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (newForgotPw !== confirmForgotPw) {
      setForgotError("New passcodes do not match.");
      return;
    }

    if (newForgotPw.length < 4) {
      setForgotError("New passcode must be at least 4 characters long.");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          method: forgotMethod,
          recoveryKey: forgotMethod === "key" ? recoveryKey.trim() : undefined,
          otpCode: forgotMethod === "code" ? otpCode.trim() : undefined,
          newPasscode: newForgotPw.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setForgotError(data.error || "Failed to reset passcode.");
      } else {
        setForgotSuccess("Passcode updated! Unlocking dashboard…");
        const updatedKey = newForgotPw.trim();
        const token = data.sessionToken || updatedKey;

        if (typeof window !== "undefined") {
          sessionStorage.setItem("ptech_admin_token", token);
          localStorage.setItem("ptech_admin_token", token);
          sessionStorage.setItem("ptech_admin_key", updatedKey);
          localStorage.setItem("ptech_admin_key", updatedKey);
          if (data.passcodeHash) {
            localStorage.setItem("ptech_admin_hash", data.passcodeHash);
          }
        }

        setSavedKey(token);
        setPasscode("");
        setTimeout(async () => {
          setShowForgotModal(false);
          setForgotSuccess("");
          await fetchMessages(token);
        }, 1200);
      }
    } catch {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
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
  const pendingReviewCount = adminReviews.filter((r) => r.status === "pending").length;

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

  const filteredReviews = adminReviews.filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      r.projectTitle.toLowerCase().includes(q) ||
      r.headline.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q)
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
                  placeholder="Enter admin passcode"
                  required
                  autoFocus
                />
              </label>
              {authError && <p className="form-error">{authError}</p>}
              <button type="submit" className="button primary" disabled={loading}>
                {loading ? "VERIFYING…" : "UNLOCK DASHBOARD"}
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotError("");
                    setForgotSuccess("");
                    setRecoveryKey("");
                    setOtpCode("");
                    setNewForgotPw("");
                    setConfirmForgotPw("");
                    setCodeSentMessage("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent)",
                    font: "600 12px 'Space Grotesk', sans-serif",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: 0,
                  }}
                >
                  Forgot passcode?
                </button>
                <span style={{ color: "var(--faint)", font: "11px 'JetBrains Mono', monospace" }}>
                  P-TECH Admin Access
                </span>
              </div>
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
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => {
                    setPwError("");
                    setPwSuccess("");
                    setCurrentPw(savedKey || "");
                    setShowPasswordModal(true);
                  }}
                >
                  <KeyRound size={15} /> CHANGE PASSCODE
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
                    [
                      "reviews",
                      pendingReviewCount > 0 ? `★ REVIEWS (${pendingReviewCount} PENDING)` : "★ REVIEWS",
                      adminReviews.length,
                    ],
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

            {/* Messages or Reviews List */}
            {filter === "reviews" ? (
              filteredReviews.length === 0 ? (
                <div className="dash-empty">
                  <Star size={32} />
                  <h3>NO PROJECT REVIEWS FOUND</h3>
                  <p>
                    {adminReviews.length === 0
                      ? "Reviews submitted from project pages will appear here for verification and approval."
                      : "No reviews match your current search query."}
                  </p>
                </div>
              ) : (
                <div className="dash-list">
                  {filteredReviews.map((r) => {
                    const dateStr = new Date(r.timestamp).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <article key={r.id} className="dash-msg-card">
                        <div className="dash-msg-header">
                          <div className="dash-msg-badges">
                            {r.status === "approved" ? (
                              <span className="dash-status-pill replied" style={{ color: "var(--success)" }}>
                                ● APPROVED &amp; LIVE
                              </span>
                            ) : (
                              <span
                                className="dash-status-pill unread"
                                style={{
                                  color: "#f59e0b",
                                  borderColor: "#f59e0b",
                                  background: "rgba(245,158,11,0.1)",
                                }}
                              >
                                ● PENDING VERIFICATION
                              </span>
                            )}
                            <a
                              href={`/work/${r.projectSlug}#reviews`}
                              target="_blank"
                              rel="noreferrer"
                              className="exp-badge"
                              style={{ margin: 0, color: "var(--accent)" }}
                            >
                              PROJECT: {r.projectTitle} ↗
                            </a>
                          </div>
                          <span className="dash-msg-time">
                            <Clock size={12} /> {dateStr}
                          </span>
                        </div>

                        <div className="dash-msg-sender">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: 10 }}>
                            <div>
                              <h3 style={{ margin: "0 0 4px" }}>{r.name}</h3>
                              <span style={{ color: "var(--muted)", fontSize: 13 }}>
                                {r.org || "Client"} {r.email ? ` · ${r.email}` : ""}
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <div className="stars-wrap">
                                {[...Array(Math.round(r.rating || 5))].map((_, s) => (
                                  <Star key={s} size={15} className="star-filled" />
                                ))}
                              </div>
                              <strong style={{ font: "600 14px 'JetBrains Mono', monospace", color: "var(--accent)" }}>
                                {r.rating} / 5.0
                              </strong>
                            </div>
                          </div>
                        </div>

                        {/* Engineering Sub-Ratings Breakdown */}
                        {(r.hardwareRating || r.firmwareRating || r.deliveryRating || r.communicationRating) && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 12,
                              background: "var(--bg)",
                              border: "1px solid var(--border)",
                              padding: "8px 12px",
                              font: "11px 'JetBrains Mono', monospace",
                            }}
                          >
                            {r.hardwareRating && (
                              <span style={{ color: "var(--muted)" }}>
                                Hardware: <b style={{ color: "var(--accent)" }}>{r.hardwareRating}★</b>
                              </span>
                            )}
                            {r.firmwareRating && (
                              <span style={{ color: "var(--muted)" }}>
                                Firmware: <b style={{ color: "var(--accent)" }}>{r.firmwareRating}★</b>
                              </span>
                            )}
                            {r.deliveryRating && (
                              <span style={{ color: "var(--muted)" }}>
                                Delivery: <b style={{ color: "var(--accent)" }}>{r.deliveryRating}★</b>
                              </span>
                            )}
                            {r.communicationRating && (
                              <span style={{ color: "var(--muted)" }}>
                                Support: <b style={{ color: "var(--accent)" }}>{r.communicationRating}★</b>
                              </span>
                            )}
                          </div>
                        )}

                        <div className="dash-msg-body">
                          <strong style={{ color: "var(--text)", display: "block", marginBottom: 6 }}>
                            &ldquo;{r.headline}&rdquo;
                          </strong>
                          {r.review}
                        </div>

                        <div className="dash-msg-footer">
                          {r.status === "pending" ? (
                            <button
                              type="button"
                              className="button primary"
                              onClick={() => toggleReviewApproval(r.id, "approved")}
                              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                            >
                              <CheckCircle2 size={15} /> APPROVE &amp; PUBLISH LIVE
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="button secondary"
                              onClick={() => toggleReviewApproval(r.id, "pending")}
                              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                            >
                              <X size={15} /> UNPUBLISH / SET PENDING
                            </button>
                          )}

                          <button
                            type="button"
                            className="button secondary dash-delete-btn"
                            onClick={() => deleteAdminReview(r.id)}
                            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                          >
                            <Trash2 size={15} /> DELETE REVIEW
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )
            ) : filtered.length === 0 ? (
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
                          {(m.topic.toLowerCase().includes("review") || m.topic.includes("★")) && (
                            <span
                              style={{
                                font: "600 10px 'JetBrains Mono', monospace",
                                color: "#f59e0b",
                                border: "1px solid rgba(245, 158, 11, 0.4)",
                                background: "rgba(245, 158, 11, 0.1)",
                                padding: "4px 8px",
                              }}
                            >
                              ★ CLIENT REVIEW
                            </span>
                          )}
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

      {/* Change Passcode Modal */}
      {showPasswordModal && (
        <div className="lightbox-backdrop" onClick={() => setShowPasswordModal(false)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <KeyRound size={20} color="var(--accent)" />
                <h3 style={{ margin: 0, font: "600 22px 'Space Grotesk', sans-serif" }}>
                  CHANGE ADMIN PASSCODE
                </h3>
              </div>
              <button
                type="button"
                className="dash-modal-close"
                onClick={() => setShowPasswordModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="dash-auth-form" style={{ marginTop: 16 }}>
              <label>
                CURRENT PASSCODE
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="Enter current passcode"
                  required
                />
              </label>

              <label>
                NEW PASSCODE
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="At least 4 characters"
                  required
                  minLength={4}
                />
              </label>

              <label>
                CONFIRM NEW PASSCODE
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Confirm new passcode"
                  required
                  minLength={4}
                />
              </label>

              {pwError && (
                <p className="form-error" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertCircle size={14} /> {pwError}
                </p>
              )}

              {pwSuccess && (
                <p style={{ color: "var(--success)", font: "600 12px 'JetBrains Mono', monospace", margin: 0 }}>
                  <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} />
                  {pwSuccess}
                </p>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button type="submit" className="button primary" disabled={pwLoading} style={{ flex: 1 }}>
                  {pwLoading ? "UPDATING…" : "UPDATE PASSCODE"}
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showForgotModal && (
        <div className="lightbox-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <KeyRound size={20} color="var(--accent)" />
                <h3 style={{ margin: 0, font: "600 22px 'Space Grotesk', sans-serif" }}>
                  RESET ADMIN PASSCODE
                </h3>
              </div>
              <button
                type="button"
                className="dash-modal-close"
                onClick={() => setShowForgotModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 18, marginBottom: 16 }}>
              <button
                type="button"
                className={`button ${forgotMethod === "key" ? "primary" : "secondary"}`}
                style={{ flex: 1, padding: "8px 10px", fontSize: 11, justifyContent: "center" }}
                onClick={() => {
                  setForgotMethod("key");
                  setForgotError("");
                }}
              >
                MASTER RECOVERY KEY
              </button>
              <button
                type="button"
                className={`button ${forgotMethod === "code" ? "primary" : "secondary"}`}
                style={{ flex: 1, padding: "8px 10px", fontSize: 11, justifyContent: "center" }}
                onClick={() => {
                  setForgotMethod("code");
                  setForgotError("");
                }}
              >
                EMAIL VERIFICATION CODE
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="dash-auth-form">
              {forgotMethod === "key" ? (
                <>
                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>
                    Enter your Master Recovery Key to set a new passcode immediately.
                  </p>
                  <label>
                    MASTER RECOVERY KEY
                    <input
                      type="password"
                      value={recoveryKey}
                      onChange={(e) => setRecoveryKey(e.target.value)}
                      placeholder="Enter Master Recovery Key"
                      required
                    />
                  </label>
                </>
              ) : (
                <>
                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>
                    Request a 6-digit one-time reset code sent to the registered admin email.
                  </p>
                  <div style={{ marginBottom: 12 }}>
                    <button
                      type="button"
                      className="button secondary"
                      onClick={handleSendResetCode}
                      disabled={sendingCode}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      {sendingCode ? "SENDING CODE…" : "SEND VERIFICATION CODE"}
                    </button>
                  </div>
                  {codeSentMessage && (
                    <p style={{ color: "var(--accent)", font: "12px 'JetBrains Mono', monospace", margin: "0 0 12px" }}>
                      ✓ {codeSentMessage}
                    </p>
                  )}
                  <label>
                    6-DIGIT VERIFICATION CODE
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      required
                      maxLength={6}
                    />
                  </label>
                </>
              )}

              <label>
                NEW PASSCODE
                <input
                  type="password"
                  value={newForgotPw}
                  onChange={(e) => setNewForgotPw(e.target.value)}
                  placeholder="At least 4 characters"
                  required
                  minLength={4}
                />
              </label>

              <label>
                CONFIRM NEW PASSCODE
                <input
                  type="password"
                  value={confirmForgotPw}
                  onChange={(e) => setConfirmForgotPw(e.target.value)}
                  placeholder="Confirm new passcode"
                  required
                  minLength={4}
                />
              </label>

              {forgotError && (
                <p className="form-error" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertCircle size={14} /> {forgotError}
                </p>
              )}

              {forgotSuccess && (
                <p style={{ color: "var(--success)", font: "600 12px 'JetBrains Mono', monospace", margin: 0 }}>
                  <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} />
                  {forgotSuccess}
                </p>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button type="submit" className="button primary" disabled={forgotLoading} style={{ flex: 1, justifyContent: "center" }}>
                  {forgotLoading ? "RESETTING…" : "RESET & UNLOCK"}
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setShowForgotModal(false)}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
