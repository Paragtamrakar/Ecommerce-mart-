
import { NextResponse } from "next/server";
import { sendWhatsAppTemplate } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request) {
    // Never expose a public WhatsApp test endpoint in production.
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            {
                success: false,
                error: "TEST_ENDPOINT_DISABLED",
            },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { to, params = [] } = body;

        if (
            typeof to !== "string" ||
            !to.trim() ||
            !Array.isArray(params) ||
            params.length !== 3 ||
            !params.every((param) => typeof param === "string")
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Provide a phone number and exactly 3 string parameters",
                },
                { status: 400 }
            );
        }

        const result = await sendWhatsAppTemplate({
            to: to.trim(),
            templateName: "og_mart_01",
            params,
        });

        return NextResponse.json({
            success: true,
            messageId: result.messageId,
        });
    } catch (error) {
        console.error("WhatsApp test error:", {
            message: error.message,
            code: error.code,
        });

        return NextResponse.json(
            {
                success: false,
                error:
                    process.env.NODE_ENV === "development"
                        ? error.message
                        : "WHATSAPP_TEST_FAILED",
            },
            { status: 502 }
        );
    }
}
