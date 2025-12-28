import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Proteggi le route della dashboard - solo super e admin
    if (path.startsWith('/dashboard')) {
      if (token?.role === 'patient') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // I pazienti possono accedere solo alle loro sessioni
    if (path.startsWith('/session/')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/session/:path*'],
};
