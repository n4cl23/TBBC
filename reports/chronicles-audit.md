# Chronicles of Asterheim — content audit

Generated: 2026-07-17T19:56:36.779Z

## Scope and safeguards

- Read-only scan of `C:\Users\Janderson Santos\Desktop\Chronicles of Asterheim`; no source files were opened for mutation, copied, renamed or deleted.
- No CMS, Preview database, migration, Canon import or Production action was performed.
- Canon comparison uses `src/data/canon-registry.ts` (Canon 1.1.0). A path/name match is **not** proof of canonical approval.

## Evidence

- Files: **639**
- Size: **28657.14 MB**
- Entity groups: **129**
- Canonical identities matched by source path: **87/142**
- Candidate groups without canonical identity: **42**
- Conflict or duplicate groups: **12**
- Orphan-source files: **85**

## Bestiary binary dry-run

The existing non-destructive scanner was executed against `Beasts of Asterheim` after the inventory scan: **319** files / **16823.71 MB**; 319 valid, 0 invalid; 102 canonical creature-asset matches across 34 creatures; 217 unmatched files; 0 duplicate checksum groups. It was dry-run only and wrote no source or destination assets.

## Entity assessment

| Entity | Category | Origin | Realm | Exists | State | Assets available | Assets absent | Languages | Conflicts | Recommended action |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| aegis | character | 5 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| ancient-wolf | creature | 3 files | elder-forest | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| artisans-guild | faction | 19 files | — | yes | EXISTS_MISSING_MEDIA | document, model, image | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| ash-demon | creature | 3 files | scorched-wastes | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| aster | character | 4 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| aster-vhal-o-arquivista-das-seis-coroas | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| asterheim-atlas-das-criaturas-conceitos | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| bestiario-oficial-de-asterheim | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | version-like-suffix | Create no entity. Request editorial identity and provenance review. |
| black-banner-company | faction | 2 files | — | yes | EXISTS_MISSING_MEDIA | image, model | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| black-fang-mercenary | character | 4 files | — | yes | EXISTS_COMPLETE | image, model, document | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| borgrath-o-guardiao-das-correntes | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| borin-stonebrew | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| boris | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| brakk-stonehide | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| broken-mug-tavern | collection | 8 files | — | yes | EXISTS_MISSING_MEDIA | image, model | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| brotherhood-of-hunters | faction | 48 files | — | yes | CONFLICT | image, model, video | — | unknown | version-like-suffix, same-normalized-name-group | Do not overwrite canonical asset; select version only after review. |
| cave-troll | creature | 3 files | ironhold | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| chefes-secundarios-de-asterheim-volume-i | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| company-of-explorers | faction | 22 files | — | yes | EXISTS_MISSING_MEDIA | model, image, document | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| coral-titan | creature | 3 files | kingdom-of-the-abyss | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| crystal-bear | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| deep-horror | creature | 3 files | kingdom-of-the-abyss | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| demon-fogo | creature | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | creature-without-safe-realm-match | Create no entity. Request editorial identity and provenance review. |
| dryad | creature | 3 files | elder-forest | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| durgan | character | 10 files | — | yes | CONFLICT | model, image, document, binary | — | unknown | version-like-suffix | Do not overwrite canonical asset; select version only after review. |
| elder-forest | realm | 46 files | elder-forest | yes | EXISTS_COMPLETE | model, image, document | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| elias | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| elias-crow | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| ember-tick | creature | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | creature-without-safe-realm-match | Create no entity. Request editorial identity and provenance review. |
| ent | creature | 3 files | elder-forest | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| fenrir | character | 3 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| finn-coppercoin | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| fire-drake | creature | 3 files | scorched-wastes | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| forest-spirit | creature | 3 files | elder-forest | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| forge-beast | creature | 3 files | ironhold | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| frost-drake | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| frost-kingdom | realm | 21 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| frost-mammoth | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| frost-troll | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| gerhard-blackwolf | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| grukk-iron-mug | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| ice-giant | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| ice-wolves | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| irmandade-dos-cacadores-de-asterheim | faction | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| iron-bull | character | 4 files | — | yes | EXISTS_COMPLETE | image, model, document | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| iron-golem | creature | 3 files | ironhold | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| iron-hold-map | unknown | 1 files | — | no | NEW_INCOMPLETE | image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| iron-tankard-waitress | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| ironhold | realm | 34 files | ironhold | yes | CONFLICT | model, image, document | — | unknown | same-normalized-name-group | Do not overwrite canonical asset; select version only after review. |
| kaelor-grimm-o-rastreador-das-sombras | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| king-aldric | character | 2 files | — | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| kingdom-of-the-abyss | realm | 27 files | kingdom-of-the-abyss | yes | EXISTS_MISSING_MEDIA | model, image, document | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| kraken | creature | 3 files | kingdom-of-the-abyss | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| lava-drake | creature | 3 files | ironhold | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| leao-de-escoria | unknown | 6 files | — | no | NEW_INCOMPLETE | binary, model, video, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| leao-de-escoria-boss-secundario-ironhold | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | version-like-suffix | Create no entity. Request editorial identity and provenance review. |
| legends-of-the-realm | collection | 4 files | — | yes | EXISTS_MISSING_MEDIA | video, image, model | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| leviathan | creature | 3 files | kingdom-of-the-abyss | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| lightning-serpent | creature | 3 files | stormreach | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| lyra | character | 2 files | — | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| madre-elyndra-guardia-dos-altares | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| maelwen-a-matriarca-dos-espinhos | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| magma-titan | creature | 3 files | scorched-wastes | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| material-de-divulgacao-pt-br | unknown | 2 files | — | no | NEW_INCOMPLETE | image | — | pt-br | — | Create no entity. Request editorial identity and provenance review. |
| material-de-divulgacao-pt-br-1 | unknown | 1 files | — | no | NEW_INCOMPLETE | image | — | pt-br | — | Create no entity. Request editorial identity and provenance review. |
| material-de-divulgacao-pt-br-2 | unknown | 1 files | — | no | NEW_INCOMPLETE | image | — | pt-br | — | Create no entity. Request editorial identity and provenance review. |
| mercadores-de-asterheim | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| merchants-guild | faction | 18 files | — | yes | EXISTS_MISSING_MEDIA | model, image | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| mira-solenne-mensageira-da-ultima-bandeira | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| morwen | character | 4 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| moss-colossus | creature | 3 files | elder-forest | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| nhalor-o-sacerdote-da-coroa-afogada | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| nimbus-spirit | creature | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | creature-without-safe-realm-match | Create no entity. Request editorial identity and provenance review. |
| npcs-de-asterheim-volume-i-revisado | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| old-bran | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| old-garrick | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| order-of-chroniclers | faction | 16 files | — | yes | EXISTS_MISSING_MEDIA | document, model, image | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| orun-veyr-o-profeta-do-trovao | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| phoenix | creature | 3 files | scorched-wastes | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| rat-king | character | 6 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| red-viper | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| rowan | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| sand-worm | creature | 3 files | scorched-wastes | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| scorched-wastes | realm | 28 files | scorched-wastes | yes | EXISTS_COMPLETE | model, image, document | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| sea-serpent | creature | 3 files | kingdom-of-the-abyss | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| seris-vale-a-cartografa-errante | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| silent-ash | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| sir-aldren | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| six-crowns | collection | 2 files | — | yes | EXISTS_MISSING_MEDIA | image | — | unknown | — | Canonical identity exists but no repository asset match was evidenced; verify before adding a draft asset. |
| skara-a-cacadora-palida | unknown | 4 files | — | no | NEW_INCOMPLETE | model, video, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| sky-whale | creature | 3 files | stormreach | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| skywind | character | 3 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| snow-wraith | creature | 3 files | frost-kingdom | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| stone-giant | creature | 3 files | ironhold | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| storm-dragon | creature | 3 files | stormreach | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| storm-griffin | creature | 3 files | stormreach | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| stormreach | realm | 31 files | stormreach | yes | EXISTS_COMPLETE | model, image, document | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| tavern-mimic | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| tempest-hawk | creature | 3 files | stormreach | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| tempest-owl | creature | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | creature-without-safe-realm-match | Create no entity. Request editorial identity and provenance review. |
| thalassor | creature | 4 files | — | no | NEW_INCOMPLETE | model, image, video | — | unknown | creature-without-safe-realm-match | Create no entity. Request editorial identity and provenance review. |
| the-ancient-giant | character | 5 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| the-black-banner-bestiary-chainmaw-vol1 | creature | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-07-iron-wyrm | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-08-forge-sentinel | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-09-molten-guardian | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-09-molten-guardian-1 | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-10-crystal-ram | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-11-iron-boar | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-12-ash-wolf | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-13-rock-burrower | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-14-tunnel-reaper | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-15-ore-leech | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-16-ember-tick | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-black-banner-ironhold-17-obsidian-colossus | document | 1 files | — | no | ORPHAN_ASSET | document | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| the-demon-prince | character | 4 files | — | yes | EXISTS_COMPLETE | image, model, video | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| the-fallen-king | character | 3 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| the-forest-guardian | character | 3 files | — | yes | EXISTS_COMPLETE | video, image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| the-iron-colossus | character | 6 files | — | yes | EXISTS_COMPLETE | image, model, video, archive | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| the-kraken-caller | character | 7 files | — | yes | EXISTS_COMPLETE | image, model, video | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| the-last-dragon-slayer | character | 6 files | — | yes | CONFLICT | video, image, model, binary | — | unknown | version-like-suffix | Do not overwrite canonical asset; select version only after review. |
| the-white-dragon | character | 4 files | — | yes | EXISTS_COMPLETE | image, model, video | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| thunder-golem | creature | 3 files | stormreach | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| treant-elder | creature | 3 files | elder-forest | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| vaelor | character | 5 files | — | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| varkhaz-o-carrasco-das-cinzas | unknown | 3 files | — | no | NEW_INCOMPLETE | model, image | — | unknown | — | Create no entity. Request editorial identity and provenance review. |
| varkhul | creature | 4 files | — | no | NEW_INCOMPLETE | model, image, video | — | unknown | creature-without-safe-realm-match | Create no entity. Request editorial identity and provenance review. |
| vhaldris | character | 2 files | — | yes | EXISTS_COMPLETE | image, model | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |
| yggor | character | 2 files | — | yes | EXISTS_COMPLETE | model, image | — | unknown | — | Existing canonical record has source-model candidates; keep source-only until provenance and delivery review. |

