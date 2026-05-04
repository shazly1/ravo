import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Never touch login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('ravo_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const user = await verifyToken(token);
    if (!user) {
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('ravo_token');
      return response;
    }

    // Only super_admin can access admins management
    if (pathname.startsWith('/admin/admins') && user.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    return NextResponse.next();
  }

  // Protect admin APIs
  if (pathname.startsWith('/api/admins')) {
    const token = req.cookies.get('ravo_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const user = await verifyToken(token);
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admins/:path*'],
};
