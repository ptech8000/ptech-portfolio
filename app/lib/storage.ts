import { readFile, writeFile, appendFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import crypto from "crypto";

export type ContactMessage = {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "unread" | "read" | "replied";
};

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const SEED_FILE = path.join(process.cwd(), "contact-submissions.jsonl");
const TMP_FILE = path.join(process.platform === "win32" ? process.cwd() : "/tmp", "contact-submissions.jsonl");
const PASSCODE_TMP_FILE = path.join(process.platform === "win32" ? process.cwd() : "/tmp", "ptech-admin-passcode.txt");
const OTP_TMP_FILE = path.join(process.platform === "win32" ? process.cwd() : "/tmp", "ptech-admin-otp.json");

// In-memory cache for fast serverless read/write
let memoryMessages: ContactMessage[] | null = null;
let memoryPasscode: string | null = null;

// Helper: Upstash / Vercel KV REST call
async function kvCommand(command: string, ...args: (string | number)[]) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/${command}/${args.map(encodeURIComponent).join("/")}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// PASSCODE MANAGEMENT
// -------------------------------------------------------------

export async function getAdminPasscode(): Promise<string> {
  if (memoryPasscode) return memoryPasscode;

  // 1. Check KV if available
  if (KV_URL && KV_TOKEN) {
    const fromKv = await kvCommand("get", "ptech_admin_passcode");
    if (typeof fromKv === "string" && fromKv.trim()) {
      memoryPasscode = fromKv.trim();
      return memoryPasscode;
    }
  }

  // 2. Check writable file storage
  try {
    if (existsSync(PASSCODE_TMP_FILE)) {
      const saved = await readFile(PASSCODE_TMP_FILE, "utf8");
      if (saved.trim()) {
        memoryPasscode = saved.trim();
        return memoryPasscode;
      }
    }
  } catch {
    // Ignore file read error
  }

  // 3. Fallback to ENV or default
  memoryPasscode = process.env.ADMIN_PASSWORD || "ptech8000";
  return memoryPasscode;
}

export async function setAdminPasscode(newPasscode: string): Promise<boolean> {
  const clean = newPasscode.trim();
  if (clean.length < 4) return false;

  memoryPasscode = clean;

  // Save to KV if configured
  if (KV_URL && KV_TOKEN) {
    await kvCommand("set", "ptech_admin_passcode", clean);
  }

  // Save to writable file storage
  try {
    await writeFile(PASSCODE_TMP_FILE, clean, "utf8");
  } catch {
    // Ignore on read-only system
  }

  return true;
}

export const DEFAULT_MASTER_RECOVERY_KEY = "PTECH-RECOVERY-2026";

export function getMasterRecoveryKey(): string {
  return (process.env.ADMIN_RECOVERY_KEY || DEFAULT_MASTER_RECOVERY_KEY).trim();
}

export async function verifyRecoveryKey(key: string): Promise<boolean> {
  const clean = key.trim();
  if (!clean) return false;
  const master = getMasterRecoveryKey();
  return clean.toLowerCase() === master.toLowerCase();
}

type ResetOtp = {
  code: string;
  expiresAt: number;
};
let memoryOtp: ResetOtp | null = null;

export async function createAndSaveOtp(): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const data: ResetOtp = { code, expiresAt: Date.now() + 15 * 60 * 1000 };
  memoryOtp = data;

  if (KV_URL && KV_TOKEN) {
    await kvCommand("set", "ptech_admin_otp", JSON.stringify(data));
  }

  try {
    await writeFile(OTP_TMP_FILE, JSON.stringify(data), "utf8");
  } catch {
    // Read-only filesystem fallback
  }

  return code;
}

export async function verifyResetOtp(code: string): Promise<boolean> {
  const clean = code.trim();
  if (!clean) return false;

  let target: ResetOtp | null = memoryOtp;
  if (!target && KV_URL && KV_TOKEN) {
    const fromKv = await kvCommand("get", "ptech_admin_otp");
    if (typeof fromKv === "string" && fromKv) {
      try {
        target = JSON.parse(fromKv);
      } catch {
        // malformed
      }
    }
  }

  if (!target) {
    try {
      if (existsSync(OTP_TMP_FILE)) {
        const raw = await readFile(OTP_TMP_FILE, "utf8");
        target = JSON.parse(raw);
      }
    } catch {
      // file read error
    }
  }

  if (!target) return false;
  if (Date.now() > target.expiresAt) return false;
  if (target.code !== clean) return false;

  // Invalidate OTP after use
  memoryOtp = null;
  if (KV_URL && KV_TOKEN) {
    await kvCommand("del", "ptech_admin_otp");
  }
  return true;
}

// -------------------------------------------------------------
// MESSAGES MANAGEMENT
// -------------------------------------------------------------

function parseJsonLines(raw: string): ContactMessage[] {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
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
      // Ignore corrupted line
    }
  }
  return parsed;
}

