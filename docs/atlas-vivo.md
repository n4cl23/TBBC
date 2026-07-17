# Atlas Vivo

O Atlas Vivo é uma projeção de leitura dos registros **publicados** no CMS e do grafo do Canon 1.1.0. Ele não cria entidades nem completa lacunas narrativas.

## Rotas

- `/atlas/vivo/realms`
- `/atlas/vivo/fortresses`
- `/atlas/vivo/ruins`
- `/atlas/vivo/temples`
- `/atlas/vivo/villages`
- `/atlas/vivo/biomes`
- `/atlas/vivo/food-chain`
- `/atlas/vivo/flora`
- `/atlas/vivo/fauna`

## Fonte e persistência

- Reinos, locais e criaturas são lidos com `getPublishedData` do CMS.
- Locais canônicos importados são expostos no CMS como `locations`; o fallback de desenvolvimento deriva apenas os mesmos registros do registry canônico.
- Habitat e categoria de espécie vêm dos dados de criatura já canônicos.
- Relações de cadeia alimentar exigem a aresta canônica `preys-on`.

## Lacunas deliberadas

O Canon 1.1.0 não possui vilas, flora, dominância ecológica ou relações `preys-on` registradas. As respectivas telas permanecem vazias e indicam essa ausência; o filtro Dominante fica indisponível até existir dado canônico.
