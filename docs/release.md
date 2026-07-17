# Release

O fluxo oficial é [feature → Preview → main → Production](./release-flow.md). A Vercel Git Integration cria Preview para branches de feature e Production somente para `main`.

1. Abra PR de `feature/*` para `main`.
2. Aguarde `Quality Gates` e `Preview Database Gate` no Preview isolado.
3. Valide health, Canon, grafo, CMS, autenticação e Playwright na URL imutável do Preview.
4. Faça merge aprovado em `main`; o deployment Production é criado pela Vercel a partir desse commit.
5. Valide a URL canônica, redirect legado e health HTTP 200.

Não existe promoção manual de Preview, nem deploy manual de Production. Uma falha interrompe o release; não se ignora migration status, Canon Verify, Playwright ou smoke test.
