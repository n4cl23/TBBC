# Knowledge Graph de Asterheim

O grafo semântico é uma projeção imutável do Canon 1.1. Ele não cria fatos: transforma campos e relações canônicas existentes em nós enriquecidos e relações tipadas por IDs.

O pipeline é `Canon Registry → GraphBuilder → GraphCache → GraphService → API/Site/CMS`. A travessia é iterativa, possui profundidade máxima 3 e conjunto de visitados, evitando recursão infinita.

## Auditoria

O relatório executável está em `GET /api/graph`, no campo `stats`. Testes verificam UUIDs duplicados, endpoints órfãos, loops, peso e limites. Entidades isoladas permanecem visíveis na métrica e não recebem relações artificiais.
