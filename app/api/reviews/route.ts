import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  getStoredReviews,
  addStoredReview,
  updateReviewStatus,
  deleteStoredReview,
  addMessage,
  getAdminPasscode,
  StoredReview,
} from "../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function isAuthorized(req: Request) {
  const key = req.headers.get("x-admin-key") ?? "";
  const passcode = await getAdminPasscode();
  return Boolean(key && key === passcode);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || undefined;
    const all = searchParams.get("all") === "true";

    const authorized = await isAuthorized(req);
    const includePending = Boolean(all && authorized);

    const reviews = await getStoredReviews(slug, includePending);
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

    // Multi-category engineering ratings (1 to 5)
    const hw = Math.max(1, Math.min(5, parseInt(body.hardwareRating, 10) || 5));
    const fw = Math.max(1, Math.min(5, parseInt(body.firmwareRating, 10) || 5));
    const del = Math.max(1, Math.min(5, parseInt(body.deliveryRating, 10) || 5));
    const comm = Math.max(1, Math.min(5, parseInt(body.communicationRating, 10) || 5));

    // Overall rating is average of the 4 sub-ratings
    const ratingNum = Math.round(((hw + fw + del + comm) / 4) * 10) / 10;

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

    const authorized = await isAuthorized(req);

    // Reviews submitted by visitors require admin approval; admin submissions are auto-approved
    const status: StoredReview["status"] = authorized ? "approved" : "pending";

    const newReview: StoredReview = {
      id,
      projectSlug,
      projectTitle,
      rating: ratingNum,
      hardwareRating: hw,
      firmwareRating: fw,
      deliveryRating: del,
      communicationRating: comm,
      name,
      email: email || undefined,
      org: org || undefined,
      headline,
      review: reviewText,
      timestamp,
      status,
    };

    // 1. Save to project reviews store
    await addStoredReview(newReview);

    // 2. Also record in dashboard inbox with sub-ratings breakdown
    try {
      await addMessage({
        id: `rev-${id}`,
        timestamp,
        name,
        email: email || "anonymous@client.ptech",
        topic: `[Review: ${projectTitle}] ${ratingNum}★ (${status.toUpperCase()})`,
        message: `Client Project Review Submission:\n\nProject: ${projectTitle} (/work/${projectSlug})\nOverall: ${ratingNum}/5 Stars\n- Hardware & Build Quality: ${hw}/5★\n- Firmware & Reliability: ${fw}/5★\n- Delivery & Turnaround: ${del}/5★\n- Communication & Support: ${comm}/5★\n\nReviewer: ${name}\nRole/Org: ${org || "Independent"}\nHeadline: "${headline}"\n\nReview:\n${reviewText}\n\nStatus: ${status.toUpperCase()} (Manage in /dashboard reviews)`,
        status: "unread",
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ ok: true, review: newReview, status });
  } catch (err) {
    console.error("POST review error:", err);
    return NextResponse.json({ error: "Could not save review." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = String(body.id ?? "").trim();
    const status = body.status === "approved" ? "approved" : "pending";

    if (!id) {
      return NextResponse.json({ error: "Missing review id." }, { status: 400 });
    }

    const success = await updateReviewStatus(id, status);
    return NextResponse.json({ ok: success });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";

    if (!id) {
      return NextResponse.json({ error: "Missing review id." }, { status: 400 });
    }

    const success = await deleteStoredReview(id);
    return NextResponse.json({ ok: success });
  } catch {
    return NextResponse.json({ error: "Could not delete review." }, { status: 500 });
  }
}
