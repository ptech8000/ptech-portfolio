import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  getStoredReviews,
  addStoredReview,
  addMessage,
  StoredReview,
} from "../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || undefined;
    const reviews = await getStoredReviews(slug);
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("GET reviews error:", err);
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const projectSlug = String(body.projectSlug ?? "").trim();
    const projectTitle = String(body.projectTitle ?? "").trim();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const org = String(body.org ?? "").trim();
    const headline = String(body.headline ?? "").trim();
    const reviewText = String(body.review ?? "").trim();
    const ratingNum = Math.max(1, Math.min(5, parseInt(body.rating, 10) || 5));

    if (!projectSlug || !projectTitle) {
      return NextResponse.json({ error: "Missing project information." }, { status: 400 });
    }

    if (!name || name.length > 100) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!headline || headline.length > 200) {
      return NextResponse.json({ error: "Please provide a headline." }, { status: 400 });
    }

    if (!reviewText || reviewText.length < 5) {
      return NextResponse.json({ error: "Please write a brief review." }, { status: 400 });
    }

    const id = crypto.randomBytes(6).toString("hex");
    const timestamp = new Date().toISOString();

    const newReview: StoredReview = {
      id,
      projectSlug,
      projectTitle,
      rating: ratingNum,
      name,
      email: email || undefined,
      org: org || undefined,
      headline,
      review: reviewText,
      timestamp,
    };

    // 1. Save to project reviews store
    await addStoredReview(newReview);

    // 2. Also record in dashboard inbox so admin sees it immediately
    try {
      await addMessage({
        id: `rev-${id}`,
        timestamp,
        name,
        email: email || "anonymous@client.ptech",
        topic: `[Project Review: ${projectTitle}] ${ratingNum}★`,
        message: `Project Review Submission:\n\nProject: ${projectTitle} (/work/${projectSlug})\nRating: ${ratingNum}/5 Stars\nReviewer: ${name}\nRole/Org: ${org || "Independent"}\nHeadline: "${headline}"\n\nReview:\n${reviewText}`,
        status: "unread",
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ ok: true, review: newReview });
  } catch (err) {
    console.error("POST review error:", err);
    return NextResponse.json({ error: "Could not save review." }, { status: 500 });
  }
}
