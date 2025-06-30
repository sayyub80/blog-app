import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;

  // If user is logged in and tries to access /auth/login, redirect to /admin
  if (pathname.startsWith('/auth/login') && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret, {
        issuer: 'your-app-name',
        audience: 'admin',
      });
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch {
      // If token is invalid, let them see the login page
    }
  }

  // Protect /admin and /api/admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callback', pathname);
      return NextResponse.redirect(loginUrl);
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret, {
        issuer: 'your-app-name',
        audience: 'admin',
      });
      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('error', 'session_expired');
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
  runtime: 'experimental-edge',
};