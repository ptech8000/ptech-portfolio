import { NextResponse } from "next/server";
import { getAdminPasscode, setAdminPasscode } from "../../../lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentPasscode = String(body.currentPasscode ?? "").trim();
    const newPasscode = String(body.newPasscode ?? "").trim();

    const actualPasscode = await getAdminPasscode();
    if (!currentPasscode || currentPasscode !== actualPasscode) {
      return NextResponse.json({ error: "Current passcode is incorrect." }, { status: 401 });
    }

    if (!newPasscode || newPasscode.length < 4) {
      return NextResponse.json({ error: "New passcode must be at least 4 characters." }, { status: 400 });
    }

    if (newPasscode.length > 100) {
      return NextResponse.json({ error: "New passcode is too long." }, { status: 400 });
    }

    const success = await setAdminPasscode(newPasscode);
    if (!success) {
      return NextResponse.json({ error: "Could not update passcode." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Passcode updated successfully." });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}

