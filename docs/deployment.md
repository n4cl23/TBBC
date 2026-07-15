# Deployment

O release é promovido em duas fases. O workflow `Deploy Preview` aplica migrações somente no branch Neon de Preview, importa e verifica o Canon 1.1.0, cria um artefato Vercel e executa smoke tests. `Promote Production` exige aprovação do environment `production`, aplica migrações na Main, verifica o Canon e promove exatamente a URL de Preview informada.

Variáveis obrigatórias nos environments GitHub `preview` e `production`: `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`. Production também exige `ADMIN_USER` e `ADMIN_PASSWORD`. Nunca use `prisma db push`.

## Gate remoto de Preview

Conexões PostgreSQL não são executadas no ambiente local do Codex porque conexões TCP externas podem ser bloqueadas com `EACCES`. O workflow `Preview Database Gate` executa o pre-flight, Prisma, Canon, qualidade, build, Playwright e smoke tests em runner GitHub com acesso à rede. Ele usa exclusivamente o environment `preview` e nunca promove deployments.
