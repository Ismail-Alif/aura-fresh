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
    id: string;
    action: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  const admin = await getCurrentAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action } = params;

  try {
    let url = "";
    let method = "POST";

    if (action === "retry-courier") {
      url = `${BACKEND_BASE_URL}/of/order/${id}/retry-courier`;
      method = "POST";
    } else if (action === "retry-capi") {
      url = `${BACKEND_BASE_URL}/of/order/${id}/retry-capi`;
      method = "POST";
    } else if (action === "confirm-phone") {
      url = `${BACKEND_BASE_URL}/of/order/${id}/confirm-phone`;
      method = "PATCH";
    } else if (action === "archive") {
      url = `${BACKEND_BASE_URL}/of/order/${id}/archive`;
      method = "PATCH";
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : `Failed to perform ${action}`;
    console.error(`[DASHBOARD_API] Error executing action ${action} on ${id}:`, message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  return POST(request, { params });
}
