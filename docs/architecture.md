# Arquitetura

The Black Banner Chronicles usa Next.js 16 com App Router, React, TypeScript e Tailwind CSS. As rotas públicas vivem em `src/app`; componentes compartilhados em `src/components`; o catálogo editorial inicial em `src/data/content.ts`.

A administração usa Route Handlers em `src/app/api/admin`, componentes cliente somente para interação de upload e uma camada de domínio separada em `src/lib`. Metadados de mídia de desenvolvimento são persistidos em `src/data/media.json`. O contrato `ImageStorageProvider` isola o frontend e o repositório do provedor físico.

Não existe banco de dados nesta versão. O catálogo principal é TypeScript e os metadados mutáveis são JSON. Para múltiplas instâncias ou escrita concorrente, a migração recomendada é PostgreSQL, mantendo os tipos e a camada de repositório.

O Sprint 3 introduz `CmsRepository`: os dados TypeScript funcionam como seed e registros em `src/data/cms.json` substituem o seed por slug. Cada gravação cria versão imutável e evento de auditoria. O site público já consome essa camada para personagens; as demais entidades permanecem compatíveis enquanto a migração incremental avança.
