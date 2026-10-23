import { NextResponse } from "next/server";
import { verifyAdminPasscode } from "../../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const passcode = String(body.passcode ?? "").trim();
    const clientHash = String(body.clientHash ?? "").trim();

    if (!passcode) {
      return NextResponse.json({ error: "Passcode is required." }, { status: 400 });
    }

    const check = await verifyAdminPasscode(passcode, clientHash);
    if (!check.valid) {
      return NextResponse.json({ error: "Invalid admin passcode." }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      token: check.token,
      passcodeHash: check.hash,
    });
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }
}
