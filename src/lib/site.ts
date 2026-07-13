export const SITE_NAME = 'The Black Banner Chronicles';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://theblackbanner.vercel.app').replace(/\/$/, '');
export const LEGACY_SITE_URL = 'https://tbbc-three.vercel.app';
export function absoluteUrl(path = '/') { return new URL(path, `${SITE_URL}/`).toString(); }
