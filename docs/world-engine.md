# World Engine

O World Engine estende o CMS com entidades de conhecimento, relações bidirecionais, prompts multi-ferramenta, ativos 3D e roadmap produtivo. O catálogo TypeScript e os arquivos JSON continuam como fallback enquanto PostgreSQL é configurado.

## Grafo

`WorldEntity` representa qualquer entidade editorial. `Relation` conecta origem e destino por tipo (`ally`, `enemy`, `realm`, `weapon`, `guardian`, `timeline`, `media`, `prompt` ou `related`). Relações podem ser bidirecionais e possuem metadata extensível.

## Migração PostgreSQL

1. Configure `DATABASE_URL` em `.env.local`.
2. Execute `npx prisma validate`.
3. Crie a primeira migração com `npx prisma migrate dev --name world_engine`.
4. Execute o importador JSON somente após backup e validação em staging.

O schema não substitui automaticamente `cms.json`: isso evita perda de dados e permite migração controlada.

## Bibliotecas

- Prompt Library: ferramentas, versões, tags e relacionamento com entidades.
- STL Library: formatos, escala, peso, tempo, resina, volume, status e versões.
- Media Asset: autoria, licença, categoria, tags e relacionamentos.
- Roadmap: planejado, modelagem, impressão, pintura, publicado e arquivado.
