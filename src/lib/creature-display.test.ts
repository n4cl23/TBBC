import { describe, expect, it } from 'vitest';
import { creatureCategoryLabel, creatureProductionLabel, creatureThreatLabel } from './creature-display';

describe('localized creature display values', () => {
  it('never exposes raw technical values in pt-BR', () => {
    expect(creatureCategoryLabel('pt-br', 'predator')).toBe('Predador');
    expect(creatureThreatLabel('pt-br', 'high')).toBe('Alta');
    expect(creatureProductionLabel('pt-br', 'ready')).toBe('Modelo disponível');
  });
  it('supports English and Spanish', () => {
    expect(creatureThreatLabel('en', 'catastrophic')).toBe('Catastrophic');
    expect(creatureProductionLabel('es', 'modeling')).toBe('Modelo en preparación');
  });
});
