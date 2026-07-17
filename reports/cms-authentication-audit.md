# Auditoria de autenticação do CMS

Data: 17/07/2026  
Escopo: código versionado e ambiente Vercel Preview, somente leitura e requisições anônimas.  
Segredos: nenhum valor de credencial, cookie ou connection string foi acessado, impresso ou salvo.

## Resultado executivo

| Controle | Resultado | Evidência |
| --- | --- | --- |
| Credenciais Preview | **APROVADO** | `ADMIN_USER` e `ADMIN_PASSWORD` estão configurados no ambiente Preview; valores não foram consultados. |
| Login | **PARCIAL** | O desafio HTTP Basic e a recusa anônima funcionam; não foi executado login com segredo real. |
| Sessão | **NÃO IMPLEMENTADA** | Não existe sessão de aplicação. HTTP Basic é stateless; o navegador pode armazenar a credencial, mas não há cookie de sessão, logout ou revogação pelo servidor. |
| JWT | **NÃO IMPLEMENTADO** | Não há emissão, validação, rotação ou expiração de JWT no repositório. |
| Middleware/proxy | **APROVADO** | `proxy.ts` protege `/admin` e `/api/admin/*`; testes unitários passaram e endpoints Preview anônimos retornaram 401. |
| Permissões | **PARCIAL** | Há uma única credencial administrativa com acesso total. Não há RBAC, papéis, escopos ou princípio de menor privilégio. |
| Publicação | **APROVADO POR CÓDIGO** | Leituras públicas filtram registros com `status === 'published'`; mutações administrativas são protegidas pelo proxy. |
| Preview | **APROVADO** | O deployment Preview respondeu `X-Robots-Tag: noindex` e protegeu leitura e mutação administrativas. |
| Auditoria e versionamento | **APROVADO POR CÓDIGO / PENDENTE DE FLUXO AUTENTICADO** | Mutações criam `AuditLog`, versão de entidade/relação e `ChangeSet`; não foi feita mutação de teste para preservar o banco. |

## Evidências de Preview

- `ADMIN_USER=SET_PREVIEW`
- `ADMIN_PASSWORD=SET_PREVIEW`
- `GET /admin` sem autorização: HTTP 401.
- `GET /api/admin/history` sem autorização: HTTP 401.
- `GET /api/admin/cms/characters` sem autorização: HTTP 401.
- `POST /api/admin/cms/characters` sem autorização: HTTP 401, sem mutação.
- `/admin` apresentou `WWW-Authenticate: Basic realm="Black Banner Admin"`.
- Página pública Preview apresentou `X-Robots-Tag: noindex`.
- Teste unitário de `proxy.ts`: 3 testes aprovados.
- Typecheck: aprovado.

## Arquitetura observada

1. `src/proxy.ts` compara o header `Authorization: Basic` com `ADMIN_USER` e `ADMIN_PASSWORD` e protege tanto páginas quanto APIs administrativas.
2. Sem as duas variáveis em ambiente não-development, o CMS falha fechado com HTTP 503.
3. `src/lib/cms-public.ts` expõe apenas registros publicados.
4. `src/lib/cms-repository.ts` grava, por transação, alterações, versões e `AuditLog`; restaurações registram também `RestoreOperation`.
5. O contexto de auditoria inclui ator configurado, IP encaminhado, request ID e origem quando presentes.

## Riscos e pendências

### Alta prioridade

- **Autenticação de conta única por HTTP Basic.** Não há usuários individuais, MFA, expiração, logout, revogação ou papéis. O campo `AuditLog.role` não é preenchido pelo fluxo atual; toda ação aparece como a conta configurada. Para uso por mais de uma pessoa, isso impede atribuição confiável e menor privilégio.
- **Não há validação de login real nesta auditoria.** A presença das credenciais foi confirmada sem revelar valores. Um smoke test autenticado deve ser executado em Preview com injeção de segredos pelo runner, sem logs de header, para validar criar, publicar, restaurar e consultar o `AuditLog`.

### Média prioridade

- **Comparação de credenciais simples.** O proxy compara strings diretamente; para uma credencial de alto valor, preferir provedor de identidade ou comparação resistente a timing no ambiente compatível.
- **Rate limit local.** O limite de mutações usa `Map` em memória, não é compartilhado entre instâncias e não limita tentativas de login. Em ambiente serverless, não oferece proteção distribuída contra força bruta.
- **Proteção CSRF limitada.** Mutações verificam `Origin` apenas quando o header existe. Recomenda-se token CSRF ou autenticação baseada em sessão com proteção CSRF para fluxos de navegador.
- **IP confiado por header.** O valor de `x-forwarded-for` é registrado diretamente; a confiança nesse header deve ser limitada à borda da Vercel.

## Conclusão

O CMS Preview está fechado para acesso anônimo e possui trilha de auditoria/versionamento no código. A arquitetura atual atende a uma operação administrativa única e controlada, mas não atende aos requisitos de JWT, sessão ou permissões granulares porque esses mecanismos não existem. Não foi realizada nenhuma alteração de dados, credenciais ou Production.
