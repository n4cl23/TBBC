import type { Locale } from '@/lib/i18n';

export const creatureCategories = [
  'beast',
  'dragon',
  'spirit',
  'construct',
  'colossus',
  'giant',
  'aberration',
  'elemental',
  'predator',
  'guardian',
] as const;
export type CreatureCategory = (typeof creatureCategories)[number];

export const creatureThreatLevels = [
  'low',
  'moderate',
  'high',
  'extreme',
  'catastrophic',
  'variable',
] as const;
export type CreatureThreatLevel = (typeof creatureThreatLevels)[number];

export const creatureAssetTypes = [
  'hero',
  'thumbnail',
  'gallery',
  'concept',
  'clay-render',
  'painted-render',
  'wireframe',
  'turntable',
  'STL',
  'supported-STL',
  'OBJ',
  'MTL',
  'GLB',
  'GLTF',
  'LYS',
  'texture',
  'assembly-guide',
  'painting-guide',
  'print-photo',
  'video',
] as const;
export type CreatureAssetType = (typeof creatureAssetTypes)[number];

export type CreatureStatus =
  | 'concept'
  | 'art-review'
  | 'modeling'
  | 'print-review'
  | 'ready'
  | 'published'
  | 'archived';

export interface CreatureTranslation {
  id: string;
  creatureId: string;
  locale: Locale;
  name: string;
  epithet: string;
  summary: string;
  lore: string;
  origin: string;
  behavior: string;
  habitat: string;
  diet: string;
  weaknesses: string[];
  abilities: string[];
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  captions: string[];
  status: 'draft' | 'published';
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatureAsset {
  id: string;
  creatureId: string;
  type: CreatureAssetType;
  filename: string;
  url?: string;
  localSourcePath?: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  version: number;
  isPrimary: boolean;
  isPublic: boolean;
  checksum: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatureHabitat {
  creatureId: string;
  locationId: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'unknown';
  population: string;
  season: string;
  notes: string;
  kind: 'primary' | 'sighting' | 'territory' | 'danger-zone';
}

export interface CreatureMarketplaceListing {
  platform: 'creality-cloud';
  url?: string;
  price?: number;
  currency?: string;
  availability: 'available' | 'production' | 'coming-soon' | 'exclusive' | 'retired';
  license?: string;
  releaseDate?: string;
  featured: boolean;
}

export interface Creature3DProfile {
  scale?: string;
  heightMm?: number;
  widthMm?: number;
  depthMm?: number;
  multipart: boolean;
  pieceCount?: number;
  baseIncluded: boolean;
  baseDiameter?: number;
  hollowRecommended?: boolean;
  drainHoles?: number;
  supportStatus: 'unknown' | 'unsupported' | 'supported' | 'validated';
  lycheeReady: boolean;
  printStatus: 'unverified' | 'testing' | 'validated' | 'failed';
  testedPrinter?: string;
  testedResin?: string;
  estimatedResinMl?: number;
  estimatedPrintTime?: number;
  notes: string;
}

export interface Creature {
  id: string;
  slug: string;
  name: string;
  epithet: string;
  realmId: string;
  category: CreatureCategory;
  threatLevel: CreatureThreatLevel;
  summary: string;
  lore: string;
  origin: string;
  behavior: string;
  habitat: string;
  diet: string;
  weaknesses: string[];
  abilities: string[];
  visualDirection: string;
  silhouette: string;
  materials: string[];
  palette: string[];
  forbiddenElements: string[];
  guardianId: string;
  crownId: string;
  relatedCharacters: string[];
  relatedEvents: string[];
  relatedLocations: string[];
  status: CreatureStatus;
  featured: boolean;
  image: string;
  imageSourceAvailable: boolean;
  glbSourceAvailable: boolean;
  stlSourceAvailable: boolean;
  publicGlbUrl?: string;
  prompt: string;
  technical: Creature3DProfile;
  habitats: CreatureHabitat[];
  marketplace: CreatureMarketplaceListing[];
  translations: Partial<Record<Exclude<Locale, 'pt-br'>, CreatureTranslation>>;
  createdAt: string;
  updatedAt: string;
}

export type LocalizedCreature = Omit<Creature, 'translations'> & {
  locale: Locale;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  captions: string[];
};
