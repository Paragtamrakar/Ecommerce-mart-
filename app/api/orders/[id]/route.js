// This code is for changing the status and add delivery partners for orders
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";


export async function PUT(request, { params }) {
    try {
        await dbConnect();

        const { id } = await params;
        const { status, deliveryPartner } = await request.json();

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
        const order = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order Not Found",
                },
                { status: 404 }
            );
        }

        if (global.io) {
            global.io.emit("orderUpdated", order)
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