# Relações semânticas

O contrato contém `id`, `source`, `target`, `relationType`, `weight`, `description`, `status`, `timelineEvent`, `startEra`, `endEra`, `importance` e `canonical`.

Somente UUIDs canônicos são aceitos. Relações são deduplicadas por origem, tipo e destino. O CMS expõe relações no World Database, com histórico, aliases, busca e validação de peso e loops.

Tipos suportados incluem RULES, PROTECTS, PARTICIPATED, ALLY, ENEMY, LOCATED_IN, USES, MEMBER_OF, HABITAT_IN, BOUND_TO, PRECEDES, CAUSED e os demais tipos reservados pelo contrato.
