# Rollback

Código: use `vercel rollback <deployment-anterior>` para restaurar imediatamente o alias. Banco: migrações são roll-forward; restaure primeiro o backup criptografado ou um branch Neon em ambiente isolado, execute `npm run db:integrity` e somente então promova a correção.

Para recuperar o dump automático: baixe o artifact autorizado, descriptografe com `gpg --decrypt`, restaure em branch novo com `pg_restore --clean --if-exists --no-owner` e valide 142 entidades/305 relações. Nunca restaure diretamente sobre Main sem janela aprovada.

