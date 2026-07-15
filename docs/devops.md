# DevOps

Development, Preview e Production são escopos distintos. Preview deve usar um branch Neon permanente e Production deve usar Main; a igualdade de fingerprints de `DATABASE_URL` bloqueia automaticamente a liberação operacional. A Vercel injeta `DATABASE_URL`, `DATABASE_URL_UNPOOLED` e `POSTGRES_URL` por ambiente.

Os gates são lint, typecheck, testes unitários, Prisma Validate, build e Playwright. O endpoint `/api/health` verifica API, banco, CMS, grafo e invariantes 142/305 sem expor credenciais.

