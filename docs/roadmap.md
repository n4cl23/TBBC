# Roadmap

## Sprint 4

- Migrar `cms.json` para PostgreSQL com migração dos registros e versões.
- Implementar autenticação Auth.js, papéis editor/revisor/admin e sessões auditáveis.
- Trocar uploads locais por Vercel Blob ou storage S3 compatível.
- Criar formulários tipados por entidade, substituindo o editor JSON avançado.
- Adicionar crop não destrutivo, tags e movimentação de mídia.
- Conectar entidades publicadas restantes ao repositório CMS público.
- Adicionar favoritos persistentes, preview isolado e workflow de aprovação.
- Executar Lighthouse CI e regressão visual por baseline aprovada.

## Sprint 5

- Executar migração homologada para PostgreSQL e importar JSON com relatório de reconciliação.
- Ativar Auth.js com papéis Administrador, Editor, Artista, QA e Leitor.
- Implementar Vercel Blob com fallback S3 e migração dos uploads locais.
- Criar editor de blocos tipado para lore e formulários específicos por entidade.
- Adicionar relações editáveis no grafo, zoom/pan avançado no mapa e timeline cruzada.

## Riscos conhecidos

JSON local não oferece transações nem bloqueio distribuído. Rate limit em memória funciona por instância e deve migrar para Redis/KV. Basic Auth é provisório e não substitui autenticação baseada em sessão e papéis.
# Sprint 7 — Marketplace Hub

- CMS de marketplaces, anúncios e histórico de preços.
- Catálogo público multicanal, ofertas por personagem e progressão de coleções.
- SEO Product/Offer, moedas internacionais, badges e links externos seguros.
- Arquitetura preparada para adaptadores, sem sincronização externa nesta etapa.

# Próxima evolução

- Persistir os novos modelos no PostgreSQL de produção e migrar os registros seed.
- Criar credenciais e adaptadores isolados por marketplace.
- Adicionar fila de sincronização, retentativas, webhooks e observabilidade.
- Comparar preço, downloads e avaliação remotos antes de aplicar alterações no CMS.

# Próxima Sprint — Atlas Vivo

- Arte panorâmica exclusiva e otimizada por Reino.
- Rotas internas para locais, fortalezas, ruínas e templos.
- Bestiário e artefatos como entidades públicas navegáveis.
- Filtros territoriais reais no CMS para personagens e eventos.
- Otimização de LCP, entrega de imagens e estabilidade visual dos heroes.
