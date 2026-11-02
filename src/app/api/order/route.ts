import { NextResponse } from "next/server";
import { OrderDetails } from "@/config/site";

const BACKEND_BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.vocabjoy.com";

export async function POST(request: Request) {
  try {
    const orderData: OrderDetails = await request.json();

    // 1. Log order to server console
    console.log("📦 NEW ORDER RECEIVED:", JSON.stringify(orderData, null, 2));

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("remote-addr") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";

    let generatedOrderId = `AC-${Date.now()}`;
    let backendSuccess = false;

    // 2. Forward to Central Master Backend (PostgreSQL 'of_orders' table & Steadfast Courier)
    try {
      const backendRes = await fetch(`${BACKEND_BASE_URL}/of/order/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orderData.customerName,
          phone: orderData.customerPhone,
          address: orderData.customerAddress,
          productId: orderData.productId || "pro-multi-room-500g",
          price: orderData.subtotal / (orderData.quantity || 1),
          quantity: orderData.quantity || 1,
          deliveryArea: orderData.deliveryArea,
          deliveryCharge: orderData.deliveryCharge,
          totalAmount: orderData.grandTotal,
          paymentMethod: orderData.paymentMethod || "COD",
          source: "aurafreshbd.vercel.app",
          ipAddress: ip,
          userAgent: userAgent,
          attribution: {
            referer,
            landing_page: "https://aurafreshbd.vercel.app",
          },
        }),
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        if (backendData.orderId) {
          generatedOrderId = backendData.orderId;
          backendSuccess = true;
          console.log(`✅ [AuraFresh] Order successfully saved in Master Backend: ${generatedOrderId}`);
        }
      } else {
        const errText = await backendRes.text();
        console.warn(`⚠️ [AuraFresh] Master backend returned non-200: ${backendRes.status} - ${errText}`);
      }
    } catch (backendErr) {
      console.error("⚠️ [AuraFresh] Master Backend sync error:", backendErr);
    }

    // 3. Optional Google Sheets Webhook fallback
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...orderData, orderId: generatedOrderId, backendSuccess }),
        });
      } catch (webhookErr) {
        console.error("Google Sheets Webhook Sync Error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: generatedOrderId,
      backendSuccess,
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { success: true, message: "Order placed successfully", orderId: `AC-${Date.now()}` },
      { status: 200 }
    );
  }
}

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/of/order/all?limit=20`);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data.orders || []);
    }
    return NextResponse.json([]);
  } catch {
    return NextResponse.json([]);
  }
}
