import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('accessToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  const isAuthPage = pathname.startsWith('/auth');
  const isBookPage = pathname.startsWith('/book');
  const isUnauthorizedPage = pathname === '/unauthorized';

  // 1. PUBLIC ROUTES: Always allow
  if (isBookPage || isUnauthorizedPage) {
    return NextResponse.next();
  }

  // 2. GUEST ACCESS: Not logged in
  if (!token) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 3. AUTHENTICATED ACCESS: Prevent Login Page access
  if (isAuthPage) {
    const dashboardMap: Record<string, string> = {
      'ROLE_ADMIN': '/admin',
      'ROLE_CASHIER': '/cashier/orders',
      'ROLE_WAITER': '/waiter/orders',
    };
    return NextResponse.redirect(new URL(dashboardMap[userRole || ''] || '/', request.url));
  }

  // 4. RBAC: Role-Based Access Control
  const roleProtectedPaths = [
    { prefix: '/admin', role: 'ROLE_ADMIN' },
    { prefix: '/cashier', role: 'ROLE_CASHIER' },
    { prefix: '/waiter', role: 'ROLE_WAITER' },
  ];

  for (const route of roleProtectedPaths) {
    if (pathname.startsWith(route.prefix) && userRole !== route.role) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// Optimized Matcher
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (if you have a static folder)
     * 4. all files with extensions (svg, jpg, ico, etc)
     */
    '/((?!api|_next|static|.*\\..*).*)',
  ],
};