# Arquitetura do Canon

```mermaid
flowchart LR
  A[Adaptadores editoriais] --> C[Canonical Registry 1.1]
  C --> G[Knowledge Graph por UUID]
  C --> M[CMS e validação]
  C --> P[API Canon]
  P --> D[APIs derivadas]
  C --> U[Experiências do site]
```

## Camada semântica

O Canon alimenta `GraphBuilder`, que normaliza relações e herança em memória. `GraphCache` pré-processa o DTO; `GraphService` fornece busca e travessia limitada; APIs, CMS, site e o futuro adaptador de IA consomem exclusivamente esses serviços.

O registro cria UUIDs determinísticos a partir do tipo ontológico e slug. Aliases apontam para a identidade, relações usam IDs e todas as projeções mantêm compatibilidade com os slugs públicos.
