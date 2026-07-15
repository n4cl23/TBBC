# Segurança administrativa

Rotas administrativas permanecem indisponíveis quando `ADMIN_USER` ou `ADMIN_PASSWORD` não existem. Mutações validam origem, limite de payload, rate limit e schemas estritos; respostas nunca incluem credenciais ou URLs de conexão. Segredos devem existir somente nos ambientes Vercel apropriados e jamais no repositório ou logs.

