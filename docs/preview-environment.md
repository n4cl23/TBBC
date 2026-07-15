# Preview environment

GitHub Environment: `preview`.

Secrets exigidos: `PREVIEW_DATABASE_URL`, `PREVIEW_DATABASE_URL_UNPOOLED`, `PREVIEW_POSTGRES_URL`, `PREVIEW_ADMIN_USER` e `PREVIEW_ADMIN_PASSWORD`.

Variables não sensíveis: `NEON_BRANCH_NAME=preview`, `NEON_BRANCH_ID` com o identificador da branch Preview e `PREVIEW_BASE_URL` com o deployment publicado. Nenhum valor secreto pode aparecer em logs, artifacts, traces, screenshots ou documentação. Artifacts seguros têm retenção de três dias.
