# Direção narrativa de personagens

Cada personagem é apresentado como capítulo de um artbook, não como registro técnico. A experiência segue: hero, história em cinco atos, personalidade, lendas e rumores, timeline relacionada, grafo, processo criativo, prompt, miniatura, galeria, Art Bible, reino e coleção.

## Contrato narrativo

- Título épico, subtítulo e citação.
- Origem, ascensão, queda, estado atual e legado.
- Curiosidades, lendas, rumores, virtudes, defeitos, medos e objetivos.
- Seis atributos visuais.
- Símbolo, paleta, silhueta, materiais, influências e regras.

`getCharacterNarrative` fornece uma camada compatível para todos os registros atuais. Conteúdo editorial específico salvo pelo CMS poderá substituir gradualmente essa camada sem alterar o layout.

## Movimento

Reveals usam `IntersectionObserver`, executam uma única vez e respeitam `prefers-reduced-motion`. Hover e transições permanecem discretos para preservar leitura e performance.
