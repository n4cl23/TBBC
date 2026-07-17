# Chronicles import plan — approval required

## Global gate

**No import was executed.** Do not publish to CMS, copy assets, change Canon, run migrations or connect to Production until every selected item has explicit approval.

## Batch 1 — static derivatives with canonical identity

- Scope: canonical entities with a single approved image source and no conflict.
- Files: selected image assets only; generate derivatives outside `public` first.
- Risk: wrong visual association or implicit lore change.
- Rollback: remove only newly copied review artifacts by manifest; no overwrite permitted.
- Tests: filename/slug validation, image readability, existing bestiary media validation, localized route check.
- Acceptance: provenance approved, target slug canonical, no existing asset overwritten, status remains draft/review.

## Batch 2 — structured textual content and relations

- Scope: only records with supplied text, explicit provenance and approved canonical relationship references.
- Risk: unauthorized lore, translation regression or graph orphan.
- Rollback: CMS version restore or delete of a new draft only; Canon unchanged unless governance approves.
- Tests: Canon dry-run, graph validation, slug uniqueness, translation completeness.
- Acceptance: reviewer approval and zero orphan relations.

## Batch 3 — heavy models and video

- Scope: approved STL/GLB/MP4 assets with format, licensing and web-delivery review.
- Risk: repository bloat, unreadable binaries, performance and unsupported runtime storage.
- Rollback: delete newly uploaded object through its manifest; do not remove source files.
- Tests: binary signature/readability, optimized web derivative, storage access control, page performance.
- Acceptance: Blob/S3 destination approved, immutable source manifest stored, no large source binary committed directly to Git.

## Batch 4 — conflicts and new identity proposals

- Scope: entries in `chronicles-conflicts.md` and `chronicles-orphan-assets.md`.
- Risk: Canon divergence.
- Rollback: not applicable before approval; this batch starts with a governance decision, not an import.
- Tests: narrative/technical approval, Canon diff review, aliases where a slug changes.
- Acceptance: explicit Canon governance approval.
