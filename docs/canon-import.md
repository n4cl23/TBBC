# Importação do Canon 1.1.0

O importador `scripts/canon-db.ts` é repetível e transacional. Ele valida a fonte antes de abrir a transação, usa UUIDs estáveis, faz upsert de entidades, papéis, aliases e relações, e grava versão e snapshot com SHA-256.

Comandos: `npm run db:canon:dry-run`, `npm run db:canon:import` e `npm run db:canon:verify`. A verificação falha se as contagens não forem exatamente 142/305 ou se houver UUIDs duplicados, órfãos ou loops.

