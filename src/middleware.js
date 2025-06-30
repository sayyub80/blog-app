

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyAdminToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret, {
      issuer: 'your-app-name',
      audience: 'admin',
    });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;
  const isLoggedIn = token && await verifyAdminToken(token);

  // Redirect logged-in users away from login page
  if (pathname.startsWith('/auth/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callback', pathname);
      if (token) {
        loginUrl.searchParams.set('error', 'session_expired');
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};