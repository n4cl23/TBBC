# Preview environment

GitHub Environment: `preview`.

Secrets exigidos: `PREVIEW_DATABASE_URL`, `PREVIEW_DATABASE_URL_UNPOOLED`, `PREVIEW_POSTGRES_URL`, `PREVIEW_ADMIN_USER` e `PREVIEW_ADMIN_PASSWORD`.

Variáveis não sensíveis: `NEON_BRANCH_NAME=preview`, `NEON_BRANCH_ID` com o identificador da branch Preview e `PREVIEW_BASE_URL` com o deployment publicado. Nenhum valor secreto pode aparecer em logs, artifacts, traces, screenshots ou documentação. Artifacts seguros têm retenção de três dias.

O Preview é criado pela Git Integration da Vercel a partir de `feature/*`. As cinco variáveis de runtime (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `POSTGRES_URL`, `ADMIN_USER`, `ADMIN_PASSWORD`) devem ser definidas também no ambiente **Preview** da Vercel, ter tamanho maior que zero e apontar exclusivamente para a branch Neon Preview. Elas não podem usar um valor compartilhado com Production.

Recuperações de banco são manuais, exclusivas da branch de trabalho e protegidas pelo mesmo environment. O script confirma novamente branch, registro Prisma, tipos, objetos e contagens antes de iniciar uma transação. Qualquer diferença em relação à auditoria interrompe sem executar DDL.
