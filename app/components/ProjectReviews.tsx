"use client";

import { useState } from "react";
import { Star, MessageSquarePlus, X, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { reviews } from "../data/reviews";

export default function ProjectReviews({
  projectSlug,
  projectTitle,
}: {
  projectSlug: string;
  projectTitle: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [highlight, setHighlight] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const projectReviews = reviews.filter((r) => r.projectSlug === projectSlug);

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        email: email.trim() || "anonymous@client.ptech",
        topic: `[Project Review: ${projectTitle}] ${rating}★`,
        message: `Project Review Submission:\n\nProject: ${projectTitle} (/work/${projectSlug})\nRating: ${rating}/5 Stars\nReviewer: ${name.trim()}\nRole/Org: ${org.trim() || "Independent / Client"}\nHeadline: "${highlight.trim()}"\n\nReview:\n${feedback.trim()}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Could not submit feedback. Please reach out directly via WhatsApp or Email.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setOrg("");
    setRating(5);
    setHighlight("");
    setFeedback("");
    setSubmitted(false);
    setError("");
    setModalOpen(false);
  }

  return (
    <section id="reviews" style={{ scrollMarginTop: 100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
        <div>
          <span className="eyebrow">CLIENT FEEDBACK &amp; RATINGS</span>
          <h2 style={{ margin: "14px 0 0" }}>PROJECT REVIEWS</h2>
        </div>
        <button
          type="button"
          className="button secondary"
          onClick={() => setModalOpen(true)}
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          <MessageSquarePlus size={16} /> RATE THIS PROJECT
        </button>
      </div>

      {projectReviews.length > 0 ? (
        <div style={{ display: "grid", gap: 20, marginTop: 24 }}>
          {projectReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-card-top">
                <div className="stars-wrap">
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} size={15} className="star-filled" />
                  ))}
                </div>
                {r.verified && (
                  <span className="verified-pill">
                    <ShieldCheck size={12} /> VERIFIED CLIENT
                  </span>
                )}
              </div>

              <h3 className="review-headline">&ldquo;{r.highlight}&rdquo;</h3>
              <p className="review-body">{r.review}</p>

              {r.metric && (
                <div className="review-metric-tag">
                  <span>KEY RESULT:</span> <strong>{r.metric}</strong>
                </div>
              )}

              <div className="review-footer">
                <div className="review-author">
                  <strong>{r.clientName}</strong>
                  <span>
                    {r.clientRole}
                    {r.companyOrOrg ? ` · ${r.companyOrOrg}` : ""}
                  </span>
                </div>
                <span className="review-project-name">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dash-empty" style={{ margin: "20px 0 0", padding: "40px 24px" }}>
          <div style={{ display: "flex", gap: 5, color: "#f59e0b", marginBottom: 6 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#f59e0b" />
            ))}
          </div>
          <h3 style={{ margin: "4px 0 6px", font: "600 20px 'Space Grotesk', sans-serif" }}>
            NO REVIEWS YET FOR THIS SYSTEM
          </h3>
          <p style={{ color: "var(--muted)", maxWidth: 500, fontSize: 14, margin: "0 auto 18px", lineHeight: 1.6 }}>
            Did you commission, deploy, or test the <strong>{projectTitle}</strong>? Leave verified feedback on build quality, reliability, and engineering execution.
          </p>
          <button
            type="button"
            className="button primary"
            onClick={() => setModalOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <MessageSquarePlus size={16} /> RATE THIS PROJECT / LEAVE FEEDBACK
          </button>
        </div>
      )}

      {/* Project Review Modal */}
      {modalOpen && (
        <div className="lightbox-backdrop" onClick={resetForm}>
          <div className="dash-modal review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <MessageSquarePlus size={20} color="var(--accent)" />
                <h3 style={{ margin: 0, font: "600 22px 'Space Grotesk', sans-serif" }}>
                  RATE THIS PROJECT
                </h3>
              </div>
              <button type="button" className="dash-modal-close" onClick={resetForm}>
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div style={{ padding: "28px 0 10px", textAlign: "center" }}>
                <CheckCircle2 size={42} color="var(--success)" style={{ margin: "0 auto 16px" }} />
                <h4 style={{ margin: "0 0 8px", font: "600 20px 'Space Grotesk', sans-serif" }}>
                  FEEDBACK SUBMITTED!
                </h4>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, maxWidth: 380, margin: "0 auto 20px" }}>
                  Thank you for rating <strong>{projectTitle}</strong>. Your feedback has been sent directly to the P-TECH engineering team.
                </p>
                <button type="button" className="button primary" onClick={resetForm}>
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="dash-auth-form" style={{ marginTop: 18 }}>
                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "10px 14px", marginBottom: 14 }}>
                  <span style={{ font: "500 10px 'JetBrains Mono', monospace", color: "var(--faint)", display: "block" }}>
                    SYSTEM BEING REVIEWED
                  </span>
                  <strong style={{ color: "var(--accent)", font: "600 14px 'Space Grotesk', sans-serif" }}>
                    {projectTitle}
                  </strong>
                </div>

                {/* Star Picker */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, font: "600 11px 'JetBrains Mono', monospace", color: "var(--faint)" }}>
                    YOUR RATING (1 TO 5 STARS)
                  </label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 4,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Star
                          size={24}
                          className={(hoverRating || rating) >= star ? "star-filled" : "star-empty"}
                        />
                      </button>
                    ))}
                    <span style={{ marginLeft: 8, font: "600 13px 'JetBrains Mono', monospace", color: "var(--accent)" }}>
                      {hoverRating || rating}.0 / 5.0
                    </span>
                  </div>
                </div>

                <div className="review-form-row">
                  <label>
                    YOUR NAME
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Engr. Ade / Dr. John"
                      required
                    />
                  </label>

                  <label>
                    EMAIL (FOR VERIFICATION)
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                    />
                  </label>
                </div>

                <label>
                  ROLE / ORGANIZATION
                  <input
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Lead Researcher / Independent Maker"
                  />
                </label>

                <label>
                  HEADLINE / KEY TAKEAWAY
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    placeholder="e.g. Rock-solid telemetry and fast deployment"
                    required
                  />
                </label>

                <label>
                  DETAILED PROJECT REVIEW
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={`How did ${projectTitle} perform? Mention build quality, responsiveness, and reliability…`}
                    required
                    style={{
                      width: "100%",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      padding: "12px",
                      font: "14px Inter, sans-serif",
                      resize: "vertical",
                    }}
                  />
                </label>

                {error && <p className="form-error">{error}</p>}

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button type="submit" className="button primary" disabled={submitting} style={{ flex: 1, justifyContent: "center" }}>
                    <Send size={15} /> {submitting ? "SUBMITTING…" : "SUBMIT REVIEW"}
                  </button>
                  <button type="button" className="button secondary" onClick={resetForm}>
                    CANCEL
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
