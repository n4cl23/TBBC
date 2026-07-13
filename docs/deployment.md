# Deploy

## Produção Vercel

O projeto de produção é `theblackbanner` e sua origem canônica é `https://theblackbanner.vercel.app`. Defina `NEXT_PUBLIC_SITE_URL` com esse valor em Preview e Production. O host legado `tbbc-three.vercel.app` é preservado somente como redirecionamento permanente.

## Requisitos

- Node.js 22 LTS
- npm
- `ADMIN_USER` e `ADMIN_PASSWORD` definidos como segredos da plataforma

Execute `npm ci`, `npm run build` e `npm start`.

## Mídia

`public/uploads` funciona apenas em servidor com disco gravável e persistente. Plataformas serverless normalmente oferecem filesystem efêmero ou somente leitura; nelas, implemente `ImageStorageProvider` para S3, Cloudinary ou Supabase Storage e use PostgreSQL para os metadados.

Não há deploy automático configurado. O workflow atual faz somente integração contínua.
