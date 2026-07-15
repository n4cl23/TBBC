# Persistência do CMS

Todas as mutações usam transação, revisão otimista (`expectedVersion`) e trilha de auditoria com ator, IP, request ID, operação e diferenças de campos. Exclusão editorial é arquivamento lógico. Conflitos de edição retornam HTTP 409 e exigem recarga do registro.

Em produção, o CMS consulta somente PostgreSQL. O filesystem local e os JSON históricos não são graváveis. Uploads exigem um storage de objetos externo; o banco armazena chave, URL, checksum, dimensões, MIME e variantes.

