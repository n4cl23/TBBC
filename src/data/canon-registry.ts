import {
  characters, collections, crowns, gallery, guardians, hero, news, realms,
  timeline, weapons,
  type Character, type Collection, type Crown, type GalleryItem, type Guardian,
  type NewsArticle, type Realm, type Status, type TimelineEvent, type Weapon,
} from '@/data/content';
import {creatures, creatureCmsSeeds, creatureCoverage, creatureRealmIds, creatureRealmProfiles} from '@/data/creatures';
import {realmExperiences, type RealmExperience} from '@/data/realm-experience';
import {marketplaces, marketplaceListings} from '@/data/marketplaces';
import {
  canonAliases, canonEvents, canonicalTaxonomy, officialBossEncounters,
  officialFactions, officialGuilds, officialRealms, officialRoles,
  resolveCanonAlias,
} from '@/data/canon';
import type {CanonEntity, CanonEntityKind, CanonGraph, CanonGraphRelation, CanonRole} from '@/types/canon';

export const CANON_REGISTRY_VERSION = '1.1.0';
export const CANON_REGISTRY_CREATED_AT = '2026-07-14T00:00:00.000Z';
export const CANON_REGISTRY_UPDATED_AT = '2026-07-15T00:00:00.000Z';

function hash(value: string, seed: number) {
  let result = seed;
  for (let i = 0; i < value.length; i += 1) result = Math.imul(result ^ value.charCodeAt(i), 16777619);
  return (result >>> 0).toString(16).padStart(8, '0');
}
export function canonicalUuid(kind: CanonEntityKind, slug: string) {
  const key = `asterheim:${kind}:${slug}`;
  const hex = hash(key, 2166136261) + hash(key, 2246822507) + hash(key, 3266489909) + hash(key, 668265263);
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-5${hex.slice(13,16)}-a${hex.slice(17,20)}-${hex.slice(20,32)}`;
}
const aliasesFor = (kind: CanonEntityKind, slug: string) => canonAliases.filter((alias) => alias.kind === kind && alias.canonicalSlug === slug).map((alias) => alias.alias);
function entity<T extends Record<string, unknown>>(kind: CanonEntityKind, slug: string, data: T, roles: CanonRole[] = []): CanonEntity<T> {
  return {id: slug, slug, canonicalId: canonicalUuid(kind, slug), aliases: aliasesFor(kind, slug), version: CANON_REGISTRY_VERSION, createdAt: CANON_REGISTRY_CREATED_AT, updatedAt: CANON_REGISTRY_UPDATED_AT, kind, roles, data};
}
const slugify = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const canonEntities: CanonEntity[] = [
  ...realms.map((item) => entity('realm', item.slug, item as unknown as Record<string, unknown>)),
  ...guardians.map((item) => entity('character', item.slug, item as unknown as Record<string, unknown>, officialRoles[item.slug] || ['guardian'])),
  ...characters.filter((item) => !guardians.some((guardian) => guardian.slug === item.slug)).map((item) => entity('character', item.slug, item as unknown as Record<string, unknown>, officialRoles[item.slug] || ['npc'])),
  ...creatures.map((item) => entity('creature', item.slug, item as unknown as Record<string, unknown>, item.category === 'guardian' ? ['guardian'] : [])),
  ...crowns.map((item) => entity('artifact', item.slug, {...item, artifactType: 'crown'} as unknown as Record<string, unknown>)),
  ...weapons.map((item) => entity('artifact', item.id, {...item, slug: item.id, artifactType: 'weapon'} as unknown as Record<string, unknown>)),
  ...collections.map((item) => entity('collection', item.slug, item as unknown as Record<string, unknown>)),
  ...officialFactions.map((item) => entity('faction', item.slug, item as unknown as Record<string, unknown>, item.subtype === 'guild' ? ['guild'] : [])),
  ...canonEvents.map((item) => entity('event', item.slug, item as unknown as Record<string, unknown>)),
  ...Object.entries(realmExperiences).flatMap(([realmSlug, experience]) => experience.locations.map((location) => entity('location', `${realmSlug}-${slugify(location.name)}`, {...location, realmId: canonicalUuid('realm', realmSlug)} as unknown as Record<string, unknown>))),
];
const byKey = new Map(canonEntities.map((item) => [`${item.kind}:${item.slug}`, item]));
export const getCanonEntity = (kind: CanonEntityKind, value: string) => byKey.get(`${kind}:${resolveCanonAlias(kind, value)}`);
const edge = (from: CanonEntity | undefined, to: CanonEntity | undefined, kind: CanonGraphRelation['kind'], bidirectional = false): CanonGraphRelation | undefined => from && to ? {id: canonicalUuid('event', `relation-${from.slug}-${kind}-${to.slug}`), fromId: from.canonicalId, toId: to.canonicalId, kind, bidirectional, status: 'canonical'} : undefined;
export const canonGraphEdges = [
  ...officialRealms.flatMap((realm) => [
    edge(getCanonEntity('character', realm.guardian), getCanonEntity('realm', realm.id), 'protects'),
    edge(getCanonEntity('character', realm.guardian), getCanonEntity('artifact', realm.crown), 'bound-to', true),
  ]),
  ...creatures.flatMap((creature) => [
    edge(getCanonEntity('creature', creature.slug), getCanonEntity('realm', creature.realmId), 'habitat-in'),
    edge(getCanonEntity('creature', creature.slug), getCanonEntity('character', creature.guardianId), 'related-to'),
    edge(getCanonEntity('creature', creature.slug), getCanonEntity('artifact', creature.crownId), 'related-to'),
  ]),
  ...Object.entries(realmExperiences).flatMap(([realmSlug, experience]) => experience.locations.map((location) => edge(getCanonEntity('location', `${realmSlug}-${slugify(location.name)}`), getCanonEntity('realm', realmSlug), 'located-in'))),
].filter((item): item is CanonGraphRelation => Boolean(item));
export const canonGraph: CanonGraph = {version: CANON_REGISTRY_VERSION, nodes: canonEntities, edges: canonGraphEdges};
export const canonRegistry = {version: CANON_REGISTRY_VERSION, createdAt: CANON_REGISTRY_CREATED_AT, updatedAt: CANON_REGISTRY_UPDATED_AT, taxonomy: canonicalTaxonomy, entities: canonEntities, graph: canonGraph, aliases: canonAliases};
export function listCanonEntities(kind?: CanonEntityKind, role?: CanonRole) { return canonEntities.filter((item) => (!kind || item.kind === kind) && (!role || item.roles.includes(role))); }

export {characters, collections, crowns, gallery, guardians, hero, news, realms, timeline, weapons, creatures, creatureCmsSeeds, creatureCoverage, creatureRealmIds, creatureRealmProfiles, realmExperiences, marketplaces, marketplaceListings, canonAliases, canonEvents, canonicalTaxonomy, officialBossEncounters, officialFactions, officialGuilds, officialRealms, officialRoles, resolveCanonAlias};
export type {Character, Collection, Crown, GalleryItem, Guardian, NewsArticle, Realm, RealmExperience, Status, TimelineEvent, Weapon};
