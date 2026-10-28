import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { OrderDetails } from "@/config/site";

export async function POST(request: Request) {
  try {
    const orderData: OrderDetails = await request.json();

    // 1. Log order to server console
    console.log("📦 NEW ORDER RECEIVED:", JSON.stringify(orderData, null, 2));

    // 2. Persist order to local orders.json file
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const ordersFilePath = path.join(dataDir, "orders.json");
    let existingOrders: OrderDetails[] = [];

    if (fs.existsSync(ordersFilePath)) {
      try {
        const fileContent = fs.readFileSync(ordersFilePath, "utf8");
        existingOrders = JSON.parse(fileContent);
      } catch {
        existingOrders = [];
      }
    }

    const newOrder: OrderDetails = {
      orderId: `AC-${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
    };

    existingOrders.unshift(newOrder);
    fs.writeFileSync(ordersFilePath, JSON.stringify(existingOrders, null, 2), "utf8");

    // 3. Optional: Forward to Google Sheets Webhook if configured in environment
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });
      } catch (webhookErr) {
        console.error("Google Sheets Webhook Sync Error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder.orderId,
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ordersFilePath = path.join(process.cwd(), "data", "orders.json");
    if (fs.existsSync(ordersFilePath)) {
      const fileContent = fs.readFileSync(ordersFilePath, "utf8");
      return NextResponse.json(JSON.parse(fileContent));
    }
    return NextResponse.json([]);
  } catch {
    return NextResponse.json({ error: "Failed to read orders" }, { status: 500 });
  }
}
