# Inventário de mídias não versionadas

Data: 17/07/2026  
Escopo: arquivos de mídia retornados por `git ls-files --others --exclude-standard`. Artefatos ignorados de build (`.next/`) e dependências não são assets e ficaram fora do inventário.

## Resultado

- Arquivos não versionados classificados: **5/5**.
- Itens Canon: **0**.
- Itens Assets: **1**.
- Itens Temporary: **1**.
- Itens Discard: **3**.
- GLB, glTF, STL e PDF não versionados: **0**.
- Nenhuma mídia foi movida, apagada, convertida ou adicionada ao Git.

## Inventário completo

| Arquivo | Tipo | Metadados | Classificação | Justificativa |
| --- | --- | --- | --- | --- |
| `public/images/bestiary/beasts-hero.mp4` | Vídeo MP4 | 5.146.033 bytes; par do GIF de 640×360 | **Assets** | Fonte de movimento candidata para o banner do bestiário. O nome é consistente; não há referência de vídeo publicada. Manter até uma decisão editorial/técnica de uso e, se aprovado, versionar em nome definitivo. |
| `public/images/bestiary/beasts-hero.gif` | GIF animado | 640×360; 8.878.276 bytes | **Discard** | Derivado pesado do mesmo conjunto visual do banner; não há referência a `.gif` no código. O projeto já publica `beasts-hero.webp` para a experiência estática. Não deve entrar no bundle público. |
| `public/images/bestiary/Vídeo sem título.mp4` | Vídeo MP4 | 7.523.655 bytes; par do GIF de 640×360 | **Temporary** | Conteúdo visual de Varkhul, mas nome genérico e nenhuma referência de vídeo. Preservar apenas como fonte temporária até ser renomeado, atribuído a uma criatura e aprovado; não publicar nem versionar no estado atual. |
| `public/images/bestiary/Vídeo sem título.gif` | GIF animado | 640×360; 10.861.341 bytes | **Discard** | Derivado GIF com nome genérico e sem referência. O primeiro quadro coincide com a composição de Varkhul já coberta por imagem WebP versionada; não é um formato de entrega aprovado. |
| `public/images/bestiary/varkhul-field-record.jpeg` | Imagem JPEG | 2048×1152; 619.965 bytes | **Discard** | Duplicata visual da imagem pública versionada `varkhul-field-record.webp` (274.360 bytes), que já é referenciada pelo bestiário. A versão WebP é a derivada de publicação. |

## Evidências de uso

- O código referencia `public/images/bestiary/beasts-hero.webp` em páginas e componentes do bestiário; não referencia os arquivos `.gif` ou `.mp4` não versionados.
- `src/data/bestiary.ts` referencia `varkhul-field-record.webp`; o JPEG não versionado reproduz a mesma composição visual.
- Inspeção visual confirmou que `beasts-hero.gif` é a cena escura do banner de criatura e que `Vídeo sem título.gif` mostra Varkhul em cenário nevado.
- Não existe referência de vídeo no código para os dois MP4s. Ferramenta de metadados MP4 não estava disponível no ambiente, portanto duração, codec e faixa de áudio permanecem não aferidos.

## Integridade

| Arquivo | Modificado em | SHA-256 |
| --- | --- | --- |
| `beasts-hero.gif` | 2026-07-13 20:23:59 | `9F83AC2A5033EC99D65E6439E5B15C3E68F11E278FF3C6756B683480540F0792` |
| `beasts-hero.mp4` | 2026-07-13 20:23:36 | `55005DC1948EFD9B41CBBA0E0E198221066E04A7632E3AC9A5502AF0EA5202A0` |
| `varkhul-field-record.jpeg` | 2026-07-13 20:49:09 | `7F6E180C7E32FED158643E98BCF2CAEE040407306C620D87D2B4091877818AA3` |
| `Vídeo sem título.gif` | 2026-07-13 20:54:13 | `9A326B339E18194B9CF1857C0DA5324D9683C3411BC9ECC3484CF0E40E69669B` |
| `Vídeo sem título.mp4` | 2026-07-13 20:53:32 | `2534A408BB64BC51BE28621DC10E6E5DA8B9E6E2EC6A2AC09C67C0D9F8981F44` |

## Política aplicada

- **Canon**: somente mídia explicitamente vinculada a uma entidade/registro canônico e aprovada como fonte de verdade. Nenhum arquivo não versionado satisfaz essa regra.
- **Assets**: fonte útil, identificada e candidata a versionamento após aprovação.
- **Temporary**: fonte potencial sem nome, vínculo editorial ou destino de publicação definidos.
- **Discard**: derivado redundante, formato não adotado ou conteúdo já coberto por asset versionado. A classificação não executa exclusão; remoção física exige autorização posterior.

## Próxima decisão necessária

1. Aprovar ou descartar `beasts-hero.mp4` como fonte oficial de animação.
2. Renomear e atribuir `Vídeo sem título.mp4` ou autorizar seu descarte.
3. Após essa decisão, excluir somente os três itens marcados **Discard** e manter o inventário como registro.