### By extension

| Value | Count |
| --- | ---: |
| .png | 212 |
| .stl | 193 |
| .glb | 145 |
| .pdf | 31 |
| .mp4 | 26 |
| .svg | 11 |
| .jpg | 8 |
| .gif | 5 |
| .3mf | 2 |
| .zip | 1 |
| .jpeg | 1 |
| .exe | 1 |
| .winmd | 1 |
| .cfgx | 1 |
| .cxdlpv4 | 1 |

### By category

| Value | Count |
| --- | ---: |
| creature | 41 |
| character | 38 |
| document | 18 |
| unknown | 16 |
| faction | 7 |
| realm | 6 |
| collection | 3 |

### By realm

| Value | Count |
| --- | ---: |
| unknown | 89 |
| frost-kingdom | 8 |
| elder-forest | 7 |
| stormreach | 7 |
| scorched-wastes | 6 |
| ironhold | 6 |
| kingdom-of-the-abyss | 6 |

### By status

| Value | Count |
| --- | ---: |
| EXISTS_COMPLETE | 74 |
| NEW_INCOMPLETE | 22 |
| ORPHAN_ASSET | 20 |
| EXISTS_MISSING_MEDIA | 9 |
| CONFLICT | 4 |

### By language signal

| Value | Count |
| --- | ---: |
| unknown | 635 |
| pt-br | 4 |

### By readiness

| Value | Count |
| --- | ---: |
| existing | 83 |
| blocked | 24 |
| new | 22 |

## Interpretation

All model, video and ambiguous-version assets remain source-only. NEW_READY is intentionally not assigned from filenames alone: provenance, canonical identity, usable derivatives and editorial approval are required.
