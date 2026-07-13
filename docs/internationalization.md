# Internacionalização

## Estado editorial

Os seeds oficiais possuem conteúdo relacionado publicado em PT-BR, inglês e espanhol. O painel `/admin/translations` mostra publicações, lacunas e fallbacks por entidade. Uma tradução incompleta nunca é mesclada campo a campo: o resolvedor retorna a entidade-base integral em PT-BR.

## Estratégia

A implementação usa recursos nativos do Next.js e `Intl`, sem biblioteca externa e sem tradução automática em execução. O locale é resolvido na borda pelo proxy, persistido no cookie `tbcc-locale` e propagado pelo header `x-tbcc-locale`.

Rotas públicas usam `/pt-br`, `/en` e `/es`. Segmentos editoriais são localizados (`personagens`, `characters`, `personajes`) enquanto o slug técnico da entidade permanece estável. URLs antigas redirecionam sem quebrar referências existentes.

## Conteúdo

`pt-BR` é o idioma editorial principal. O conteúdo atual permanece intacto e representa a tradução portuguesa publicada. Inglês e espanhol foram registrados como rascunhos relacionados, nunca como cópias das entidades. Traduções ausentes usam fallback integral da página em português; componentes não devem combinar parágrafos de idiomas diferentes.

O modelo `ContentTranslation` armazena `locale`, `fields`, slug opcional, publicação e versão. `MarketplaceTranslation` preserva o mesmo isolamento para canais comerciais. O CMS oferece abas Português, English e Español, cópia manual como base, status de completude e bloqueio de publicação incompleta.

## SEO e formatação

O layout gera `lang`, canonical, Open Graph locale, hreflang para os três idiomas e `x-default`. O sitemap contém URLs e alternates por locale. O RSS lê o locale solicitado. Datas, números e moedas usam `Intl` sem conversão de valores.

## Pendências editoriais

As traduções inglesas e espanholas dos registros existentes permanecem em rascunho até revisão humana. Consulte `src/data/translation-migration.ts` para a contagem reproduzível por entidade. Nenhuma tradução existente é sobrescrita automaticamente.
