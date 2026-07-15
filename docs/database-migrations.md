# Migrações

Use exclusivamente migrações versionadas:

1. Execute `npx prisma migrate deploy` primeiro em Preview.
2. Execute `npm run db:canon:dry-run` e revise as contagens.
3. Aplique com `npm run db:canon:import` e confirme com `npm run db:canon:verify`.
4. Repita em Production somente após os testes do Preview.

`prisma db push` e `prisma migrate reset` são proibidos. Migrações devem ser aditivas, idempotentes no deploy e preservar integralmente o Canon.

