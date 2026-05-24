import { createMiddlewareClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  const publicPaths = ['/login', '/signup', '/auth/callback'];
  const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    const role = profile?.role || 'user';

    if (req.nextUrl.pathname.startsWith('/admin') && role !== 'founder') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};