export async function getMessages(): Promise<ContactMessage[]> {
  // 1. Try Upstash / Vercel KV first
  if (KV_URL && KV_TOKEN) {
    const raw = await kvCommand("get", "ptech_contact_messages");
    if (typeof raw === "string" && raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          memoryMessages = parsed;
          return parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
      } catch {
        // Fall through
      }
    }
  }

  // 2. Return memory cache if populated
  if (memoryMessages !== null) {
    return memoryMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // 3. Check /tmp file or seed file
  let loaded: ContactMessage[] = [];
  try {
    if (existsSync(TMP_FILE)) {
      const raw = await readFile(TMP_FILE, "utf8");
      loaded = parseJsonLines(raw);
    } else if (existsSync(SEED_FILE)) {
      const raw = await readFile(SEED_FILE, "utf8");
      loaded = parseJsonLines(raw);
      // Seed into /tmp so future writes succeed
      try {
        await writeFile(TMP_FILE, raw, "utf8");
      } catch {
        // Read-only filesystem
      }
    }
  } catch {
    loaded = [];
  }

  memoryMessages = loaded;
  return loaded.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function saveMessages(messages: ContactMessage[]): Promise<boolean> {
  memoryMessages = messages;

  // 1. Save to KV if configured
  if (KV_URL && KV_TOKEN) {
    await kvCommand("set", "ptech_contact_messages", JSON.stringify(messages));
  }

  // 2. Save to file (try TMP_FILE, fallback to SEED_FILE if writable)
  const content = messages.map((m) => JSON.stringify(m)).join("\n") + (messages.length ? "\n" : "");
  try {
    await writeFile(TMP_FILE, content, "utf8");
  } catch {
    try {
      await writeFile(SEED_FILE, content, "utf8");
    } catch {
      // If disk is entirely read-only, memoryMessages remains in memory for current serverless lifecycle
    }
  }

  return true;
}

export async function addMessage(entry: ContactMessage): Promise<void> {
  const current = await getMessages();
  const updated = [entry, ...current.filter((m) => m.id !== entry.id)];
  await saveMessages(updated);
}

// -------------------------------------------------------------
// PROJECT REVIEWS STORAGE
// -------------------------------------------------------------

export type StoredReview = {
  id: string;
  projectSlug: string;
  projectTitle: string;
  rating: number; // 1 to 5 overall
  hardwareRating?: number; // 1 to 5
  firmwareRating?: number; // 1 to 5
  deliveryRating?: number; // 1 to 5
  communicationRating?: number; // 1 to 5
  name: string;
  email?: string;
  org?: string;
  headline: string;
  review: string;
  timestamp: string;
  status: "approved" | "pending";
};

const REVIEWS_TMP_FILE = path.join(
  process.platform === "win32" ? process.cwd() : "/tmp",
  "ptech-project-reviews.jsonl"
);
let memoryReviews: StoredReview[] | null = null;

export async function getStoredReviews(
  slug?: string,
  includePending: boolean = false
): Promise<StoredReview[]> {
  let list: StoredReview[] = [];

  // 1. Try Upstash / Vercel KV first
  if (KV_URL && KV_TOKEN) {
    const raw = await kvCommand("get", "ptech_project_reviews");
    if (typeof raw === "string" && raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed;
          memoryReviews = parsed;
        }
      } catch {}
    }
  }

  // 2. Return memory cache if populated
  if (list.length === 0 && memoryReviews !== null) {
    list = memoryReviews;
  }

  // 3. Check /tmp file
  if (list.length === 0) {
    try {
      if (existsSync(REVIEWS_TMP_FILE)) {
        const raw = await readFile(REVIEWS_TMP_FILE, "utf8");
        const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
        for (const line of lines) {
          try {
            list.push(JSON.parse(line));
          } catch {}
        }
      }
    } catch {}
    memoryReviews = list;
  }

  let filtered = list;
  if (slug) {
    filtered = filtered.filter((r) => r.projectSlug === slug);
  }
  if (!includePending) {
    filtered = filtered.filter((r) => r.status === "approved");
  }

  return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function saveStoredReviews(reviews: StoredReview[]): Promise<boolean> {
  memoryReviews = reviews;

  if (KV_URL && KV_TOKEN) {
    await kvCommand("set", "ptech_project_reviews", JSON.stringify(reviews));
  }

  const content = reviews.map((r) => JSON.stringify(r)).join("\n") + (reviews.length ? "\n" : "");
  try {
    await writeFile(REVIEWS_TMP_FILE, content, "utf8");
  } catch {
    // Read-only filesystem fallback
  }

  return true;
}

export async function addStoredReview(review: StoredReview): Promise<void> {
  const current = await getStoredReviews(undefined, true);
  const updated = [review, ...current.filter((r) => r.id !== review.id)];
  await saveStoredReviews(updated);
}

export async function updateReviewStatus(
  id: string,
  status: "approved" | "pending"
): Promise<boolean> {
  const current = await getStoredReviews(undefined, true);
  const updated = current.map((r) => (r.id === id ? { ...r, status } : r));
  return saveStoredReviews(updated);
}

export async function deleteStoredReview(id: string): Promise<boolean> {
  const current = await getStoredReviews(undefined, true);
  const updated = current.filter((r) => r.id !== id);
  return saveStoredReviews(updated);
}

