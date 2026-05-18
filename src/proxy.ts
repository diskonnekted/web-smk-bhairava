import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedAdminRoutes = ["/admin"];
const protectedPortalRoutes = ["/portal"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  const isProtectedAdminRoute = protectedAdminRoutes.some(route => path.startsWith(route));
  const isProtectedPortalRoute = protectedPortalRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
  
  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;
  const userRole = session?.role;

  // General redirection logic
  if ((isProtectedAdminRoute || isProtectedPortalRoute) && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublicRoute && session) {
    const target = userRole === 'STUDENT' ? '/portal' : '/admin';
    return NextResponse.redirect(new URL(target, req.nextUrl));
  }

  // RBAC for /admin routes
  if (isProtectedAdminRoute && session) {
    // Students cannot access /admin at all
    if (userRole === 'STUDENT') {
      return NextResponse.rewrite(new URL('/portal?error=unauthorized', req.url));
    }
    // Teachers have limited access
    if (userRole === 'TEACHER' && (path.startsWith("/admin/news") || path.startsWith("/admin/majors") || path.startsWith("/admin/rbac"))) {
      return NextResponse.rewrite(new URL("/admin?error=unauthorized", req.url));
    }
  }
  
  // RBAC for /portal routes
  if (isProtectedPortalRoute && session && userRole !== 'STUDENT') {
      return NextResponse.rewrite(new URL('/admin?error=unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)'],
};
