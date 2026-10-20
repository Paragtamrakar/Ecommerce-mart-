
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

// Fetch orders
export async function GET() {
    try {
        await dbConnect();

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                orders,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Fetch orders failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

// Create order and trigger WhatsApp after saving
export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();

        const {
            user,
            items,
            totalAmount,
            paymentType,
        } = body;

        if (
            !user?.name?.trim() ||
            !user?.phone?.trim() ||
            !user?.address?.trim() ||
            !Array.isArray(items) ||
            items.length === 0 ||
            typeof totalAmount !== "number" ||
            !Number.isFinite(totalAmount) ||
            totalAmount <= 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid or missing order fields",
                },
                { status: 400 }
            );
        }

        const orderNumber = `OGM-${Date.now()}`;

        const orderCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // 1. Save the order first.
        const order = await Order.create({
            user,
            items,
            totalAmount,
            paymentType: paymentType || "COD",
            orderNumber,
            orderCode,
        });

        // 2. Notify the admin dashboard.
        if (global.io) {
            global.io.emit("new-order", order);
        }

        // 3. Start WhatsApp notification without waiting for it.
        // Both module loading and message sending are non-blocking.
        void import("@/lib/whatsapp")
            .then(({ sendWhatsAppTemplate }) => {
                return sendWhatsAppTemplate({
                    to: user.phone,
                    templateName: "og_mart_01",
                    language: "en",
                    params: [
                        user.name.trim(),
                        order.orderNumber || order.orderCode,
                        Number(totalAmount).toFixed(2),
                    ],
                });
            })
            .then((result) => {
                console.log("Order WhatsApp notification accepted:", {
                    orderId: String(order._id),
                    messageId: result.messageId,
                });
            })
            .catch((error) => {
                console.error("Order WhatsApp notification failed:", {
                    orderId: String(order._id),
                    error: error.message,
                });
            });

        // 4. Return success without waiting for WhatsApp.
        return NextResponse.json(
            {
                success: true,
                message: "Order Placed Successfully",
                order,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Order creation failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
