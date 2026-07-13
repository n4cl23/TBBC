import { headers } from 'next/headers';
import { news } from '@/data/content';
import {
  dictionary,
  isLocale,
  localeConfig,
  localizedPath,
  type Locale,
} from '@/lib/i18n';
import {SITE_URL} from '@/lib/site';
export async function GET() {
  const value = (await headers()).get('x-tbcc-locale') || 'pt-br',
    locale: Locale = isLocale(value) ? value : 'pt-br',
    base = SITE_URL,
    items = news
      .map(
        (item) =>
          `<item><title><![CDATA[${item.title}]]></title><link>${base}${localizedPath(locale, 'news')}#${item.slug}</link><guid>${base}${localizedPath(locale, 'news')}#${item.slug}</guid><description><![CDATA[${item.excerpt}]]></description><pubDate>${new Date(item.date).toUTCString()}</pubDate></item>`,
      )
      .join(''),
    copy = dictionary[locale],
    xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Black Banner Chronicles</title><link>${base}/${locale}</link><description>${copy.metaDescription}</description><language>${localeConfig[locale].html}</language>${items}</channel></rss>`;
  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
