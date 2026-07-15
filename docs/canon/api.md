# Canon API 1.1

`GET /api/canon` retorna metadados, taxonomia, entidades e Knowledge Graph. `?kind=realm&alias=abyss` resolve uma identidade canônica.

Projeções derivadas: `/api/kingdoms`, `/api/creatures`, `/api/bosses`, `/api/events`, `/api/guilds` e `/api/artifacts`. Todas informam `/api/canon` em `source` e nunca mantêm datasets próprios.

As APIs da camada semântica estão documentadas em `docs/knowledge-graph/api-reference.md`.
