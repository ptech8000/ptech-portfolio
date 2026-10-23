"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, CheckCircle2, ArrowUpRight, MessageSquarePlus, X, Send, ShieldCheck, Award } from "lucide-react";
import { reviews, reviewSummary, type ClientReview } from "../data/reviews";
import Reveal from "./Reveal";

export default function ReviewsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [project, setProject] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [highlight, setHighlight] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        email: email.trim() || "anonymous@client.ptech",
        topic: `[Client Review] ${rating}★ for ${project.trim() || "Hardware Project"}`,
        message: `Client Review & Rating Submission:\n\nRating: ${rating}/5 Stars\nClient: ${name.trim()}\nOrganization/Role: ${org.trim() || "Independent"}\nProject: ${project.trim() || "General Engineering"}\nHeadline: "${highlight.trim()}"\n\nReview:\n${feedback.trim()}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Could not submit feedback. Please try reaching out directly via WhatsApp or Email.");
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
    setProject("");
    setRating(5);
    setHighlight("");
    setFeedback("");
    setSubmitted(false);
    setError("");
    setModalOpen(false);
  }

  return (
    <section className="section container" id="reviews">
      <Reveal>
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <span className="eyebrow">
              <Award size={13} style={{ display: "inline", marginRight: 6 }} />
              CLIENT REVIEWS &amp; VERIFIED RATINGS
            </span>
            <h2 style={{ margin: "10px 0 8px", font: "700 clamp(32px, 3.8vw, 48px)/1.05 'Space Grotesk', sans-serif" }}>
              ENGINEERED FOR RESULTS.
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 640, margin: 0 }}>
              Genuine feedback from researchers, institutions, founders, and labs on systems built and deployed by P-TECH.
            </p>
          </div>
          <button
            type="button"
            className="button secondary"
            onClick={() => setModalOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <MessageSquarePlus size={16} /> LEAVE PROJECT FEEDBACK
          </button>
        </div>
      </Reveal>

      {reviews.length > 0 ? (
        <>
          {/* Trust & Rating Bar */}
          <Reveal delay={60}>
            <div className="review-summary-bar">
              <div className="summary-score">
                <span className="score-num">{reviewSummary.averageRating.toFixed(1)}</span>
                <div className="stars-wrap" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <span className="summary-label">OVERALL CLIENT RATING</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-metrics">
                <div className="metric-pill">
                  <strong>{reviewSummary.onTimeDelivery}</strong>
                  <span>On-Time Delivery</span>
                </div>
                <div className="metric-pill">
                  <strong>20+</strong>
                  <span>Deployed Systems</span>
                </div>
                <div className="metric-pill">
                  <strong>100%</strong>
                  <span>Satisfaction Rate</span>
                </div>
                <div className="metric-pill">
                  <strong>Zero</strong>
                  <span>Hidden Cloud Fees</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Reviews Grid */}
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <div className="review-card">
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

                    {r.projectSlug ? (
                      <Link href={`/work/${r.projectSlug}`} className="review-project-link">
                        <span>{r.projectName}</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      <span className="review-project-name">{r.projectName}</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      ) : (
        <Reveal delay={60}>
          <div className="dash-empty" style={{ margin: "28px 0 0", padding: "52px 24px" }}>
            <div style={{ display: "flex", gap: 6, color: "#f59e0b", marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#f59e0b" />
              ))}
            </div>
            <h3 style={{ margin: "4px 0 8px", font: "600 22px 'Space Grotesk', sans-serif" }}>
              BE THE FIRST TO LEAVE A REVIEW
            </h3>
            <p style={{ color: "var(--muted)", maxWidth: 520, fontSize: 15, margin: "0 auto 22px", lineHeight: 1.6 }}>
              Have we built an embedded system, robotics prototype, IoT device, or 3D enclosure for your project? Share your experience and rate our service below.
            </p>
            <button
              type="button"
              className="button primary"
              onClick={() => setModalOpen(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <MessageSquarePlus size={16} /> LEAVE PROJECT FEEDBACK
            </button>
          </div>
        </Reveal>
      )}

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="lightbox-backdrop" onClick={resetForm}>
          <div className="dash-modal review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <MessageSquarePlus size={20} color="var(--accent)" />
                <h3 style={{ margin: 0, font: "600 22px 'Space Grotesk', sans-serif" }}>
                  LEAVE PROJECT FEEDBACK
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
                  THANK YOU FOR YOUR FEEDBACK!
                </h4>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, maxWidth: 380, margin: "0 auto 20px" }}>
                  Your review has been submitted to the P-TECH engineering team. We appreciate your partnership!
                </p>
                <button type="button" className="button primary" onClick={resetForm}>
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="dash-auth-form" style={{ marginTop: 18 }}>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: "0 0 14px" }}>
                  Have we built a project, custom enclosure, or hardware system for you? Rate your experience below.
                </p>

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
                      placeholder="e.g. Dr. John Doe"
                      required
                    />
                  </label>

                  <label>
                    EMAIL (FOR VERIFICATION)
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                    />
                  </label>
                </div>

                <div className="review-form-row">
                  <label>
                    ROLE / ORGANIZATION
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="e.g. Lead Researcher, Lab XYZ"
                    />
                  </label>

                  <label>
                    PROJECT BUILT
                    <input
                      type="text"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="e.g. CBT Server / 3D Enclosure"
                      required
                    />
                  </label>
                </div>

                <label>
                  HEADLINE / KEY TAKEAWAY
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    placeholder="e.g. Fast turnaround and flawless firmware"
                    required
                  />
                </label>

                <label>
                  DETAILED FEEDBACK
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about the build quality, delivery time, and reliability of the hardware…"
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
                    <Send size={15} /> {submitting ? "SUBMITTING…" : "SUBMIT FEEDBACK"}
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
