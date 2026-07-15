import type { PublicationStatus, CmsEntityType } from './cms';
import type { Locale } from '@/lib/i18n';
export type TranslationStatus =
  'complete' | 'incomplete' | 'missing' | 'draft' | 'published';
export type TranslationRecord = {
  id: string;
  entity: CmsEntityType;
  recordId: string;
  locale: Locale;
  slug?: string;
  fields: Record<string, unknown>;
  status: PublicationStatus;
  completion: TranslationStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};
export type LocalizedField<T = string> = Partial<Record<Locale, T>>;
export const requiredTranslationFields: Partial<
  Record<CmsEntityType, string[]>
> = {
  creatures: [
    'name',
    'epithet',
    'summary',
    'lore',
    'origin',
    'behavior',
    'habitat',
    'diet',
    'seoTitle',
    'seoDescription',
    'imageAlt',
  ],
  characters: [
    'name',
    'summary',
    'story',
    'origin',
    'rise',
    'conflict',
    'currentState',
    'legacy',
    'quote',
  ],
  guardians: ['name', 'title', 'summary', 'story'],
  realms: ['name', 'summary', 'architecture'],
  crowns: ['name', 'history', 'concept'],
  collections: ['name', 'description'],
  timeline: ['title', 'summary'],
  events: ['title', 'summary'],
  factions: ['name'],
  guilds: ['name'],
  bossEncounters: ['name'],
  news: ['title', 'excerpt'],
  gallery: ['title', 'alt', 'caption'],
  marketplaces: ['name', 'description'],
};
export function translationCompletion(
  entity: CmsEntityType,
  fields: Record<string, unknown>,
): TranslationStatus {
  const required = requiredTranslationFields[entity] || ['name'];
  const filled = required.filter(
    (key) => typeof fields[key] === 'string' && String(fields[key]).trim(),
  ).length;
  return filled === required.length
    ? 'complete'
    : filled
      ? 'incomplete'
      : 'missing';
}
