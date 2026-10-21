"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type GalleryItem = { src: string; caption: string };

export default function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, items.length]);

  const current = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div className="case-gallery">
        {items.map((img, idx) => (
          <figure
            key={img.src}
            className="gallery-card gallery-clickable"
            onClick={() => setActiveIndex(idx)}
          >
            <div className="gallery-img-wrap">
              <img src={img.src} alt={img.caption} loading="lazy" />
              <span className="gallery-zoom-hint">
                <ZoomIn size={14} /> CLICK TO EXPAND
              </span>
            </div>
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {current && activeIndex !== null && (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image preview"
            >
              <X size={20} /> CLOSE
            </button>
            <div className="lightbox-stage">
              {items.length > 1 && (
                <button
                  type="button"
                  className="lightbox-nav prev"
                  onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <img src={current.src} alt={current.caption} className="lightbox-img" />
              {items.length > 1 && (
                <button
                  type="button"
                  className="lightbox-nav next"
                  onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
            <div className="lightbox-caption">
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <p>{current.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

