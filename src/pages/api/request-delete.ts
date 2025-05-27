import { Resend } from "resend";
import { Client, Users, Databases, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
  .setProject(import.meta.env.APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.APPWRITE_API_KEY);

const users = new Users(client);
const databases = new Databases(client);
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({
  request,
  redirect,
}: {
  request: Request;
  redirect: (link: string) => void;
}) {
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

    const deleteLink = `${import.meta.env.URL}/delete-account/confirm?token=${token}`;

    await resend.emails.send({
      from: "Nissu <no-reply@nissu.app>",
      to: email,
      subject: "Confirm account deletion",
      html: `<p>Click the link below to confirm deletion of your account:</p>
             <a href="${deleteLink}">Delete Account</a>`,
    });

    return redirect("/delete-account?status=success");
  } catch (error) {
    console.error("Error:", error);
    return new Response(`Internal error: ${JSON.stringify(error)}`, {
      status: 500,
    });
  }
}
