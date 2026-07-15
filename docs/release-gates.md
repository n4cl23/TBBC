# Release gates

`Preview Database Gate` é obrigatório antes de qualquer promoção. Ele valida pre-flight antiprodução, migrations versionadas, Canon 1.1.0 (142/305, zero órfãs e loops), qualidade, build, APIs, CMS e Playwright.

Production permanece em workflow separado, com environment `production`, aprovação manual e nova verificação não destrutiva. O rollback da aplicação reutiliza o deployment anterior; o rollback do banco cria uma branch Neon a partir do ponto seguro antes de qualquer troca aprovada.

Uma migration Preview falha bloqueia imediatamente Canon Import, CMS, Playwright e promoção. O gate só pode ser retomado após auditoria somente leitura, plano versionado, recuperação transacional, `migrate status` alinhado, deploy idempotente e diff Prisma vazio.
