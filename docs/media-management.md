# Gerenciamento de mídia

## Arquitetura

A área administrativa usa Route Handlers do App Router, um repositório JSON (`src/data/media.json`) e a interface `ImageStorageProvider`. A implementação inicial `LocalImageStorageProvider` grava variantes em `public/uploads/characters/[slug]/[primary|gallery]/[id]`.

O frontend nunca conhece detalhes do provedor. Uma futura implementação pode enviar os mesmos métodos para S3, Cloudinary ou Supabase Storage.

## Fluxo

1. O navegador exibe uma prévia local e envia `multipart/form-data`.
2. O servidor valida quantidade, tamanho, MIME, extensão e integridade.
3. Sharp lê dimensões, corrige orientação e cria WEBP em 400, 800 e até 2000 px.
4. O provider grava os arquivos com UUID, sem usar o nome original no caminho.
5. O repositório persiste os metadados e as páginas públicas passam a consumir o registro.

## Segurança

Defina `ADMIN_USER` e `ADMIN_PASSWORD`. O proxy protege `/admin` e `/api/admin`. Em desenvolvimento, a ausência das variáveis permite acesso local; em produção, retorna 503. O próximo passo recomendado é Auth.js com sessões e perfis.

## Limitações locais

O filesystem de aplicações serverless costuma ser efêmero ou somente leitura. `public/uploads` é apropriado para desenvolvimento e servidores com disco persistente, mas produção serverless deve usar storage externo e banco PostgreSQL. Escritas JSON concorrentes também não substituem transações de banco.

## Contrato de mídia

`MediaImage` armazena id, URL, nome original normalizado, alt, legenda, dimensões, MIME, tamanho, ordem, destaque, datas e URLs de variantes.
