# Canon oficial de Asterheim

Versão: 1.1.0

Data de corte: 14 de julho de 2026

Status: canônico

Este diretório é a referência editorial oficial de **The Black Banner: Chronicles of Asterheim**. Em conflitos entre documentos antigos, nomes de pastas, seeds ou textos promocionais, prevalecem as decisões registradas aqui e no registro `src/data/canon-registry.ts`.

## Tese do universo

Asterheim é um continente cuja história é moldada por seis forças preservadas por Coroas conscientes. Cada Coroa liga-se a um Guardião e transforma uma virtude em sacrifício. A Black Banner Company investiga indícios de uma sétima força capaz de revelar que parte da história registrada foi deliberadamente apagada.

## Princípios obrigatórios

1. Poder sempre possui custo pessoal, social ou ecológico.
2. Memória, juramento e documentação são forças ativas do mundo.
3. Nenhum reino é moralmente uniforme.
4. Criaturas pertencem a ecossistemas, não apenas a paletas elementais.
5. “Boss”, “NPC” e “Guardião” são papéis; não espécies.
6. Um arquivo existente não significa produto ou conteúdo publicado.
7. Novos fatos entram como `draft` ou `review`; somente aprovação editorial concede estado `canonical`.

## Documentos

- [Taxonomia](./taxonomy.md)
- [Nomenclatura](./naming.md)
- [Reinos e Guardiões](./realms-and-guardians.md)
- [Timeline](./timeline.md)
- [Criaturas e Bosses](./creatures-and-bosses.md)
- [Facções, guildas e coleções](./factions-and-collections.md)
- [Governança](./governance.md)
- [Auditoria SSOT](./ssot-audit.md)
- [Arquitetura](./architecture.md)
- [API](./api.md)
- [Developer Guide](./developer-guide.md)

## Fonte executável

O contrato legível por código vive em `src/types/canon.ts`; identidades, metadados e relações por UUID vivem em `src/data/canon-registry.ts`. A API pública `/api/canon` expõe o registro e o Knowledge Graph sem depender do editor administrativo.
