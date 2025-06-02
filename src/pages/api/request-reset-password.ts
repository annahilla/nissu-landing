import { Resend } from "resend";
import { Client, Users, Databases, ID } from "node-appwrite";
import type { APIRoute } from "astro";

const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
  .setProject(import.meta.env.APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.APPWRITE_API_KEY);

const users = new Users(client);
const databases = new Databases(client);
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const email = data.get("email")?.toString();

  if (!email) {
    return new Response("Missing email", { status: 400 });
  }

  try {
    const allUsers = await users.list();
    const matchedUser = allUsers.users.find((u) => u.email === email);

    if (!matchedUser) {
      return new Response("User not found", { status: 404 });
    }

    const userId = matchedUser.$id;
    const token = crypto.randomUUID();

    await databases.createDocument(
      import.meta.env.APPWRITE_DB,
      import.meta.env.APPWRITE_COL_DELETE_TOKENS_ID,
      ID.unique(),
      {
        token,
        userId,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24,
      }
    );

    const resetPasswordLink = `${import.meta.env.URL}/reset-password/process-reset-password?token=${token}`;

    await resend.emails.send({
      from: "Nissu <no-reply@nissu.app>",
      to: email,
      subject: "Reset Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetPasswordLink}">Change password</a>`,
    });

    return redirect("/reset-password?status=success");
  } catch (error) {
    console.error("Error:", error);
    return redirect("/reset-password?status=error");
  }
};
