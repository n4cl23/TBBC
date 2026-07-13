# Identidade visual — The Black Banner Chronicles

## Princípio

A interface abandona a aparência de catálogo em favor de uma experiência editorial cinematográfica. Arte domina; texto orienta. Personagens são pôsteres, coleções são capítulos e reinos são destinos identificados por brasões.

## Marca

O símbolo representa um estandarte dividido por uma lâmina e uma estrela fraturada. A marca principal combina o símbolo com “The Black Banner” e a assinatura “Chronicles of Asterheim”. A versão compacta usa apenas símbolo e nome.

## Sistema gráfico

- Fundo Void `#050605`, obsidiana `#0a0b09`, ouro antigo `#bd9550`, pergaminho `#d9d0bd` e brasa `#b3422f`.
- Cinzel permanece como tipografia de títulos; Inter sustenta leitura e controles.
- Cortes diagonais, linhas finas, ruído material e luz radial substituem cartões genéricos.
- Animações usam revelação vertical, zoom lento e brilho controlado, respeitando `prefers-reduced-motion`.

## Componentes

- `BrandLockup` e `BannerSigil`
- `CharacterPoster`
- `CollectionChapter`
- `RealmDestination` e `RealmCrest`
- `loading.tsx` como splash/loading screen

## Responsividade

Posters alternam entre composição assimétrica desktop e coluna única mobile. Capítulos e destinos reduzem elementos ornamentais, preservando nome, imagem, hierarquia e ação.
