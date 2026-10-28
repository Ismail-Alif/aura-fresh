// Client-side helper for Meta Pixel + Conversions API (CAPI) deduplication

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export const generateEventId = (prefix: string = "af"): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
};

export interface TrackEventParams {
  eventName: "PageView" | "ViewContent" | "InitiateCheckout" | "Lead" | "Purchase";
  eventData?: Record<string, unknown>;
  userData?: {
    name?: string;
    phone?: string;
    address?: {
      city?: string;
      zipCode?: string;
      country?: string;
    };
  };
}

export const trackMetaEvent = async ({
  eventName,
  eventData = {},
  userData = {},
}: TrackEventParams) => {
  if (typeof window === "undefined") return;

  const eventId = generateEventId(eventName.toLowerCase().slice(0, 4));

  // 1. Client-Side Meta Pixel fire (with eventID for deduplication)
  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", eventName, eventData, { eventID: eventId });
    } catch (e) {
      console.warn("Client Meta Pixel track error:", e);
    }
  }

  // 2. Server-Side CAPI fire (with same eventId)
  try {
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        eventUrl: window.location.href,
        fbc,
        fbp,
        eventData,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
      }),
    });
  } catch (err) {
    console.warn("CAPI client dispatch error:", err);
  }
};
