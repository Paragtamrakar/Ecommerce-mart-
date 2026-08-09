import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

// This code is for changing the status and adding delivery partners

export async function PUT(request, { params }) {
    try {
        await dbConnect();

        const { id } = await params;

        const {
            status,
            deliveryPartner,
            verificationCode,
        } = await request.json();

        const allowedStatus = [
            "confirmed",
            "cancelled",
            "packing",
            "out-for-delivery",
            "delivered",
        ];

        const updateData = {};

        if (status) {
            if (!allowedStatus.includes(status)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Invalid Status",
                    },
                    { status: 400 }
                );
            }

            updateData.status = status;
        }

        if (deliveryPartner) {
            updateData.deliveryPartner = deliveryPartner;
        }

        // Find order first
        const existingOrder = await Order.findById(id);

        if (!existingOrder) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order Not Found",
                },
                { status: 404 }
            );
        }

        // Delivery verification
        if (status === "delivered") {
            if (!verificationCode) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Delivery verification code is required",
                    },
                    { status: 400 }
                );
            }

            if (verificationCode !== existingOrder.orderCode) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Invalid delivery verification code",
                    },
                    { status: 400 }
                );
            }

            updateData.deliveredAt = new Date();
        }

        const order = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // Socket.IO realtime update
        if (global.io) {
            global.io.emit("orderUpdated", order);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Order Updated Successfully",
                order,
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