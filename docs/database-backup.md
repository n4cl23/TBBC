# Backup e restauração

Antes de mudanças destrutivas, crie um branch/backup no painel Neon e registre seu identificador no chamado de mudança. Restaure primeiro em um branch isolado, execute `npm run db:integrity` e somente então promova. A restauração editorial pelo CMS cria uma nova versão; nunca sobrescreve o histórico.

O workflow `Encrypted Database Backup` executa diariamente, usa `DATABASE_URL_UNPOOLED`, gera um dump customizado, cifra com AES-256 e mantém o artifact por 14 dias. O secret `BACKUP_ENCRYPTION_KEY` deve existir somente no environment GitHub `production` e ser custodiado fora do repositório.
