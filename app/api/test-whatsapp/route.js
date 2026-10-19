
import { NextResponse } from "next/server";
import { sendWhatsAppTemplate } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request) {
  // Production mein test endpoint ko public mat chhodna.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, error: "TEST_ENDPOINT_DISABLED" },
      { status: 403 }
    );
  }

  try {
    const { to, params = [] } = await request.json();

    if (!to) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppTemplate({
      to,
      params,
    });

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  }  catch (error) {
  console.error("WhatsApp test error:", error);

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
}}
