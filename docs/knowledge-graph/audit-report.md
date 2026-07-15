# Auditoria do Knowledge Graph — Sprint Semântica

## Resultado

- 142 entidades canônicas analisadas.
- 305 relações semânticas deduplicadas.
- 0 loops.
- 0 referências órfãs.
- 6 entidades isoladas: `six-crowns`, `brotherhood-of-hunters`, `company-of-explorers`, `artisans-guild`, `merchants-guild` e `order-of-chroniclers`.

As entidades isoladas não receberam vínculos inventados. Elas permanecerão isoladas até que o Canon registre relações explícitas.

## Relações corrigidas

Relações genéricas do Canon foram tipadas e receberam peso, descrição, importância e proveniência. Vínculos de coleção, reino, artefato, aliança, inimizade, participação e causalidade foram derivados exclusivamente dos campos canônicos existentes. Duplicatas por origem, tipo e destino foram eliminadas.

## Herança

Reino, cultura, paleta, materiais, afinidade, clima e identidade visual são herdados quando comprováveis. Contexto econômico e alinhamento político permanecem nulos por ausência de dados canônicos explícitos.

## Produção

O deployment `dpl_EpaWMbX3hgMZPkhPm1MjJ9nMN9ua` está READY. As APIs semânticas responderam HTTP 200 no domínio canônico. O CMS permanece bloqueado pela configuração externa: o projeto não possui `ADMIN_USER`, `ADMIN_PASSWORD` nem armazenamento persistente de escrita; todas as rotas administrativas, inclusive as anteriores à sprint, respondem 503 por desenho de segurança.

## Testes

- ESLint: aprovado.
- TypeScript: aprovado.
- Vitest: 60/60, 17 arquivos.
- Build: aprovado, 163 páginas.
- Playwright semântico: 2/2 cenários percorridos sem falha; o processo de web server não encerrou automaticamente.

## Próximos passos

1. Configurar credenciais administrativas na Vercel.
2. Provisionar armazenamento persistente para mutações do CMS.
3. Após a configuração, redeploy e smoke test autenticado de criar, editar e restaurar relação.
4. Somente relações futuras aprovadas no Canon devem conectar as seis entidades isoladas.
