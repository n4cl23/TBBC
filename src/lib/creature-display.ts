import type { Locale } from '@/lib/i18n';
import type { CreatureCategory, CreatureProductionStatus, CreatureThreatLevel } from '@/types/creature';

const categories: Record<Locale, Record<CreatureCategory, string>> = {
  'pt-br': { beast: 'Besta', dragon: 'Dragão', spirit: 'Espírito', construct: 'Constructo', colossus: 'Colosso', giant: 'Gigante', aberration: 'Aberração', elemental: 'Elemental', predator: 'Predador', guardian: 'Guardião' },
  en: { beast: 'Beast', dragon: 'Dragon', spirit: 'Spirit', construct: 'Construct', colossus: 'Colossus', giant: 'Giant', aberration: 'Aberration', elemental: 'Elemental', predator: 'Predator', guardian: 'Guardian' },
  es: { beast: 'Bestia', dragon: 'Dragón', spirit: 'Espíritu', construct: 'Constructo', colossus: 'Coloso', giant: 'Gigante', aberration: 'Aberración', elemental: 'Elemental', predator: 'Depredador', guardian: 'Guardián' },
};
const threats: Record<Locale, Record<CreatureThreatLevel, string>> = {
  'pt-br': { low: 'Baixa', moderate: 'Moderada', high: 'Alta', extreme: 'Extrema', catastrophic: 'Catastrófica', variable: 'Variável' },
  en: { low: 'Low', moderate: 'Moderate', high: 'High', extreme: 'Extreme', catastrophic: 'Catastrophic', variable: 'Variable' },
  es: { low: 'Baja', moderate: 'Moderada', high: 'Alta', extreme: 'Extrema', catastrophic: 'Catastrófica', variable: 'Variable' },
};
const production: Record<Locale, Record<CreatureProductionStatus, string>> = {
  'pt-br': { concept: 'Conceito', modeling: 'Modelo em preparação', review: 'Em revisão', 'print-test': 'Teste de impressão', ready: 'Modelo disponível', released: 'Lançado' },
  en: { concept: 'Concept', modeling: 'Model in preparation', review: 'Under review', 'print-test': 'Print testing', ready: 'Model available', released: 'Released' },
  es: { concept: 'Concepto', modeling: 'Modelo en preparación', review: 'En revisión', 'print-test': 'Prueba de impresión', ready: 'Modelo disponible', released: 'Publicado' },
};

export const creatureCategoryLabel = (locale: Locale, value: CreatureCategory) => categories[locale][value];
export const creatureThreatLabel = (locale: Locale, value: CreatureThreatLevel) => threats[locale][value];
export const creatureProductionLabel = (locale: Locale, value: CreatureProductionStatus) => production[locale][value];
