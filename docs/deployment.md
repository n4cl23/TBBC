# Deployment

O deploy é responsabilidade exclusiva da Git Integration da Vercel. Branches de feature geram Preview; somente `main` gera Production. O procedimento completo está em [release-flow.md](./release-flow.md).

Os workflows GitHub validam qualidade e banco, mas não fazem `vercel deploy`, `vercel promote`, nem baixam variáveis em arquivos `.env`. Nunca use `prisma db push`.

## Gate remoto de Preview

Conexões PostgreSQL não são executadas no ambiente local do Codex porque conexões TCP externas podem ser bloqueadas com `EACCES`. O workflow `Preview Database Gate` executa o pre-flight, Prisma, Canon, qualidade, build, Playwright e smoke tests em runner GitHub com acesso à rede. Ele usa exclusivamente o environment `preview`, nunca acessa Production e nunca promove deployments.
