'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  console.log("--- LOGIN ATTEMPT RECEIVED ---");
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log("Username:", username);

  if (!username || !password) {
    console.log("Error: Missing fields");
    return { error: 'Username dan password wajib diisi' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log("Error: User not found");
      return { error: 'User tidak ditemukan' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Error: Invalid password");
      return { error: 'Password salah' };
    }

    console.log("Success: Password valid, creating session...");

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ 
      userId: user.id, 
      username: user.username, 
      role: user.role, 
      name: user.name,
      expires 
    });

    // Save in cookie
    (await cookies()).set('session', session, { 
      expires, 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    console.log("Session cookie set, redirecting...");

  } catch (error) {
    console.error('CRITICAL LOGIN ERROR:', error);
    return { error: 'Terjadi kesalahan pada server' };
  }

  // Redirect must be outside try-catch
  redirect('/admin');
}

export async function logout() {
  (await cookies()).set('session', '', { expires: new Date(0), path: '/' });
  redirect('/');
}
