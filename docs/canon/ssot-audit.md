# Auditoria SSOT — Canon 1.1

## Decisão

`src/data/canon-registry.ts` é a fonte de verdade executável. Os módulos editoriais anteriores permanecem como adaptadores de entrada compatíveis; páginas, CMS, APIs e o Knowledge Graph devem consumir as projeções do registro.

## Inconsistências consolidadas

- A timeline oficial é formada pelos sete eventos de Canon. As timelines locais dos reinos são contexto editorial e não criam eventos.
- “A Guerra do Céu” é normalizada para “A Guerra dos Céus”.
- Reinos, Guardiões e Coroas possuem uma única identidade, mesmo quando aparecem em coleções ou no CMS.
- `Abyss` e traduções equivalentes resolvem para `kingdom-of-the-abyss`; `Mammoth` resolve para `frost-mammoth`.
- Guildas são projeções de facções com papel `guild`, não entidades duplicadas.
- Guardião, boss, secondary boss e NPC são papéis. Coroas são artefatos; POIs são locations; timeline é projeção de eventos.

## Integridade

Toda entidade possui `id`, `slug`, UUID estável em `canonicalId`, `aliases`, `version`, `createdAt` e `updatedAt`. Relações do Knowledge Graph armazenam somente `fromId` e `toId`. Testes rejeitam UUIDs duplicados e referências órfãs.

## Limites desta sprint

Nenhuma entidade, evento ou lore foi criado. Rotas permanecem categoria suportada conceitualmente, sem instâncias, pois não há rotas aprovadas no Canon 1.0.
