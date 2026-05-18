import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let username = '';
    let password = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      username = body.username;
      password = body.password;
    } else {
      const formData = await request.formData();
      username = formData.get('username') as string;
      password = formData.get('password') as string;
    }

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 });
    }

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
    const cookieStore = await cookies();
    cookieStore.set('session', session, { 
      expires, 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    // FIX: Get correct host for redirect
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    
    // If it's a standard form post, redirect to the absolute URL based on the current host
    if (!contentType.includes('application/json')) {
       const redirectPath = user.role === 'STUDENT' ? '/portal' : '/admin';
       const redirectUrl = new URL(redirectPath, `${protocol}://${host}`);
       return NextResponse.redirect(redirectUrl.toString(), 303);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
