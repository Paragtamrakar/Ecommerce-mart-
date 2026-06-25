import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

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

        // Basic Validation
        if (
            !user?.name ||
            !user?.phone ||
            !user?.address ||
            !items?.length ||
            !totalAmount
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields",
                },
                { status: 400 }
            );
        }

        // Generate Order Number
        const orderNumber = `OGM-${Date.now()}`;

        // Generate 6 Digit Order Code
        const orderCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const order = await Order.create({
            user,
            items,
         totalAmount,
            // deliveryPhone,
            // deliveryAddress,
            paymentType: paymentType || "COD",

            // orderNumber,
            orderCode,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Order Placed Successfully",
                order,
            },
            { status: 201 }
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