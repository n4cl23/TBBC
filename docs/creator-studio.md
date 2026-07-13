# Creator Studio

O Creator Studio é a camada operacional do World Engine. Ele conecta o ciclo de produção de cada personagem aos módulos já existentes de lore, mídia, prompts, arquivos 3D, impressão e auditoria.

## Fluxo de produção

O pipeline padrão possui 17 etapas: ideia, pesquisa, lore, conceito, prompt, modelagem, escultura, revisão, render, multipart, teste STL, suportes, Lychee, impressão, pintura, fotos e publicação. A ordem é configurável no modelo de dados; cada etapa aceita status, responsável, prazo, notas, arquivos e checklist.

## Workspace

`/admin/creator-studio` oferece uma visão por personagem com resumo, pipeline e acessos contextuais para Lore, Arte, Prompt, Arquivos, STL, Impressão, Galeria, Versões, Timeline, Relacionamentos e Downloads. Os editores existentes continuam sendo a fonte de edição, evitando duplicação de componentes.

## Dados e evolução

O schema Prisma inclui `ProductionProject`, `ProductionStage`, `PrintValidation` e `Release`. Esses modelos preparam a persistência PostgreSQL sem remover o fallback JSON atual. Integrações de marketplace permanecem desacopladas: futuras publicações devem usar adaptadores de canal e nunca acoplar regras externas ao domínio de produção.

## Segurança e auditoria

Toda mutação deve passar pelas rotas administrativas existentes, preservando validação de entidade, histórico versionado e logs de auditoria. Uploads devem manter a política atual de MIME, tamanho, nomes seguros e processamento com Sharp.
