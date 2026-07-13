import { describe, expect, it } from 'vitest';
import { characters } from '@/data/content';
import {
  characterModels,
  characterPortraits,
  characterVideos,
} from '@/data/character-codex';
import { getCharacterNarrative } from './character-narrative';

describe('character codex', () => {
  const fenrir = characters.find((character) => character.slug === 'fenrir')!;

  it.each([
    ['pt-br', 'Uma crônica', 'Honra'],
    ['en', 'A chronicle', 'Honor'],
    ['es', 'Una crónica', 'Honor'],
  ] as const)('localiza a narrativa em %s', (locale, subtitle, trait) => {
    const narrative = getCharacterNarrative(fenrir, 0, locale);
    expect(narrative.subtitle).toContain(subtitle);
    expect(narrative.traits[0].label).toBe(trait);
    expect(narrative.origin).toContain(fenrir.name);
  });

  it.each(['aegis', 'aster', 'fenrir', 'skywind'])(
    'registra mídia completa para %s',
    (slug) => {
      expect(characterPortraits[slug]).toMatch(/portrait\.png$/);
      expect(characterVideos[slug]?.[0].src).toMatch(/cinematic\.mp4$/);
      expect(characterModels[slug]?.points).toBeGreaterThan(170_000);
    },
  );
});
