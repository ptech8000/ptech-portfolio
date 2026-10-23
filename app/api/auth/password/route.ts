import { NextResponse } from "next/server";
import {
  setAdminPasscode,
  verifyAdminPasscode,
  hmacSha256,
  generateAdminSessionToken,
} from "../../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentPasscode = String(body.currentPasscode ?? "").trim();
    const newPasscode = String(body.newPasscode ?? "").trim();
    const clientHash = String(body.clientHash ?? "").trim();

    if (!currentPasscode) {
      return NextResponse.json({ error: "Current passcode is required." }, { status: 400 });
    }

    const check = await verifyAdminPasscode(currentPasscode, clientHash);
    if (!check.valid) {
      return NextResponse.json({ error: "Current passcode is incorrect." }, { status: 401 });
    }

    if (!newPasscode || newPasscode.length < 4) {
      return NextResponse.json({ error: "New passcode must be at least 4 characters." }, { status: 400 });
    }

    if (newPasscode.length > 100) {
      return NextResponse.json({ error: "New passcode is too long." }, { status: 400 });
    }

    await setAdminPasscode(newPasscode);
    const passcodeHash = hmacSha256(newPasscode);
    const sessionToken = generateAdminSessionToken(newPasscode);

    return NextResponse.json({
      ok: true,
      message: "Passcode updated successfully.",
      sessionToken,
      passcodeHash,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
