# Release

1. Abra PR para `main` e aguarde `Quality Gates`.
2. Execute `Deploy Preview` e registre sua URL.
3. Valide `/api/health`, Canon, grafo, CMS e autenticação.
4. Solicite aprovação do environment GitHub `production`.
5. Execute `Promote Production` informando a URL validada.
6. Observe logs e health check após a promoção.

Uma falha interrompe o pipeline; não se ignora migration status, Canon Verify, Playwright ou smoke test.

