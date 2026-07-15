# Migrações

Use exclusivamente migrações versionadas:

1. Execute `npx prisma migrate deploy` primeiro em Preview.
2. Execute `npm run db:canon:dry-run` e revise as contagens.
3. Aplique com `npm run db:canon:import` e confirme com `npm run db:canon:verify`.
4. Repita em Production somente após os testes do Preview.

`prisma db push`, `prisma migrate dev` e `prisma migrate reset` são proibidos. Migrações devem preservar integralmente o Canon.

O runner remoto recebe os secrets do environment GitHub `preview`. O pre-flight rejeita valores vazios ou placeholders, branch `main`, environment Production e qualquer metadado diferente de `NEON_BRANCH_NAME=preview`. Falhas interrompem antes de `migrate deploy`.

## Recuperação da migration CMS

`20260717000000_postgres_cms_foundation` falhou ao criar uma FK UUID contra `WorldEntity.canonicalId` persistido como texto. A auditoria encontrou 33/38 objetos parciais e zero linhas nas tabelas afetadas. A recuperação preserva a migration e seu checksum: um rollback transacional remove somente os objetos inventariados, o registro é marcado `rolled-back`, a migration anterior `20260716020000_align_world_entity_canonical_id_uuid` alinha o tipo e `migrate deploy` reaplica o histórico.

O workflow manual `Preview Migration Recovery` aborta diante de drift, dados, branch diferente de `preview` ou identificador de Production. É proibido resolver um registro sem relatório em `reports/` ou editar migrations já registradas.
