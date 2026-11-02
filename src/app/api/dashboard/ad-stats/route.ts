import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/adminAuth";

const BACKEND_BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.vocabjoy.com";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/of/order/ad-stats`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch ad stats";
    console.error("[DASHBOARD_API] Error fetching ad stats:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
