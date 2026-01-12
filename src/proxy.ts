import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login', '/register', '/api/public', '/'];
const JWT_SECRET = process.env.JWT_SECRET!; 

async function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip public routes
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await verifyToken(token); 
    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*', 
    '/admin/:path*',
    '/api/protected/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
