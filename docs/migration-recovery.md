# Migration recovery

1. Interrompa o gate antes de importação ou testes de mutação.
2. Audite `_prisma_migrations`, catálogos, objetos e contagens somente em Preview.
3. Classifique um único cenário A–E e versione os relatórios em `reports/`.
4. Não use `migrate resolve` até o estado físico estar comprovado.
5. Para estado parcial vazio, escreva rollback SQL explícito, transacional e com pré-condições de drift e zero dados.
6. Preserve o arquivo e checksum da migration falha. Corrija divergências em migration versionada anterior quando ela precisar executar antes da migration bloqueada.
7. Após o rollback físico, marque somente a execução auditada como `rolled-back`, execute `migrate deploy`, valide status, idempotência e diff.
8. Retome Canon e testes apenas depois do banco saudável.

O incidente de `20260717000000_postgres_cms_foundation` foi classificado como Cenário E: a FK UUID era incompatível com `WorldEntity.canonicalId` texto. O subestado físico era parcial sem dados. A prevenção permanente é declarar `canonicalId @db.Uuid`, validar migrations em uma branch Neon Preview limpa e exigir diff antes do Canon Import.

Production nunca participa de uma recuperação Preview e continua dependente de aprovação manual separada.
