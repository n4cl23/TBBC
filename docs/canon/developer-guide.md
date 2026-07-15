# Developer Guide — Canon

Importe conteúdo público de `@/data/canon-registry`. Para localizar uma entidade, use `getCanonEntity(kind, slugOuAlias)`; para listagens, use `listCanonEntities(kind, role)`. Não grave nomes ou slugs em relações: persista sempre `canonicalId` em `fromId` e `toId`.

Novas entidades exigem aprovação editorial, slug único, tipo ontológico existente e alias para qualquer URL legada. Execute lint, typecheck, testes, build e Playwright antes de publicar.
