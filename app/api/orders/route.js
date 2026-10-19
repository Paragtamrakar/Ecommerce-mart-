import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";


// This call fetches the data 
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
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}


// This function creates orders 

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
            !user?.name ||
            !user?.phone ||
            !user?.address ||
            !Array.isArray(items) ||
            items.length === 0 ||
            typeof totalAmount !== "number" ||
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

        const order = await Order.create({
            user,
            items,
            totalAmount,
            paymentType: paymentType || "COD",
            orderNumber,
            orderCode,
        });

        // Notify the admin dashboard via Socket.IO.
        if (global.io) {
            global.io.emit("new-order", order);
        }

        // Respond to the customer without waiting for WhatsApp.
        // A WhatsApp failure must not undo the saved order.
        const response = NextResponse.json(
            {
                success: true,
                message: "Order Placed Successfully",
                order,
            },
            { status: 201 }
        );

        // Send WhatsApp asynchronously on the server.
        const { sendWhatsAppTemplate } = await import("@/lib/whatsapp");

        sendWhatsAppTemplate({
            to: user.phone,
            templateName: "og_mart_01",
            params: [
                user.name,
                order.orderNumber || order.orderCode,
                Number(totalAmount).toFixed(2),
            ],
        }).catch((error) => {
            console.error("Order WhatsApp notification failed:", {
                orderId: String(order._id),
                error: error.message,
            });
        });

        return response;
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
