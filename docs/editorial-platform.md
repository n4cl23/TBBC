# Plataforma editorial

## Componentes reutilizáveis

- `TypedEditorialForm` recebe um schema Zod e uma descrição de campos para reutilizar validação e apresentação.
- `MediaCropper` produz uma variação WebP quadrada no navegador antes do envio.
- `MediaLibrary` usa o formulário tipado e persiste `MediaAsset`, variantes e auditoria.
- `EditorialReviewForm` registra submissão, aprovação ou pedido de ajuste contra a versão atual de qualquer registro CMS.

## Papéis

| Papel | Pode executar |
| --- | --- |
| `editor` | Criar, editar rascunhos, enviar para revisão e gerenciar mídia |
| `reviewer` | Consultar e aprovar ou solicitar ajustes |
| `owner` | Todas as permissões, incluindo publicar, restaurar e arquivar |

`ADMIN_USER` e `ADMIN_PASSWORD` continuam compatíveis e representam o papel `owner`. Para mais de uma conta, configure `EDITORIAL_ACCOUNTS` como uma lista JSON secreta com `username`, `password` e `role`; não versione ou exponha esse valor.

## Armazenamento de mídia

O provedor é escolhido em tempo de execução, sem gravar arquivos de ambiente:

1. Vercel Blob quando `BLOB_READ_WRITE_TOKEN` estiver configurado.
2. S3 quando `S3_BUCKET`, `S3_REGION` e `S3_PUBLIC_BASE_URL` estiverem configurados; credenciais podem vir da cadeia segura do runtime AWS ou de variáveis protegidas.
3. Armazenamento local somente durante desenvolvimento. Em produção, sem Blob ou S3 configurado, o envio falha de forma explícita.

As rotas administrativas nunca retornam credenciais. Arquivos são aceitos apenas como PNG, JPEG ou WebP, até 10 MB, e são convertidos em variantes WebP `thumbnail`, `card` e `full`.

## Revisão e versionamento

O CMS mantém o histórico de versões e as operações de restauração existentes. O fluxo de revisão adiciona eventos de auditoria (`review:submit`, `review:approve`, `review:requestChanges`) com ator, versão e nota. Isso mantém comentários e decisões editoriais fora do conteúdo canônico.
