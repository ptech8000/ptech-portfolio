import { NextResponse } from "next/server";
import {
  setAdminPasscode,
  verifyRecoveryKey,
  createAndSaveOtp,
  verifyResetOtp,
  hmacSha256,
  generateAdminSessionToken,
} from "../../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Basic in-memory rate limiting for reset attempts
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const history = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (history.length >= MAX_ATTEMPTS) return true;
  history.push(now);
  attempts.set(ip, history);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many reset attempts. Please wait 10 minutes and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const action = String(body.action ?? "").trim();

    // -----------------------------------------------------------
    // ACTION 1: SEND EMAIL RESET CODE (OTP)
    // -----------------------------------------------------------
    if (action === "send_code") {
      const apiKey = process.env.RESEND_API_KEY;
      const toEmail = process.env.CONTACT_TO_EMAIL || "ptech8000@gmail.com";
      const fromEmail = process.env.CONTACT_FROM_EMAIL || "P-TECH Security <onboarding@resend.dev>";

      if (!apiKey) {
        return NextResponse.json(
          {
            ok: false,
            error: "email_not_configured",
            message: "Email delivery is not configured on this server. Please use your Master Recovery Key to reset your passcode.",
          },
          { status: 200 }
        );
      }

      const code = await createAndSaveOtp();

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            subject: `P-TECH Dashboard Passcode Reset Code: ${code}`,
            text: `Hello Promise,\n\nYou requested to reset your P-TECH Admin Dashboard passcode.\n\nYour 6-digit verification code is:\n\n${code}\n\nThis code will expire in 15 minutes.\nIf you did not request this, you can safely ignore this email.\n\n— P-TECH Portfolio System`,
          }),
        });

        if (!res.ok) {
          const errData = await res.text();
          console.error("Resend error:", errData);
          return NextResponse.json(
            {
              ok: false,
              error: "email_failed",
              message: "Could not send verification email. Please use your Master Recovery Key to reset.",
            },
            { status: 200 }
          );
        }

        return NextResponse.json({
          ok: true,
          message: "A 6-digit verification code was sent to the registered admin email.",
        });
      } catch (err) {
        console.error("Resend request error:", err);
        return NextResponse.json(
          {
            ok: false,
            error: "email_network_error",
            message: "Network error sending email. Please use your Master Recovery Key to reset.",
          },
          { status: 200 }
        );
      }
    }

    // -----------------------------------------------------------
    // ACTION 2: RESET PASSCODE (via Recovery Key OR OTP Code)
    // -----------------------------------------------------------
    if (action === "reset") {
      const method = String(body.method ?? "key").trim();
      const recoveryKey = String(body.recoveryKey ?? "").trim();
      const otpCode = String(body.otpCode ?? "").trim();
      const newPasscode = String(body.newPasscode ?? "").trim();

      if (!newPasscode || newPasscode.length < 4) {
        return NextResponse.json(
          { error: "New passcode must be at least 4 characters long." },
          { status: 400 }
        );
      }

      if (newPasscode.length > 100) {
        return NextResponse.json(
          { error: "New passcode is too long (maximum 100 characters)." },
          { status: 400 }
        );
      }

      let authenticated = false;

      if (method === "key" || recoveryKey) {
        authenticated = await verifyRecoveryKey(recoveryKey);
        if (!authenticated) {
          return NextResponse.json(
            { error: "Incorrect Master Recovery Key." },
            { status: 400 }
          );
        }
      } else if (method === "code" || otpCode) {
        authenticated = await verifyResetOtp(otpCode);
        if (!authenticated) {
          return NextResponse.json(
            { error: "Invalid or expired 6-digit verification code." },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Please provide either the Master Recovery Key or the 6-digit email code." },
          { status: 400 }
        );
      }

      await setAdminPasscode(newPasscode);
      const passcodeHash = hmacSha256(newPasscode);
      const sessionToken = generateAdminSessionToken(newPasscode);

      return NextResponse.json({
        ok: true,
        message: "Passcode successfully reset! You can now log into your dashboard.",
        sessionToken,
        passcodeHash,
      });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (err) {
    console.error("Auth reset error:", err);
    return NextResponse.json({ error: "Unexpected error occurred." }, { status: 500 });
  }
}

