// Client-side helper for Meta Pixel + Conversions API (CAPI) deduplication
// Formatted and optimized to match Vocab Joy (vocabjoy.com) & Ummah Wed (academy.ummahwed.com)

export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_AURAFRESH_PIXEL_ID ||
  process.env.NEXT_PUBLIC_FB_PIXEL_ID ||
  "1162023116505358";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Read cookie value by name in browser
 */
export const getClientCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

/**
 * Extract _fbp from browser cookies
 */
export const getFbp = (): string | null => {
  return getClientCookie("_fbp");
};

/**
 * Extract _fbc from browser cookies or URL fbclid fallback
 * (Stores in sessionStorage so sub-pages maintain the click id)
 */
export const getFbc = (): string | null => {
  const cookieFbc = getClientCookie("_fbc");
  if (cookieFbc) return cookieFbc;

  if (typeof window !== "undefined") {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get("fbclid") || sessionStorage.getItem("af_fb_click_id");
      if (fbclid) {
        sessionStorage.setItem("af_fb_click_id", fbclid);
        return `fb.1.${Date.now()}.${fbclid}`;
      }
    } catch {
      // Ignore storage errors in restricted private browsing
    }
  }
  return null;
};

/**
 * Generate a unique event ID for Meta deduplication
 */
export const generateEventId = (prefix: string = "af"): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Run a callback once window.fbq is loaded (script loads asynchronously).
 * Guarantees browser events aren't dropped during hydration.
 */
export const whenFbqReady = (callback: () => void, timeoutMs: number = 8000): (() => void) => {
  if (typeof window === "undefined") return () => {};
  if (typeof window.fbq === "function") {
    callback();
    return () => {};
  }
  const startedAt = Date.now();
  const timer = setInterval(() => {
    if (typeof window.fbq === "function" || Date.now() - startedAt >= timeoutMs) {
      clearInterval(timer);
      callback();
    }
  }, 300);
  return () => clearInterval(timer);
};

/**
 * Safe client-side Meta Pixel dispatcher
 */
export const fbqTrack = (
  eventName: string,
  customData: Record<string, unknown> = {},
  options: { eventID?: string } = {}
) => {
  whenFbqReady(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      try {
        if (options.eventID) {
          window.fbq("track", eventName, customData, { eventID: options.eventID });
        } else {
          window.fbq("track", eventName, customData);
        }
      } catch (e) {
        console.warn(`[FB Pixel] Error tracking ${eventName}:`, e);
      }
    }
  });
};

/* ==========================================================================
   BD PHONE NORMALIZATION & VALIDATION (Matches Vocab Joy)
   ========================================================================== */
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export const toEnglishDigits = (value: unknown): string => {
  return String(value || "")
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/\D/g, "");
};

export const normalizeBdPhone = (raw: unknown): string => {
  let digits = toEnglishDigits(raw);
  if (digits.startsWith("880") && digits.length >= 12) digits = digits.slice(2);
  else if (digits.startsWith("88") && digits.length === 12 && digits[2] === "0") digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("1")) digits = "0" + digits;
  return digits;
};

export const validateBdPhone = (raw: unknown): { ok: boolean; phone: string; message: string } => {
  const phone = normalizeBdPhone(raw);
  if (!phone) return { ok: false, phone, message: "মোবাইল নম্বর লিখুন।" };

  if (phone.length < 11) {
    const diff = 11 - phone.length;
    return { ok: false, phone, message: `আপনার নম্বরে ${diff}টি ডিজিট কম আছে।` };
  }
  if (phone.length > 11) {
    const diff = phone.length - 11;
    return { ok: false, phone, message: `আপনার নম্বরে ${diff}টি ডিজিট বেশি আছে।` };
  }
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    return { ok: false, phone, message: "নম্বরটি 013 থেকে 019 দিয়ে শুরু হতে হবে (যেমন: 017XXXXXXXX)।" };
  }
  return { ok: true, phone, message: "" };
};

/* ==========================================================================
   EVENT TRACKING INTERFACES & HELPERS
   ========================================================================== */
