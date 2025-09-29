import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'fallback-secret'; // Use env var in production

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to API, login page, and static assets
  if (
    pathname.startsWith('/api') ||
    pathname === '/login' ||
    pathname.includes('.') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};