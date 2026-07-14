# Bestiary domain

The official Bestiary contains 34 creatures in six realms. Its canonical taxonomy lives in `src/data/creatures.ts`; public routes live under `/[locale]/atlas/creatures`.

## Publication states

- `concept`, `art-review`, `modeling`, `print-review`: production states, never evidence of a sale-ready asset.
- `ready`: editorial record is complete, but publication and technical verification may still be pending.
- `published`: public release approved.
- `archived`: retained for history and CMS versions.

Source availability (`imageSourceAvailable`, `glbSourceAvailable`, `stlSourceAvailable`) is deliberately separate from public availability (`publicGlbUrl`, public `CreatureAsset`). Local paths must never be rendered, serialized into public pages, or emitted in metadata.

Every creature has localized name, epithet, summary, lore, origin, behavior, habitat, diet, abilities, weaknesses, SEO fields, alt text, and captions in `pt-BR`, `en`, and `es`. Realm, Guardian, Crown, locations, assets, print profile, and marketplace state are relational fields.

The four legacy legendary entities Aegis, Aster, Fenrir, and Skywind are outside the 34-creature taxonomy. They remain preserved in the existing Bestiary experience.

## Known editorial/art review

- Lightning Serpent remains `art-review`: its current composition intersects the central rock and needs a new silhouette pass.
- Kraken and Leviathan should receive a final silhouette/print-readability review.
- Ice Wolves source art depicts one wolf despite the plural record name.

See [bestiary-assets-audit.md](./bestiary-assets-audit.md) for the read-only source inventory.
