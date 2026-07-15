# Changelog

## 1.2.0-semantic — 2026-07-15

- Adiciona Knowledge Graph semântico, herança contextual e relações ponderadas por UUID.
- Implementa busca, contexto para IA, consultas inteligentes, cache e travessia limitada.
- Publica oito famílias de APIs semânticas e integra relações ao CMS.
- Substitui heurísticas de relacionados em personagens e criaturas por resolução automática do grafo.

## 1.1.0-canon — 2026-07-15

- Torna o registro canônico a fonte única de identidade para CMS, APIs e Knowledge Graph.
- Adiciona UUIDs estáveis, metadados de versão e relações exclusivamente por IDs.
- Elimina duplicação ontológica de guildas e padroniza papéis de Guardião e boss.
- Publica seis APIs derivadas do Canon e valida duplicatas, aliases e relações órfãs.
- Documenta a auditoria SSOT, arquitetura e contratos públicos.

## 1.0.0-canon — 2026-07-14

### Canon

- Estabelece a tese oficial do universo e a governança editorial em `docs/canon`.
- Define oito tipos ontológicos e separa papéis como Guardião, boss, NPC e guilda.
- Consolida os seis reinos, seis Coroas e seis Guardiões oficiais.
- Normaliza `Abyss` para `kingdom-of-the-abyss` e `Mammoth` para `frost-mammoth` por aliases permanentes.
- Classifica Aegis, Aster, Fenrir e Skywind como entidades primordiais, fora das 34 espécies do Atlas.
- Formaliza guildas como subtipos de facção e coleções como agrupamentos editoriais/comerciais.

### Timeline

- Substitui a timeline resumida por sete eventos causais.
- Padroniza “Guerra dos Céus”.
- Esclarece que Ironhold resistiu em 418 e caiu definitivamente em 742.
- Define o Ano 603 como formalização do Pacto dos Guardiões, preservando vínculos anteriores.
- Acrescenta a queda do Último Dragão no Ano 590.
- Atualiza as traduções editoriais em inglês e espanhol.

### Plataforma

- Adiciona contratos TypeScript para entidades, papéis, relações, aliases e eventos canônicos.
- Expõe a API pública `/api/canon` e resolução de aliases por query string.
- Adiciona validação canônica às mutações do CMS.
- Acrescenta eventos, guildas, encontros de boss e aliases ao World Database.
- Atualiza o schema Prisma com `CanonStatus`, `CanonEntityKind`, `CanonAlias` e `EntityRole`.
- Inclui migração PostgreSQL versionada.
- Adiciona testes unitários, de API e Playwright para o canon consolidado.

### Compatibilidade

- Preserva URLs e seeds legados por aliases.
- Mantém `timeline` como projeção compatível; `events` passa a ser a fonte de verdade canônica.
- A migração de banco requer `DATABASE_URL` configurada no ambiente de implantação.
