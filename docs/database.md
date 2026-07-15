# PostgreSQL do CMS

O PostgreSQL Neon é a fonte única de verdade do CMS. Entidades canônicas ficam em `WorldEntity`; relações em `SemanticRelation`; mídias em `MediaAsset`, `MediaVariant` e `MediaRelation`; versões e auditoria são imutáveis. Os arquivos em `src/data` são fonte de importação e fallback apenas no desenvolvimento, nunca persistência de produção.

O Canon 1.1.0 possui invariantes obrigatórios: 142 entidades, 305 relações semânticas, UUID canônico único, nenhuma relação órfã, duplicada ou autorreferente.

