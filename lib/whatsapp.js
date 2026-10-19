
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const API_VERSION = "v23.0";
const SECRET_NAME = "og-mart/whatsapp";

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

let cachedSecretPromise = null;

async function getWhatsAppSecret() {
  if (!cachedSecretPromise) {
    cachedSecretPromise = (async () => {
      const response = await secretsClient.send(
        new GetSecretValueCommand({
          SecretId: SECRET_NAME,
        })
      );

      if (!response.SecretString) {
        throw new Error("WHATSAPP_SECRET_EMPTY");
      }

      let secret;

      try {
        secret = JSON.parse(response.SecretString);
      } catch {
        throw new Error("WHATSAPP_SECRET_INVALID_JSON");
      }

      if (
        !secret.WHATSAPP_TOKEN ||
        !secret.PHONE_NUMBER_ID ||
        !secret.WHATSAPP_TEMPLATE_NAME
      ) {
        throw new Error("WHATSAPP_SECRET_INCOMPLETE");
      }

      return secret;
    })().catch((err) => {
      cachedSecretPromise = null;
      throw err;
    });
  }

  return cachedSecretPromise;
}

async function sendWhatsAppTemplate({
  to,
  templateName,
  params = [],
  language = "en_US",
}) {
  // 1. Validate phone number
  const phone = String(to ?? "").replace(/[\s+\-()]/g, "");

  if (!/^(?:91)?[6-9]\d{9}$/.test(phone)) {
    throw new Error("WHATSAPP_INVALID_PHONE");
  }

  // 2. Validate template parameters
  if (
    !Array.isArray(params) ||
    params.some(
      (p) =>
        p == null ||
        !["string", "number", "boolean"].includes(typeof p)
    )
  ) {
    throw new Error("WHATSAPP_INVALID_PARAMS");
  }

  if (
    typeof language !== "string" ||
    !/^[a-z]{2}_[A-Z]{2}$/.test(language)
  ) {
    throw new Error("WHATSAPP_INVALID_LANGUAGE");
  }

  // 3. Load credentials from AWS Secrets Manager
  const secret = await getWhatsAppSecret();
  const selectedTemplate =
    templateName || secret.WHATSAPP_TEMPLATE_NAME;

  if (
    typeof selectedTemplate !== "string" ||
    !/^[a-z0-9_]+$/.test(selectedTemplate)
  ) {
    throw new Error("WHATSAPP_INVALID_TEMPLATE");
  }

  // 4. Prepare message
  const body = {
    messaging_product: "whatsapp",
    to: phone.startsWith("91") ? phone : `91${phone}`,
    type: "template",
    template: {
      name: selectedTemplate,
      language: { code: language },
      ...(params.length > 0 && {
        components: [
          {
            type: "body",
            parameters: params.map((p) => ({
              type: "text",
              text: String(p),
            })),
          },
        ],
      }),
    },
  };

  // 5. Send request with timeout
  let response;

  try {
    response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${secret.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      }
    );
  } catch (err) {
    if (err.name === "TimeoutError" || err.name === "AbortError") {
      throw new Error("WHATSAPP_TIMEOUT");
    }

    throw new Error("WHATSAPP_NETWORK_ERROR");
  }

  // 6. Parse response
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("WHATSAPP_INVALID_RESPONSE");
  }

  // 7. Handle API errors
  if (!response.ok) {
    const error = data?.error;

    console.error("WhatsApp API error:", {
      status: response.status,
      code: error?.code,
      subcode: error?.error_subcode,
      message: error?.message,
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error("WHATSAPP_AUTH_ERROR");
    }

    if (response.status === 429) {
      throw new Error("WHATSAPP_RATE_LIMIT");
    }

    if (response.status >= 500) {
      throw new Error("WHATSAPP_SERVER_ERROR");
    }

    throw new Error("WHATSAPP_API_ERROR");
  }

  return {
    success: true,
    messageId: data.messages?.[0]?.id ?? null,
  };
}

module.exports = {
  sendWhatsAppTemplate,
};
