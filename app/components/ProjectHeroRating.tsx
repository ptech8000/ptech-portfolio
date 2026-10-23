"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import type { StoredReview } from "../lib/storage";

export default function ProjectHeroRating({ projectSlug }: { projectSlug: string }) {
  const [reviews, setReviews] = useState<StoredReview[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/reviews?slug=${encodeURIComponent(projectSlug)}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [projectSlug]);

  if (!loaded) return null;

  const count = reviews.length;
  const avg =
    count > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / count).toFixed(1)
      : null;

  return (
    <a
      href="#reviews"
      className="hero-rating-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text)",
        font: "500 11px 'JetBrains Mono', monospace",
        transition: "border-color .2s, transform .2s",
      }}
      title="Jump to client reviews for this project"
    >
      <Star size={13} fill="#f59e0b" color="#f59e0b" />
      {avg ? (
        <>
          <strong style={{ color: "var(--accent)" }}>{avg}</strong>
          <span style={{ color: "var(--muted)" }}>
            ({count} {count === 1 ? "review" : "reviews"})
          </span>
        </>
      ) : (
        <span style={{ color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 5 }}>
          Be the first to review <MessageSquare size={11} color="var(--accent)" />
        </span>
      )}
    </a>
  );
}
