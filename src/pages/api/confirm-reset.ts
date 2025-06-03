import type { APIRoute } from 'astro';
import { Client, Account } from 'node-appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
  .setProject(import.meta.env.APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.APPWRITE_API_KEY);

const account = new Account(client);

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const token = data.get('token')?.toString();
  const secret = data.get('secret')?.toString();
  const expiresAt = data.get('expiresAt')?.toString();
  const password = data.get('password')?.toString();
  const confirmPassword = data.get('confirmPassword')?.toString();

  const expiresAtNumber = Number(expiresAt);

  if (!token || !secret || !password || password !== confirmPassword) {
    return new Response('Invalid request', { status: 400 });
  }

  if (expiresAtNumber < Date.now()) {
    return new Response('Token invalid or expired', { status: 400 });
  }

  try {
    await account.updateRecovery(token, secret, password);
    return redirect('/reset-password/success');
  } catch (err) {
    console.error('Reset error:', err);
    return new Response('Internal error', { status: 500 });
  }
};
