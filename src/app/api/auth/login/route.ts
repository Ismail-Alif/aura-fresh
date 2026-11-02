import { NextResponse } from "next/server";
import { verifyAdminCredentials, createAdminToken, COOKIE_NAME } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const { email, password } = body;

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = {
      email: email.trim().toLowerCase(),
      name: "Alif Ismail",
      role: "admin" as const,
    };

    const token = createAdminToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Sign in successful",
      user,
      token,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[AUTH] Login error:", message, stack);
    return NextResponse.json(
      { success: false, message, detail: String(error) },
      { status: 500 }
    );
  }
}
