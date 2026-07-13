import { NextRequest, NextResponse } from 'next/server';
import {
  defaultLocale,
  detectLocale,
  isLocale,
  routeKeyFromSegment,
  routeNames,
  type Locale,
} from '@/lib/i18n';
function adminAuth(request: NextRequest) {
  const user = process.env.ADMIN_USER,
    password = process.env.ADMIN_PASSWORD;
  if (!user || !password) {
    if (process.env.NODE_ENV === 'development') return NextResponse.next();
    return new NextResponse('Admin não configurado.', { status: 503 });
  }
  const authorization = request.headers.get('authorization');
  if (authorization?.startsWith('Basic ')) {
    try {
      const [givenUser, givenPassword] = atob(authorization.slice(6)).split(
        ':',
      );
      if (givenUser === user && givenPassword === password)
        return NextResponse.next();
    } catch {}
  }
  return new NextResponse('Autenticação necessária.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Black Banner Admin"' },
  });
}
function internalSegment(segment: string) {
  const key = routeKeyFromSegment(segment);
  return key ? routeNames[key][defaultLocale] : segment;
}
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin'))
    return adminAuth(request);
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname === '/sitemap.xml' || pathname === '/robots.txt')
    return NextResponse.next();
  const parts = pathname.split('/').filter(Boolean);
  if (!parts.length) {
    const saved = request.cookies.get('tbcc-locale')?.value,
      locale =
        saved && isLocale(saved)
          ? saved
          : detectLocale(request.headers.get('accept-language'));
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  if (isLocale(parts[0])) {
    const locale = parts.shift() as Locale;
    let duplicatedLocale = false;
    while (parts[0] && isLocale(parts[0])) {
      parts.shift();
      duplicatedLocale = true;
    }
    if (duplicatedLocale) {
      const canonicalUrl = request.nextUrl.clone();
      canonicalUrl.pathname = `/${[locale, ...parts].join('/')}`;
      return NextResponse.redirect(canonicalUrl, 308);
    }
    const
      segment = parts.shift() || '',
      internal = internalSegment(segment),
      target = `/${[internal, ...parts].filter(Boolean).join('/')}`;
    const headers = new Headers(request.headers);
    headers.set('x-tbcc-locale', locale);
    const response = NextResponse.rewrite(new URL(target || '/', request.url), {
      request: { headers },
    });
    response.cookies.set('tbcc-locale', locale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 31536000,
    });
    return response;
  }
  const saved = request.cookies.get('tbcc-locale')?.value,
    locale = saved && isLocale(saved) ? saved : defaultLocale,
    oldParts = pathname.split('/').filter(Boolean),
    key = routeKeyFromSegment(oldParts[0] || ''),
    external = key ? routeNames[key][locale] : oldParts[0] || '',
    target = `/${locale}/${[external, ...oldParts.slice(1)].filter(Boolean).join('/')}`;
  return NextResponse.redirect(new URL(target.replace(/\/$/, ''), request.url));
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico)$).*)',
  ],
};
