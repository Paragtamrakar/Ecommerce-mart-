
import { sendWhatsAppTemplate } from "../lib/whatsapp.js";

const to = process.argv[2];

if (!to) {
  console.error(
    "Usage: node scripts/test-whatsapp.mjs 91XXXXXXXXXX"
  );
  process.exit(1);
}

try {
  const result = await sendWhatsAppTemplate({
    to,
    templateName: "og_mart_01",
    language: "en",
    params: [
      "Test Customer",
      "OGM-TEST-001",
      "299.00",
    ],
  });

  console.log("WhatsApp send result:", result);
} catch (error) {
  console.error("WhatsApp test failed:", {
    message: error.message,
    code: error.code,
  });
  process.exitCode = 1;
}
