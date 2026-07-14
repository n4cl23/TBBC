import { describe, expect, it } from 'vitest';
import { creatureCoverage, creatureRealmIds, creatures, localizeCreature } from './creatures';
import { creatureCategories, creatureThreatLevels } from '@/types/creature';

describe('official creature taxonomy', () => {
  it('registers exactly 34 unique creatures across six realms', () => {
    expect(creatures).toHaveLength(34);
    expect(new Set(creatures.map((item) => item.slug)).size).toBe(34);
    expect(new Set(creatures.map((item) => item.realmId))).toEqual(new Set(creatureRealmIds));
  });

  it('uses only controlled category and threat vocabularies', () => {
    for (const creature of creatures) {
      expect(creatureCategories).toContain(creature.category);
      expect(creatureThreatLevels).toContain(creature.threatLevel);
      expect(creature.stlSourceAvailable).toBe(true);
      expect(creature.glbSourceAvailable).toBe(true);
      expect(creature.heroImage).toBe(`/images/creatures/${creature.slug}/hero.webp`);
      expect(creature.cardImage).toBe(`/images/creatures/${creature.slug}/card.webp`);
      expect(creature.thumbnail).toBe(`/images/creatures/${creature.slug}/thumbnail.webp`);
      expect(creature.gallery).toHaveLength(1);
    }
  });

  it('has complete, non-fallback editorial content in all locales', () => {
    for (const creature of creatures) {
      const localized = ['pt-br', 'en', 'es'].map((locale) => localizeCreature(creature, locale as 'pt-br' | 'en' | 'es'));
      for (const item of localized) {
        expect(item.name.length).toBeGreaterThan(2);
        expect(item.summary.length).toBeGreaterThan(40);
        expect(item.lore.length).toBeGreaterThan(80);
        expect(item.abilities.length).toBeGreaterThanOrEqual(3);
        expect(item.weaknesses.length).toBeGreaterThanOrEqual(2);
        expect(item.seoTitle).toContain(item.name);
        expect(item.imageAlt.length).toBeGreaterThan(10);
        expect(item).not.toHaveProperty('prompt');
        expect(item).not.toHaveProperty('visualDirection');
      }
      expect(new Set(localized.map((item) => item.summary)).size).toBe(3);
    }
    expect(creatureCoverage.translated).toBe(34);
  });
});
