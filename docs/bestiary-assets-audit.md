# Auditoria de ativos — Bestiário de Asterheim

Data da auditoria: 14 de julho de 2026  
Fonte analisada (somente leitura): `C:\Users\Janderson Santos\Desktop\Chronicles of Asterheim\Beasts of Asterheim`

## Resumo executivo

- 114 arquivos em 44 pastas, totalizando 6.261.486.158 bytes (aprox. 5,83 GiB / 5.972 MiB).
- 34 criaturas oficiais encontradas, cada uma com PNG, GLB e STL.
- 4 miniaturas lendárias fora da taxonomia solicitada: Aegis, Aster, Fenrir e Skywind; cada uma possui PNG, STL e MP4, mas não GLB.
- Formatos encontrados: 38 PNG, 38 STL, 34 GLB e 4 MP4.
- Formatos ausentes: JPG/JPEG, WEBP, OBJ, MTL, GLTF, LYS/Lychee, PDF e texturas independentes.
- Todos os arquivos passaram pela validação de assinatura e estrutura básica: PNG legível, GLB 2.0 com comprimento declarado correto, STL binário com contagem de triângulos coerente e MP4 com caixa `ftyp`.
- SHA-256 foi calculado para os 114 arquivos. Não existem duplicados byte a byte.
- Os PNG têm 1024 × 1024 px e representam renders pintados/finais de miniaturas com base integrada.
- Os GLB são high-poly: 66–75 MiB e aproximadamente 1,89–1,99 milhão de triângulos por criatura. Não usam Draco, Meshopt ou KTX2; não são adequados para publicação direta no viewer.
- Os STL têm 89,9–94,9 MiB e a mesma ordem de complexidade dos GLB. São candidatos de impressão, mas não há evidência de suportes, fatiamento, manifold, escala física, peças ou teste de impressão.

## Inventário por pasta

Tamanhos em MiB. Todos os itens listados possuem exatamente os arquivos indicados na linha.

