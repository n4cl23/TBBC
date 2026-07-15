# Backup e restauração

Antes de mudanças destrutivas, crie um branch/backup no painel Neon e registre seu identificador no chamado de mudança. Restaure primeiro em um branch isolado, execute `npm run db:integrity` e somente então promova. A restauração editorial pelo CMS cria uma nova versão; nunca sobrescreve o histórico.

