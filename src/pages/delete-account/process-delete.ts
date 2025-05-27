import type { APIRoute } from "astro";
import { Client, Users, Databases } from "node-appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
  .setProject(import.meta.env.APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.APPWRITE_API_KEY);

const users = new Users(client);
const databases = new Databases(client);

export const GET: APIRoute = async ({ url, redirect }) => {
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Token missing", { status: 400 });
  }

  try {
    const documents = await databases.listDocuments(
      import.meta.env.APPWRITE_DB,
      import.meta.env.APPWRITE_COL_DELETE_TOKENS_ID
    );

    console.log(
      "Tokens in DB:",
      documents.documents.map((doc) => doc.token)
    );

    const matched = documents.documents.find((doc) => doc.token === token);

    if (!matched) {
      return new Response("No matching token found", { status: 404 });
    }

    if (matched.expiresAt < Date.now()) {
      return new Response("Token expired", { status: 410 });
    }
    await users.delete(matched.userId);

    await databases.deleteDocument(
      import.meta.env.APPWRITE_DB,
      import.meta.env.APPWRITE_COL_DELETE_TOKENS_ID,
      matched.$id
    );

    return redirect("/delete-account/confirm?status=success");
  } catch (err) {
    console.error("Error deleting user:", err);
    return redirect("/delete-account/confirm?status=error");
  }
};