| Grupo de origem | Criatura/pasta | PNG | GLB | STL | MP4 | Total | Associação sugerida |
|---|---|---:|---:|---:|---:|---:|---|
| Abyss | Coral Titan | 1,79 | 71,96 | 93,33 | — | 167,08 | Kingdom of the Abyss / Coral Titan |
| Abyss | Deep Horror | 1,55 | 66,52 | 93,89 | — | 161,95 | Kingdom of the Abyss / Deep Horror |
| Abyss | Kraken | 1,74 | 68,16 | 92,57 | — | 162,46 | Kingdom of the Abyss / Kraken |
| Abyss | Leviathan | 1,70 | 68,48 | 94,80 | — | 164,98 | Kingdom of the Abyss / Leviathan |
| Abyss | Sea Serpent | 1,46 | 66,05 | 90,82 | — | 158,33 | Kingdom of the Abyss / Sea Serpent |
| Elder Forest | Ancient Wolf | 1,55 | 68,29 | 93,46 | — | 163,30 | Elder Forest / Ancient Wolf |
| Elder Forest | Dryad | 1,58 | 71,29 | 92,07 | — | 164,94 | Elder Forest / Dryad |
| Elder Forest | Ent | 1,76 | 69,49 | 93,70 | — | 164,95 | Elder Forest / Ent |
| Elder Forest | Forest Spirit | 1,67 | 70,67 | 94,78 | — | 167,11 | Elder Forest / Forest Spirit |
| Elder Forest | Moss Colossus | 1,75 | 70,85 | 93,81 | — | 166,41 | Elder Forest / Moss Colossus |
| Elder Forest | Treant Elder | 1,62 | 73,48 | 92,17 | — | 167,27 | Elder Forest / Treant Elder |
| Frost Kingdom | Crystal Bear | 1,56 | 70,82 | 94,64 | — | 167,02 | Frost Kingdom / Crystal Bear |
| Frost Kingdom | Frost Drake | 1,44 | 70,00 | 91,59 | — | 163,03 | Frost Kingdom / Frost Drake |
| Frost Kingdom | Frost Troll | 1,63 | 70,53 | 94,63 | — | 166,80 | Frost Kingdom / Frost Troll |
| Frost Kingdom | Ice Giant | 1,85 | 72,33 | 91,70 | — | 165,88 | Frost Kingdom / Ice Giant |
| Frost Kingdom | Ice Wolves | 1,52 | 71,93 | 94,50 | — | 167,96 | Frost Kingdom / Ice Wolves |
| Frost Kingdom | Mammoth | 1,78 | 71,35 | 91,53 | — | 164,66 | Frost Kingdom / Frost Mammoth |
| Frost Kingdom | Snow Wraith | 1,47 | 67,08 | 91,52 | — | 160,07 | Frost Kingdom / Snow Wraith |
| Ironhold | Cave Troll | 1,68 | 68,11 | 93,22 | — | 163,01 | Ironhold / Cave Troll |
| Ironhold | Forge Beast | 1,42 | 70,42 | 89,89 | — | 161,73 | Ironhold / Forge Beast |
| Ironhold | Iron Golem | 1,60 | 72,71 | 92,71 | — | 167,03 | Ironhold / Iron Golem |
| Ironhold | Lava Drake | 1,66 | 68,43 | 90,20 | — | 160,30 | Ironhold / Lava Drake |
| Ironhold | Stone Giant | 1,59 | 67,27 | 91,23 | — | 160,09 | Ironhold / Stone Giant |
| Scorched Wastes | Ash Demon | 1,59 | 67,07 | 91,64 | — | 160,30 | Scorched Wastes / Ash Demon |
| Scorched Wastes | Fire Drake | 1,65 | 66,29 | 90,57 | — | 158,50 | Scorched Wastes / Fire Drake |
| Scorched Wastes | Magma Titan | 1,69 | 69,28 | 94,16 | — | 165,12 | Scorched Wastes / Magma Titan |
| Scorched Wastes | Phoenix | 1,64 | 74,19 | 94,76 | — | 170,58 | Scorched Wastes / Phoenix |
| Scorched Wastes | Sand Worm | 1,72 | 68,30 | 91,79 | — | 161,81 | Scorched Wastes / Sand Worm |
| Stormreach | Lightning Serpent | 1,58 | 74,60 | 94,22 | — | 170,41 | Stormreach / Lightning Serpent; revisão artística obrigatória |
| Stormreach | Sky Whale | 1,57 | 68,10 | 91,61 | — | 161,28 | Stormreach / Sky Whale |
| Stormreach | Storm Dragon | 1,44 | 70,07 | 92,07 | — | 163,58 | Stormreach / Storm Dragon |
| Stormreach | Storm Griffin | 1,51 | 67,08 | 92,22 | — | 160,82 | Stormreach / Storm Griffin |
| Stormreach | Tempest Hawk | 1,64 | 73,72 | 94,31 | — | 169,67 | Stormreach / Tempest Hawk |
| Stormreach | Thunder Golem | 1,71 | 70,38 | 90,65 | — | 162,74 | Stormreach / Thunder Golem |
| Fora da taxonomia | Aegis — The First Sky King | 1,64 | — | 93,12 | 1,78 | 96,54 | Guardião/entidade lendária; não importar como criatura sem decisão editorial |
| Fora da taxonomia | Aster — The World Heart | 1,62 | — | 94,63 | 1,94 | Guardião/entidade lendária; não importar como criatura sem decisão editorial |
| Fora da taxonomia | Fenrir — The Moon Devourer | 1,53 | — | 92,44 | 2,53 | Guardião/entidade lendária; não importar como criatura sem decisão editorial |
| Fora da taxonomia | Skywind — The Storm Sovereign | 1,59 | — | 94,92 | 2,51 | Guardião/entidade lendária; não importar como criatura sem decisão editorial |

## Estrutura e nomenclatura

Estrutura predominante: `<reino>/<criatura>/<criatura>.<ext>`. Ela é consistente nos seis grupos, com três exceções semânticas:

1. `Abyss` deve ser normalizado logicamente para `kingdom-of-the-abyss`, sem renomear a origem.
2. A pasta `Frost Kingdom/Mammoth` contém arquivos chamados `Frost Mammoth`; o slug canônico sugerido é `frost-mammoth`.
3. `Ice Wolves` está no plural, mas o render mostra uma única miniatura. Manter o nome editorial solicitado, registrando que o ativo visual representa um indivíduo.

Convenção sugerida para derivados, sem alterar os originais:

`bestiary/<realm-slug>/<creature-slug>/<asset-kind>/<creature-slug>-<asset-kind>-v001.<ext>`

Exemplos:

- `bestiary/frost-kingdom/frost-mammoth/hero/frost-mammoth-painted-v001.avif`
- `bestiary/stormreach/tempest-hawk/models/tempest-hawk-web-lod1-v001.glb`
- `bestiary/ironhold/iron-golem/print/iron-golem-master-v001.stl`

