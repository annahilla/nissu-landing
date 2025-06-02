import type { APIRoute } from "astro";
import { Client, Users, Databases, Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
  .setProject(import.meta.env.APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.APPWRITE_API_KEY);

const users = new Users(client);
const databases = new Databases(client);

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const token = data.get("token")?.toString();
  const password = data.get("password")?.toString();
  const confirmPassword = data.get("confirmPassword")?.toString();

  if (!token || !password || password !== confirmPassword) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    const res = await databases.listDocuments(
      import.meta.env.APPWRITE_DB,
      import.meta.env.APPWRITE_COL_DELETE_TOKENS_ID,
      [Query.equal("token", token)]
    );

    const resetDoc = res.documents[0];
    if (!resetDoc || resetDoc.expiresAt < Date.now()) {
      return new Response("Token invalid or expired", { status: 400 });
    }

    const userId = resetDoc.userId;

    await users.updatePassword(userId, password);

    await databases.deleteDocument(
      import.meta.env.APPWRITE_DB,
      import.meta.env.APPWRITE_COL_DELETE_TOKENS_ID,
      resetDoc.$id
    );

    return redirect("/reset-password-success");
  } catch (err) {
    console.error("Reset error:", err);
    return new Response("Internal error", { status: 500 });
  }
};
