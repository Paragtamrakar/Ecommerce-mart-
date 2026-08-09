import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET() {
    try {
        await dbConnect();

        // TEMPORARY — Login/session implement hone tak
        const deliveryPartnerName = "Vikas Patel";

        // FUTURE — Login implement hone ke baad:
        // const deliveryPartnerId = session.user.id;

        const orders = await Order.find({
            "deliveryPartner.name": deliveryPartnerName,
            status: "out-for-delivery",
        }).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                orders,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delivery Orders Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}