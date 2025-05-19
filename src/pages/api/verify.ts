import { Client, Account } from "node-appwrite";
import type { APIContext } from "astro";

export async function GET({ url }: APIContext) {
  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
    .setProject(import.meta.env.APPWRITE_PROJECT_ID)
    .setKey(import.meta.env.APPWRITE_API_KEY);

  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");

  const redirectTo = (success: boolean) =>
    new Response(null, {
      status: 302,
      headers: {
        Location: `/account-verified?success=${success}`,
      },
    });

  if (!userId || !secret) {
    return redirectTo(false);
  }

  try {
    await account.updateVerification(userId, secret);
    return redirectTo(true);
  } catch (error) {
    console.error("Verification failed:", error);
    return redirectTo(false);
  }
}
