# The Black Banner Chronicles

Produção: [theblackbanner.vercel.app](https://theblackbanner.vercel.app). O endereço anterior `tbbc-three.vercel.app` é mantido apenas como redirecionamento permanente.

## Marketplace Hub

O CMS agora administra marketplaces, anúncios, preços, moedas e disponibilidade sem alterações de código. Consulte [docs/marketplace-hub.md](docs/marketplace-hub.md) para os contratos, rotas e estratégia de integrações futuras.

Site oficial, catálogo de miniaturas e arquivo visual do universo autoral de Asterheim. O projeto apresenta personagens, reinos, Guardiões, Coroas e as coleções The Black Banner Company, The Broken Mug Tavern, Iron Tankard Tavern, Legends of the Realm, Beasts of Asterheim e The Six Crowns of Asterheim.

## Stack

- Next.js 16.2 com App Router e React
- TypeScript e Tailwind CSS
- Sharp para processamento de imagens
- Vitest e Testing Library
- ESLint e Prettier
- Repositório JSON local para metadados de mídia

## Requisitos

- Node.js 22 LTS
- npm 10 ou superior

## Executar

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Site: `http://127.0.0.1:3000` · Administração: `http://127.0.0.1:3000/admin`.

Configure `ADMIN_USER` e `ADMIN_PASSWORD` em `.env.local`. `NEXT_PUBLIC_SITE_URL` define a URL canônica local. Nunca envie `.env.local` ao repositório.

## Estrutura

```text
src/app/          Rotas públicas, administrativas e APIs
src/components/   Interface reutilizável
src/data/         Catálogo e metadados locais
src/lib/          Storage, repositório e regras de mídia
public/images/    Ativos oficiais versionados
public/uploads/   Uploads de execução ignorados pelo Git
docs/             Arquitetura, mídia e deploy
```

## Administração de imagens

Em `/admin/personagens`, pesquise ou filtre o personagem, escolha **Editar**, arraste PNG/JPG/WEBP de até 10 MB, informe o texto alternativo e salve. Uploads de galeria aceitam até 12 arquivos. É possível editar alt/legenda, reordenar, definir capa e remover.

Os arquivos processados ficam em `public/uploads`; metadados ficam em `src/data/media.json`. Consulte [docs/media-management.md](docs/media-management.md) para arquitetura, segurança e migração de storage.

## CMS editorial

O Sprint 3 adiciona CRUD, pesquisa, rascunho/publicação, duplicação, versões e auditoria para personagens, coleções, Guardiões, reinos, Coroas, armas, timeline, galeria, novidades, Art Bible e guia de impressão. O repositório local fica em `src/data/cms.json`; `/admin/history` registra usuário, IP, operação e campos alterados.

## Scripts

- `npm run dev`: desenvolvimento
- `npm run lint`: ESLint
- `npm run typecheck`: TypeScript
- `npm run test`: Vitest
- `npm run test:e2e`: Playwright, interações e seis breakpoints
- `npm run build`: produção

## Banco de dados

Não há banco nesta versão. `src/data/media.json` oferece persistência simples de desenvolvimento. PostgreSQL é recomendado antes de operar múltiplas instâncias.

## Testes e build

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Produção

Storage local requer disco persistente. Em plataformas serverless, implemente `ImageStorageProvider` para S3, Cloudinary ou Supabase e migre o repositório JSON para PostgreSQL.

## Roadmap

- PostgreSQL e repositório transacional
- Auth.js e perfis administrativos
- Storage externo
- Gerenciamento editorial completo de coleções, Coroas, reinos e notícias
- Internacionalização e visualizador 3D

## Propriedade intelectual

The Black Banner Chronicles, Asterheim, seus personagens, histórias, reinos, guardiões, coroas, conceitos visuais e demais elementos autorais pertencem aos responsáveis pelo projeto. O código-fonte não concede automaticamente autorização para uso comercial dos ativos criativos.

All rights reserved. Licença definitiva pendente de definição.
