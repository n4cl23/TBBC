import { describe, expect, it } from 'vitest';
import { bestiaryMeta, bestiaryUi, localizedBeasts } from './bestiary-i18n';

describe('localização do bestiário', () => {
  it.each([
    ['pt-br', 'Feras', 'O Caminhante das Brasas'],
    ['en', 'Beasts', 'The Ember-Treader'],
    ['es', 'Bestias', 'El Caminante de las Brasas'],
  ] as const)('publica conteúdo completo em %s', (locale, hero, epithet) => {
    const records = localizedBeasts(locale);
    expect(bestiaryUi[locale].heroNoun).toBe(hero);
    expect(records).toHaveLength(5);
    expect(records[0].epithet).toBe(epithet);
    expect(records.every((record) => record.chronicle && record.behavior)).toBe(
      true,
    );
    expect(bestiaryMeta[locale].description).toBeTruthy();
  });
});
