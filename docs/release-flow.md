# Fluxo oficial de release

## Regra única

```text
feature/*
   ↓
Preview (Vercel + Neon Preview)
   ↓  PR aprovada e checks obrigatórios
main
   ↓
Production (Vercel + Neon Production)
```

O Git Integration da Vercel é o único mecanismo de deploy. Workflows GitHub não executam `vercel deploy`, `vercel promote`, nem criam arquivos `.env`. Isso elimina a promoção manual de um artefato de feature para Production.

## Domínios e URLs

| Uso | URL/forma permitida | Regra |
| --- | --- | --- |
| Canônica pública | `https://theblackbanner.vercel.app` | Única origem para metadata, sitemap e links públicos. |
| Legada | `https://tbbc-three.vercel.app` | Redirecionamento permanente, preservando caminho e query, para a origem canônica. |
| Preview | `https://theblackbanner-<deployment>-jandersons-projects-bbd4737f.vercel.app` | Somente validação; `X-Robots-Tag: noindex`; nunca usar em links, metadata ou promoção. |
| Alias de Git | `*-git-<branch>-*.vercel.app` | Não é URL pública e não pode receber tráfego ou ser promovida. |

`NEXT_PUBLIC_SITE_URL` deve existir somente nos ambientes Production e Preview e apontar para a origem de seu próprio ambiente. Production usa a URL canônica; Preview usa a URL do deployment validado. Nenhuma URL de Preview pode ser armazenada em código, Canon ou documentação editorial.

## Regras por etapa

### Feature → Preview

1. Criar uma branch `feature/*` a partir de `main`.
2. Abrir PR para `main`; a Vercel cria um Preview isolado.
3. O `Preview Database Gate` é executado exclusivamente com o environment GitHub `preview` e a branch Neon Preview.
4. Registrar a URL imutável do Preview somente no resumo da execução e validar health, Canon, CMS, grafo e Playwright.
5. Qualquer falha bloqueia o merge. Não há comando de promoção manual.

### Preview → main

1. Exigir `Quality Gates` e `Preview Database Gate` verdes.
2. Exigir revisão aprovada e branch atualizada.
3. Fazer merge por pull request; push direto em `main` é proibido.

### main → Production

1. A Vercel deve ter `main` como **Production Branch**.
2. O push resultante do merge é o único evento que cria Production.
3. Confirmar que o deployment possui o commit de `main`, a URL canônica e health check HTTP 200.
4. Somente migrations versionadas e explicitamente aprovadas podem rodar em Production; `prisma db push` é proibido.
5. O rollback de aplicação usa um deployment anterior de `main`; alterações de banco seguem o procedimento de [rollback](./rollback.md).

## Configuração obrigatória na plataforma

Estas configurações não podem ser impostas por um arquivo do repositório e devem ser concluídas na Vercel/GitHub antes do próximo release:

- Vercel: Production Branch = `main`.
- Vercel: `theblackbanner.vercel.app` associado ao deployment de Production atual.
- Vercel: `tbbc-three.vercel.app` mantido apenas como alias legado, com redirect 308 em `/` e em qualquer rota.
- Vercel Preview: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `POSTGRES_URL`, `ADMIN_USER` e `ADMIN_PASSWORD` definidos apenas para Preview e ligados à branch Neon Preview.
- Vercel Production: as mesmas variáveis definidas apenas para Production e ligadas ao banco Production; não compartilhar endpoints entre os ambientes.
- GitHub: proteger `main`, exigir PR, revisão e os checks `Quality Gates` e `Preview Database Gate`.

## Situação verificada em 17/07/2026

A auditoria leu somente metadados e endpoints públicos, sem modificar Production:

- A Vercel possui vários deployments Preview prontos e um deployment Production pronto.
- O deployment Production inspecionado expõe aliases de projeto e de branch; havia um alias associado a branch `codex/*`, incompatível com o fluxo oficial.
- Não há domínio customizado cadastrado no time; os domínios observados são aliases `vercel.app`.
- `https://tbbc-three.vercel.app/reinos/ironhold` devolve redirect 308 para a URL canônica; a raiz ainda não cumpre essa regra no deployment ativo. O redirect explícito de `/` foi versionado e precisa chegar a Production por `main` antes da revalidação.
- `https://theblackbanner.vercel.app/api/health` devolveu HTTP 404; o deployment canônico não contém o health endpoint esperado.
- O Preview mais recente devolveu HTTP 503 em `/api/health`; este é um bloqueio já conhecido do Database Gate.
- Os nomes de variáveis na Vercel mostram URLs explícitas de banco somente em Production; Preview ainda depende de variáveis PostgreSQL compartilhadas. Isso não atende ao isolamento exigido.

Enquanto qualquer item acima permanecer pendente, não há autorização técnica para um novo release em Production.
