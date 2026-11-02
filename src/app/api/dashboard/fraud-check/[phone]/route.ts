import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BACKEND_BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.vocabjoy.com";

interface Params {
  params: {
    phone: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { phone } = params;

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/of/order/fraud-check/${encodeURIComponent(phone)}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to check fraud";
    console.error(`[DASHBOARD_API] Fraud check error for ${phone}:`, message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
