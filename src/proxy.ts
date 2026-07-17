import { NextRequest, NextResponse } from 'next/server';
import {
  defaultLocale,
  detectLocale,
  isLocale,
  routeKeyFromSegment,
  routeNames,
  type Locale,
} from '@/lib/i18n';
import { isEditorialRole, type EditorialRole } from '@/lib/editorial-auth';

type EditorialAccount = { username: string; password: string; role: EditorialRole };

function editorialAccounts(): EditorialAccount[] {
  const fallback = process.env.ADMIN_USER && process.env.ADMIN_PASSWORD
    ? [{ username: process.env.ADMIN_USER, password: process.env.ADMIN_PASSWORD, role: 'owner' as const }]
    : [];
  const raw = process.env.EDITORIAL_ACCOUNTS;
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    const accounts = parsed.filter((item): item is EditorialAccount =>
      Boolean(item) && typeof item.username === 'string' && typeof item.password === 'string' && isEditorialRole(item.role),
    );
    return accounts.length ? accounts : fallback;
  } catch {
    return fallback;
  }
}
function adminAuth(request: NextRequest) {
  const accounts = editorialAccounts();
  if (!accounts.length) {
    if (process.env.NODE_ENV === 'development') return NextResponse.next();
    return new NextResponse('Admin não configurado.', { status: 503 });
  }
  const authorization = request.headers.get('authorization');
  if (authorization?.startsWith('Basic ')) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(':');
      const givenUser = decoded.slice(0, separator);
      const givenPassword = decoded.slice(separator + 1);
      const account = accounts.find((item) => item.username === givenUser && item.password === givenPassword);
      if (account) {
        const headers = new Headers(request.headers);
        headers.set('x-tbbc-editorial-actor', account.username);
        headers.set('x-tbbc-editorial-role', account.role);
        return NextResponse.next({ request: { headers } });
      }
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
  // A localized URL is rewritten to the App Router's canonical internal path.
  // Next dev may run the rewritten request through proxy() again; this marker
  // prevents that second pass from redirecting back to the localized URL.
  if (request.headers.get('x-tbcc-internal-rewrite') === '1')
    return NextResponse.next();
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  )
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
    const segment = parts.shift() || '',
      internal = internalSegment(segment),
      target = `/${[internal, ...parts].filter(Boolean).join('/')}`;
    const headers = new Headers(request.headers);
    headers.set('x-tbcc-locale', locale);
    headers.set('x-tbcc-internal-rewrite', '1');
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
