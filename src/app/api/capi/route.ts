import { NextResponse } from "next/server";
import crypto from "crypto";

const __name = (n?: string | null) => {
  if (!n) return { fn: null, ln: null };

  const parts = n.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return {
      fn: parts[0],
      ln: null,
    };
  }

  const ln = parts.pop() || null;
  const fn = parts.join(" ");

  return { fn, ln };
};

const __phone = (phone?: string | null) => {
  if (!phone) return null;

  let p = phone.replace(/\D/g, ""); // remove non-digits

  if (p.startsWith("0")) {
    p = "880" + p.slice(1);
  }

  if (!p.startsWith("880")) {
    p = "880" + p;
  }

  return p;
};

// SHA256 hash helper for Meta CAPI compliance
const hash = (value?: string | null) => {
  if (!value) return null;
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
};

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Lead",
  "Purchase",
  "Contact",
]);

const ALLOWED_ROOT_DOMAINS = ["aurafreshbd.com", "aurafresh.com", "aerocure.com"];

const isValidAuraFreshUrl = (urlStr?: string | null): boolean => {
  if (!urlStr || typeof urlStr !== "string") return false;
  try {
    const parsed = new URL(urlStr);
    const host = parsed.hostname;
    const isDevHost = host === "localhost" || host === "127.0.0.1";
    const allowed =
      ALLOWED_ROOT_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`)) ||
      (isDevHost && process.env.NODE_ENV !== "production");
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && allowed;
  } catch {
    return false;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      eventName,
      eventId,
      eventUrl,
      fbc,
      fbp,
      eventData,
      name,
      phone,
      address,
      testEventCode,
    } = body;

    if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json(
        { success: false, error: `Invalid or disallowed eventName: ${eventName}` },
        { status: 400 }
      );
    }

    const pixelId =
      process.env.NEXT_PUBLIC_AURAFRESH_PIXEL_ID ||
      process.env.NEXT_PUBLIC_FB_PIXEL_ID ||
      "1162023116505358";
    const accessToken =
      process.env.AURAFRESH_CAPI_TOKEN ||
      process.env.FB_CAPI_TOKEN ||
      "EAAVJ1Tj8PswBS0XSdi6ZCUMkwmIJujWSXWXXAWwgNJaZATSEX032UDvxMNC78VdulWxzq205C1aIDPPZCWnt3weZAFOtj09rHWlutASwYBDZC4etqZCSIoZAuDFKHGihNcZCLy04VG8xHQuG2KYSXMjpKEcpTxQYYlTm1UYGtYKS4lXao8zjKhZBgq2fyHklmSI93MQZDZD";

    if (!pixelId || !accessToken) {
      console.log(`[CAPI Info] Event ${eventName} received (Pixel/Token not set in env yet).`);
      return NextResponse.json({
        success: true,
        mock: true,
        message: "CAPI endpoint ready. Set NEXT_PUBLIC_AURAFRESH_PIXEL_ID and AURAFRESH_CAPI_TOKEN to go live.",
      });
    }

    // Extract IP and User Agent
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("remote-addr");
    const userAgent = req.headers.get("user-agent") || "";

    const { fn, ln } = __name(name);
    const phn = __phone(phone);

    const referer = req.headers.get("referer");
    const sourceUrl =
      [eventUrl, referer].find((candidate) => isValidAuraFreshUrl(candidate)) ||
      "https://aurafreshbd.com";

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: eventId || `af_${Date.now()}`,
          event_source_url: sourceUrl,
          user_data: {
            ...(phn && { ph: [hash(phn)] }),
            ...(fn && { fn: [hash(fn)] }),
            ...(ln && { ln: [hash(ln)] }),
            ...(ip && { client_ip_address: ip }),
            ...(userAgent && { client_user_agent: userAgent }),
            ...(fbp && fbp !== "null" && { fbp }),
            ...(fbc && fbc !== "null" && { fbc }),
            country: [hash(address?.country || "bd")],
            ...(address?.city && { ct: [hash(address.city)] }),
            ...(address?.zipCode && { zp: [hash(address.zipCode)] }),
          },
          custom_data: eventData || {},
        },
      ],
    };

    // Test event code support for Meta Events Manager testing
    const testCode = testEventCode || req.headers.get("x-fb-test-code") || process.env.AURAFRESH_TEST_EVENT_CODE;
    if (testCode) {
      payload.test_event_code = testCode;
    }

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    if (!response.ok || result.error) {
      console.error("Meta CAPI Error response:", result);
      return NextResponse.json(
        { success: false, error: result.error || "Event delivery failed" },
        { status: response.ok ? 502 : response.status || 400 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("CAPI error:", err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
