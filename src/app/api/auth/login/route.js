import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { username, password } = await request.json();

  // Validate credentials
  const isValid = username === process.env.ADMIN_USERNAME &&
                  password === process.env.ADMIN_PASSWORD;

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('your-app-name')
    .setAudience('admin')
    .setExpirationTime('2h')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 2,
  });

  return NextResponse.json({ success: true });
}