export interface TrackEventParams {
  eventName: "PageView" | "ViewContent" | "InitiateCheckout" | "Lead" | "Purchase" | "Contact";
  eventId?: string;
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

/**
 * Universal dual-dispatch: Meta Pixel (browser) + Conversions API (server)
 * Using identical eventId for 100% deduplication.
 */
export const trackMetaEvent = async ({
  eventName,
  eventId: providedEventId,
  eventData = {},
  userData = {},
}: TrackEventParams): Promise<string> => {
  if (typeof window === "undefined") return "";

  const eventId = providedEventId || generateEventId(eventName.toLowerCase().slice(0, 4));

  // 1. Browser Meta Pixel fire
  fbqTrack(eventName, eventData, { eventID: eventId });

  // 2. Server CAPI dispatch
  try {
    const fbp = getFbp();
    const fbc = getFbc();

    fetch("/api/capi", {
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
      keepalive: true,
    }).catch((err) => {
      console.warn("[CAPI Dispatch Error]:", err);
    });
  } catch (err) {
    console.warn("[CAPI Error]:", err);
  }

  return eventId;
};

/* ==========================================================================
   DEDICATED EVENT HANDLERS (Matching Vocab Joy & Ummah Wed)
   ========================================================================== */

/**
 * 1. ViewContent Tracker (Dual fire on product landing)
 */
export const trackViewContent = (product: {
  id: string;
  name?: string;
  bnTitle?: string;
  price: number;
}) => {
  const customData = {
    content_ids: [product.id],
    content_name: product.bnTitle || product.name || "AuraFresh Air Purifier",
    content_type: "product",
    value: product.price,
    currency: "BDT",
  };

  return trackMetaEvent({
    eventName: "ViewContent",
    eventData: customData,
  });
};

/**
 * 2. InitiateCheckout Tracker with Anti-Double Trigger & CAPI Phone Enrichment
 */
let hasInitiatedCheckout = false;
let initiateCheckoutEventId = "";

export interface InitiateCheckoutOptions {
  product?: {
    id: string;
    bnTitle?: string;
    name?: string;
    price: number;
  };
  source?: string;
  extraUserData?: {
    phone?: string;
    name?: string;
  };
}

export const trackInitiateCheckout = (options: InitiateCheckoutOptions = {}): string => {
  if (typeof window === "undefined") return "";

  const isEnrichment = Boolean(options.extraUserData?.phone);

  // If already triggered and this is not an enrichment with phone number, ignore duplicate click/focus
  if (hasInitiatedCheckout && !isEnrichment) {
    return initiateCheckoutEventId;
  }

  // Create or reuse the exact same eventId for enrichment
  if (!initiateCheckoutEventId) {
    initiateCheckoutEventId = generateEventId("ic");
  }
  const eventId = initiateCheckoutEventId;

  const product = options.product || {
    id: "pro-multi-room-500g",
    bnTitle: "প্রো মাল্টি-রুম বক্স (৫০০ গ্রাম)",
    price: 999,
  };

  const customData = {
    content_ids: [product.id],
    content_name: product.bnTitle || product.name,
    content_type: "product",
    value: product.price,
    currency: "BDT",
    source: options.source || "checkout_interaction",
  };

  // 1. Browser Meta Pixel: only fired ONCE (never duplicated on phone blur)
  if (!hasInitiatedCheckout) {
    fbqTrack("InitiateCheckout", customData, { eventID: eventId });
    hasInitiatedCheckout = true;
  }

  // 2. Server CAPI: fires initially and re-fires with phone enrichment to boost EMQ to 9.5+
  try {
    const fbp = getFbp();
    const fbc = getFbc();

    fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "InitiateCheckout",
        eventId,
        eventUrl: window.location.href,
        eventData: customData,
        fbc,
        fbp,
        phone: options.extraUserData?.phone || null,
        name: options.extraUserData?.name || null,
      }),
      keepalive: true,
    }).catch((err) => console.warn("[InitiateCheckout CAPI error]:", err));
  } catch (err) {
    console.warn("[InitiateCheckout Error]:", err);
  }

  return eventId;
};

/**
 * 3. Purchase Tracker (Uses exact orderId as eventId for guaranteed deduplication)
 */
export const trackPurchase = async (
  order: {
    orderId: string;
    productId?: string;
    product?: string;
    grandTotal: number;
    quantity?: number;
    customerName?: string;
    customerPhone?: string;
    customerAddress?: string;
  }
): Promise<string> => {
  const eventId = order.orderId;
  const customData = {
    content_ids: [order.productId || "pro-multi-room-500g"],
    content_name: order.product || "AuraFresh Air Purifier",
    content_type: "product",
    value: order.grandTotal,
    currency: "BDT",
    num_items: order.quantity || 1,
  };

  return trackMetaEvent({
    eventName: "Purchase",
    eventId,
    eventData: customData,
    userData: {
      name: order.customerName,
      phone: order.customerPhone,
      address: {
        city: order.customerAddress ? order.customerAddress.slice(0, 50) : undefined,
        country: "bd",
      },
    },
  });
};

/**
 * 4. Contact / Lead Tracker (WhatsApp click or hotline call)
 */
export const trackContact = (channel: "whatsapp" | "phone" | "hotline" = "whatsapp") => {
  const eventId = generateEventId("contact");
  return trackMetaEvent({
    eventName: "Contact",
    eventId,
    eventData: {
      channel,
      content_name: "Customer Support Inquiry",
      currency: "BDT",
      value: 0,
    },
  });
};
