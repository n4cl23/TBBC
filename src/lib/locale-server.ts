import 'server-only';
import { headers } from 'next/headers';
import { defaultLocale, isLocale, type Locale } from './i18n';

export async function requestLocale(): Promise<Locale> {
  const value = (await headers()).get('x-tbcc-locale') || defaultLocale;
  return isLocale(value) ? value : defaultLocale;
}
