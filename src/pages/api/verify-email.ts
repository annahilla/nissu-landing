import type { APIRoute } from 'astro';
import { Client, Account } from 'node-appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT!)
  .setProject(import.meta.env.APPWRITE_PROJECT_ID!)
  .setKey(import.meta.env.APPWRITE_API_KEY!);

const account = new Account(client);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userId, secret } = await request.json();

    if (!userId || !secret) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid link.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await account.updateVerification(userId, secret);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email verified successfully.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error verifying email:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Error verifying email.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