## Associação e estágio aparente

- PNG: `painted-render`, final/aprovável para catálogo após derivação responsiva.
- GLB: modelo texturizado high-poly, aparentemente final, com uma animação e três texturas embutidas; fonte para otimização, não arquivo web final.
- STL: master binário high-poly para validação de impressão; status real de impressão permanece `unverified`.
- MP4: turntable/apresentação apenas das quatro entidades lendárias; não pertence ao conjunto das 34 criaturas.

## Inspeção de direção artística

Os renders são quadrados, têm fundo neutro, base integrada e silhueta legível. Em geral a criatura domina a composição e o cenário é secundário.

Riscos encontrados:

- **Lightning Serpent — bloqueio crítico:** a silhueta forma um S claro, porém o corpo envolve e é atravessado visualmente por uma estrutura rochosa central. Não atende à regra de que somente a ponta da cauda toque um único penhasco e de que pilares/ruínas nunca atravessem o corpo. O ativo pode aparecer como WIP editorial, mas não deve ser marcado como miniatura oficial aprovada nem como GLB público final.
- **Kraken — revisão recomendada:** tentáculos e pilares formam interseções visuais complexas; confirmar separação física e legibilidade em vistas laterais.
- **Leviathan — revisão recomendada:** o diorama naval ocupa proporção relevante da composição. Confirmar o alvo de 75–85% de dominância da criatura.
- Os demais renders atendem visualmente ao princípio de base integrada e anatomia reconhecível na vista fornecida, mas uma imagem frontal não comprova ausência de interseções em 360°.

## Duplicados e corrupção

- Duplicados exatos por SHA-256: nenhum.
- Arquivos corrompidos ou truncados: nenhum detectado.
- Versões duplicadas por nome: nenhuma.
- A auditoria não comprova equivalência geométrica entre formatos; GLB e STL de cada criatura possuem contagens de triângulos compatíveis, indicando derivação do mesmo master.

## Adequação para o site

Adequados após geração de derivados:

- 34 PNG oficiais: gerar AVIF/WebP responsivo, thumbnail e Open Graph; preservar PNG como fonte.
- 34 GLB: somente após decimação/LOD, compressão de malha e texturas e validação visual. Budget recomendado: até 8–12 MiB para LOD principal e até 3–5 MiB para mobile/fallback interativo.

Não adequados ao bundle público atual:

- Todos os GLB originais de 66–75 MiB.
- Todos os STL originais.
- Qualquer caminho local absoluto.

## Adequação para impressão

Os 38 STL são candidatos a master, mas ainda faltam verificações de:

- escala/unidades e dimensões físicas;
- malha manifold, normais, shells e paredes mínimas;
- divisão em peças, encaixes e tolerâncias;
- oco, furos de drenagem e volume de resina;
- suportes e arquivo Lychee;
- teste real em impressora/resina;
- licença e disponibilidade comercial.

Até essa validação, todos devem permanecer privados e com `printStatus: unverified`.

## Ausências por criatura

As 34 criaturas não possuem, na pasta auditada:

- concept art, clay render, wireframe ou galeria adicional;
- GLB otimizado/LOD;
- OBJ/MTL ou GLTF;
- STL suportado;
- LYS/Lychee;
- guia de montagem ou pintura;
- foto de impressão;
- dados de escala, peças, base, resina ou tempo de impressão;
- links/licenças/preços de marketplace;
- metadados editoriais e traduções anexos aos arquivos.

## Recomendação de importação

1. Registrar os 34 conjuntos no manifesto em dry-run com caminhos locais privados e checksums.
2. Não copiar os 6,26 GB para Git ou `public/`.
3. Derivar thumbnails e heroes em storage persistente.
4. Executar pipeline de otimização GLB fora do bundle e validar visualmente cada derivado.
5. Manter STL/LYS/OBJ privados e publicar somente URLs autorizadas.
6. Separar as quatro entidades lendárias para revisão editorial; não contam na cobertura das 34 criaturas.
7. Bloquear o Lightning Serpent como `art-review` até corrigir a composição.

## Limitações da auditoria

- A inspeção visual usa os 38 renders PNG; não foi executada uma rotação 360° dos GLB.
- Não houve cópia, renomeação, modificação ou upload de ativos.
- Não foram realizados slicer, reparo de malha, teste de impressão ou análise física de suportes.
- Checksums e metadados completos serão reproduzíveis pelo scanner `bestiary:scan`; o relatório editorial evita publicar caminhos privados ou hashes como URLs.
