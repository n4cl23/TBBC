import type { CmsEntityType, PublicationStatus } from '@/types/cms';
import { defaultLocale, type Locale } from './i18n';

export type StoredTranslation = {
  fields?: Record<string, unknown>;
  status?: PublicationStatus;
  version?: number;
  updatedAt?: string;
};
export type LocalizedResult<T> = {
  data: T;
  requestedLocale: Locale;
  resolvedLocale: Locale;
  usedFallback: boolean;
  translationStatus: 'base' | 'missing' | 'draft' | 'incomplete' | 'published';
  cacheKey: string;
  cacheTag: string;
};

export const translatableFields: Partial<
  Record<CmsEntityType, readonly string[]>
> = {
  collections: [
    'name',
    'title',
    'subtitle',
    'quote',
    'summary',
    'description',
    'story',
    'editorialHook',
    'cta',
    'seoTitle',
    'seoDescription',
    'imageAlt',
    'status',
  ],
  characters: [
    'name',
    'title',
    'subtitle',
    'quote',
    'summary',
    'story',
    'origin',
    'rise',
    'conflict',
    'currentState',
    'legacy',
    'symbol',
    'personality',
    'rumors',
    'timeline',
    'curiosities',
    'cta',
    'prompt',
    'technicalSheet',
    'printInfo',
    'relatedMiniature',
    'seoTitle',
    'seoDescription',
    'imageAlt',
    'caption',
  ],
  guardians: [
    'name',
    'title',
    'subtitle',
    'quote',
    'summary',
    'story',
    'origin',
    'rise',
    'conflict',
    'currentState',
    'legacy',
    'virtue',
    'element',
    'symbol',
    'prompt',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  realms: [
    'name',
    'title',
    'subtitle',
    'quote',
    'summary',
    'story',
    'architecture',
    'origin',
    'foundation',
    'influence',
    'atmosphere',
    'symbol',
    'color',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  crowns: [
    'name',
    'title',
    'subtitle',
    'quote',
    'visual',
    'history',
    'concept',
    'material',
    'element',
    'prompt',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  weapons: [
    'name',
    'type',
    'legend',
    'description',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  timeline: ['era', 'title', 'summary', 'year'],
  artBible: [
    'name',
    'title',
    'subtitle',
    'summary',
    'description',
    'chapters',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  news: [
    'title',
    'excerpt',
    'body',
    'date',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  gallery: ['title', 'alt', 'caption'],
  marketplaces: ['name', 'description', 'seoTitle', 'seoDescription'],
  printGuide: [
    'name',
    'title',
    'subtitle',
    'summary',
    'description',
    'instructions',
    'seoTitle',
    'seoDescription',
  ],
  marketplaceListings: ['title', 'license', 'notes'],
};

function translationsOf(entity: Record<string, unknown>) {
  return (entity.translations || {}) as Partial<
    Record<Locale, StoredTranslation>
  >;
}
function hasValue(value: unknown) {
  return typeof value === 'string'
    ? value.trim().length > 0
    : Array.isArray(value)
      ? value.length > 0
      : value !== undefined && value !== null;
}

export function translationCoverage(
  entityType: CmsEntityType,
  entity: Record<string, unknown>,
  locale: Locale,
) {
  const translation = translationsOf(entity)[locale],
    fields = translation?.fields || {};
  const expected = (translatableFields[entityType] || ['name']).filter((key) =>
    hasValue(entity[key]),
  );
  const missingFields = expected.filter((key) => !hasValue(fields[key]));
  return {
    status: translation?.status || 'draft',
    version: translation?.version || 0,
    missingFields,
    complete: Boolean(translation) && missingFields.length === 0,
  };
}

export function localizedCacheKey(
  entityType: CmsEntityType,
  locale: Locale,
  slug: string,
) {
  return `${entityType}:${locale}:${slug}`;
}

export function resolveLocalizedEntity<T extends object>(
  entityType: CmsEntityType,
  entity: T,
  requestedLocale: Locale,
): LocalizedResult<T> {
  const source = entity as Record<string, unknown>;
  const slug = String(source.slug || source.id || 'unknown');
  const common = {
    requestedLocale,
    cacheKey: localizedCacheKey(entityType, requestedLocale, slug),
    cacheTag: `content:${entityType}:${requestedLocale}:${slug}`,
  };
  if (requestedLocale === defaultLocale) {
    const { translations: _translations, ...base } = source;
    void _translations;
    return {
      data: base as T,
      resolvedLocale: defaultLocale,
      usedFallback: false,
      translationStatus: 'base',
      ...common,
    };
  }
  const translation = translationsOf(source)[requestedLocale],
    coverage = translationCoverage(entityType, source, requestedLocale);
  if (translation?.status === 'published' && coverage.complete) {
    const localized = { ...source };
    delete localized.translations;
    for (const key of translatableFields[entityType] || [])
      delete localized[key];
    Object.assign(localized, translation.fields);
    return {
      data: localized as T,
      resolvedLocale: requestedLocale,
      usedFallback: false,
      translationStatus: 'published',
      ...common,
    };
  }
  const { translations: _translations, ...base } = source;
  void _translations;
  return {
    data: base as T,
    resolvedLocale: defaultLocale,
    usedFallback: true,
    translationStatus: !translation
      ? 'missing'
      : translation.status !== 'published'
        ? 'draft'
        : 'incomplete',
    ...common,
  };
}

export function localeDiagnostics(result: LocalizedResult<object>) {
  return process.env.NODE_ENV === 'production'
    ? {}
    : {
        'data-requested-locale': result.requestedLocale,
        'data-resolved-locale': result.resolvedLocale,
        'data-used-fallback': String(result.usedFallback),
      };
}
