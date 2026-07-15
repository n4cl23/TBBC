# Migrações

Use exclusivamente migrações versionadas:

1. Execute `npx prisma migrate deploy` primeiro em Preview.
2. Execute `npm run db:canon:dry-run` e revise as contagens.
3. Aplique com `npm run db:canon:import` e confirme com `npm run db:canon:verify`.
4. Repita em Production somente após os testes do Preview.

`prisma db push` e `prisma migrate reset` são proibidos. Migrações devem ser aditivas, idempotentes no deploy e preservar integralmente o Canon.

O runner remoto recebe `PREVIEW_DATABASE_URL`, `PREVIEW_DATABASE_URL_UNPOOLED` e `PREVIEW_POSTGRES_URL` como secrets do environment GitHub `preview`. O pre-flight rejeita valores vazios ou placeholders, `main`, environment Production e qualquer metadado diferente de `NEON_BRANCH_NAME=preview`. Falhas interrompem antes de `migrate deploy`.
