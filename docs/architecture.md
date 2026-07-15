# Arquitetura

The Black Banner Chronicles usa Next.js 16 com App Router, React, TypeScript e Tailwind CSS. As rotas públicas vivem em `src/app`; componentes compartilhados em `src/components`; o catálogo editorial inicial em `src/data/content.ts`.

A administração usa Route Handlers em `src/app/api/admin`, componentes cliente somente para interação de upload e uma camada de domínio separada em `src/lib`. PostgreSQL Neon é a fonte única de persistência mutável em produção. O contrato `ImageStorageProvider` isola o frontend e o repositório do provedor físico.

O `CmsRepository` mantém os dados TypeScript apenas como seeds de desenvolvimento. Em produção, entidades, relações, mídia, versões, changesets e auditoria são consultados exclusivamente via Prisma. Os contratos em `src/repositories/contracts.ts` preservam as fronteiras para testes e futuras implementações.

# Marketplace Hub

O domínio comercial é desacoplado do catálogo narrativo por vínculos polimórficos (`entityType` + `entityId`). A camada pública consome somente registros publicados do repositório CMS. Marketplaces externos são destinos; integrações futuras deverão implementar adaptadores de sincronização sem acoplar APIs aos componentes ou ao domínio editorial.

# Arquitetura de dados

A camada HTTP valida a entrada e fornece o contexto da requisição. Serviços editoriais aplicam locking e regras do Canon. Repositórios isolam Prisma e executam transações. Neon fornece os ambientes e a Vercel executa a aplicação.
