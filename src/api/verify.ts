import { Client, Account } from "node-appwrite";
import type { APIContext } from "astro";

export async function GET({ url, redirect }: APIContext) {
  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
    .setProject(import.meta.env.APPWRITE_PROJECT_ID)
    .setKey(import.meta.env.APPWRITE_API_KEY);

  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");

  if (!userId || !secret) {
    return redirect("/account-verified?success=false");
  }

  try {
    await account.updateVerification(userId, secret);
    return redirect("/account-verified?success=true");
  } catch (error) {
    console.error("Verification failed:", error);
    return redirect("/account-verified?success=false");
  }
}
