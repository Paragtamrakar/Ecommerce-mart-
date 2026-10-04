import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

let cachedSecret = null;

export async function getMongoUri() {
  // Local development
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Production / EC2
  if (!process.env.MONGODB_SECRET_NAME) {
    throw new Error(
      "MONGODB_URI or MONGODB_SECRET_NAME must be defined"
    );
  }

  if (cachedSecret) {
    return cachedSecret;
  }

  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION || "ap-south-1",
  });

  const command = new GetSecretValueCommand({
    SecretId: process.env.MONGODB_SECRET_NAME,
  });

  const response = await client.send(command);

  if (!response.SecretString) {
    throw new Error("MongoDB secret has no SecretString");
  }

  const secret = JSON.parse(response.SecretString);

  if (!secret.MONGODB_URI) {
    throw new Error("MONGODB_URI not found inside AWS secret");
  }

  cachedSecret = secret.MONGODB_URI;

  return cachedSecret;
}