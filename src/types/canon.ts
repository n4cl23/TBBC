export const canonEntityKinds = [
  'realm',
  'location',
  'faction',
  'character',
  'creature',
  'artifact',
  'event',
  'collection',
] as const;
export type CanonEntityKind = (typeof canonEntityKinds)[number];

export const canonRoles = [
  'guardian',
  'boss',
  'secondary-boss',
  'npc',
  'merchant',
  'explorer',
  'chronicler',
  'artisan',
  'hunter',
  'guild',
  'sovereign',
  'primordial',
] as const;
export type CanonRole = (typeof canonRoles)[number];

export const canonRelationKinds = [
  'located-in',
  'member-of',
  'protects',
  'bound-to',
  'wields',
  'rules',
  'allied-with',
  'opposed-to',
  'participated-in',
  'caused',
  'consequence-of',
  'precedes',
  'habitat-in',
  'preys-on',
  'related-to',
  'featured-in',
] as const;
export type CanonRelationKind = (typeof canonRelationKinds)[number];

export const canonRealmIds = [
  'ironhold',
  'frost-kingdom',
  'elder-forest',
  'stormreach',
  'kingdom-of-the-abyss',
  'scorched-wastes',
] as const;
export type CanonRealmId = (typeof canonRealmIds)[number];

export type CanonStatus = 'draft' | 'review' | 'canonical' | 'retconned' | 'archived';
export type CanonConfidence = 'confirmed' | 'disputed' | 'legendary';

export interface CanonReference {
  kind: CanonEntityKind;
  slug: string;
}

export interface CanonRelation {
  id: string;
  from: CanonReference;
  to: CanonReference;
  kind: CanonRelationKind;
  bidirectional: boolean;
  status: CanonStatus;
  note?: string;
}

export interface CanonEvent {
  id: string;
  slug: string;
  era: string;
  year: number | null;
  displayYear: string;
  title: string;
  summary: string;
  causes: string[];
  consequences: string[];
  participants: CanonReference[];
  realms: CanonRealmId[];
  confidence: CanonConfidence;
  status: CanonStatus;
}

export interface CanonAlias {
  alias: string;
  canonicalSlug: string;
  kind: CanonEntityKind;
  locale?: 'pt-br' | 'en' | 'es';
  reason: 'legacy' | 'translation' | 'source-folder' | 'retcon';
}
