# Marketplace Hub

O Marketplace Hub centraliza a distribuição comercial de personagens, criaturas, coleções e arquivos STL. Marketplaces e anúncios são entidades do CMS, com publicação, versionamento e auditoria iguais aos demais conteúdos do World Engine.

## Entidades

- `Marketplace`: identidade, website, cores, descrição e estado do canal.
- `MarketplaceListing`: vínculo polimórfico com uma entidade do universo, preço atual, moeda, disponibilidade, licença, métricas e URL externa.
- `MarketplacePrice`: histórico monetário manual, preparado para sincronização futura.

Os estados aceitos são `coming-soon`, `in-production`, `available`, `early-access`, `exclusive`, `retired` e `archived`. As moedas suportadas são USD, BRL, EUR e GBP.

## Administração

`/admin/marketplace` apresenta indicadores e o editor dos canais. `/admin/marketplace/listings` administra anúncios. As alterações usam as rotas genéricas do CMS e geram versões e logs de auditoria.

## Site público

`/marketplaces` lista canais ativos e `/marketplaces/[slug]` exibe o catálogo de cada canal. Personagens com anúncios recebem a seção “Download STL”, selo de disponibilidade e dados estruturados Product/Offer. Coleções exibem progressão por personagem.

Todos os destinos comerciais abrem em nova aba com `noopener noreferrer`. Valores são formatados com `Intl.NumberFormat`, respeitando a moeda cadastrada.

## Integrações futuras

O contrato separa dados editoriais (`Marketplace`), publicação (`MarketplaceListing`) e valores históricos (`MarketplacePrice`). Um adaptador futuro poderá sincronizar preço, downloads e avaliações sem modificar as páginas ou os componentes de apresentação. Nenhuma API externa é consumida nesta sprint.
