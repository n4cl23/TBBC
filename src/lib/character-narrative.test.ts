import { describe, expect, it } from 'vitest';
import { characters } from '@/data/content';
import {
  characterModels,
  characterPortraits,
  characterVideos,
} from '@/data/character-codex';
import { getCharacterNarrative } from './character-narrative';
import { createCharacterEditorial } from '@/data/character-editorial';

describe('character codex', () => {
  const fenrir = characters.find((character) => character.slug === 'fenrir')!;

  it.each([
    ['pt-br', 'Uma crônica', 'Honra'],
    ['en', 'A chronicle', 'Honor'],
    ['es', 'Una crónica', 'Honor'],
  ] as const)('localiza a narrativa em %s', (locale, subtitle, trait) => {
    const localized = {
      ...fenrir,
      ...createCharacterEditorial(
        fenrir.slug,
        fenrir.name,
        fenrir.summary,
        fenrir.story,
        locale,
      ),
    };
    const narrative = getCharacterNarrative(localized, 0, locale);
    expect(narrative.subtitle).toContain(subtitle);
    expect(narrative.traits[0].label).toBe(trait);
    expect(narrative.origin).toContain(fenrir.name);
  });

  it('mantém um dossiê editorial completo e exclusivo para cada personagem', () => {
    const required = [
      'origin',
      'rise',
      'conflict',
      'currentState',
      'legacy',
      'quote',
    ] as const;
    for (const field of required) {
      const values = characters.map((character) => character[field]);
      expect(values.every(Boolean)).toBe(true);
      expect(new Set(values).size).toBe(characters.length);
    }
    expect(
      characters.every((character) => character.timeline?.length === 4),
    ).toBe(true);
    expect(
      characters.every((character) => character.personality?.goals.length),
    ).toBe(true);
  });

  it('não inventa prosa genérica para um registro editorial incompleto', () => {
    const incomplete = {
      ...fenrir,
      origin: undefined,
      conflict: undefined,
      rumors: undefined,
    };
    const narrative = getCharacterNarrative(incomplete);
    expect(narrative.origin).toBe('');
    expect(narrative.fall).toBe('');
    expect(narrative.rumors).toEqual([]);
  });

  it('falha explicitamente quando um personagem não possui perfil editorial', () => {
    expect(() =>
      createCharacterEditorial('missing', 'Missing', 'Summary', 'Story'),
    ).toThrow(/Missing editorial profile/);
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
