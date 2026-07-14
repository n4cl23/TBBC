# Creature asset importer

The scanner is non-destructive by default.

```powershell
npm.cmd run bestiary:scan -- --source "C:\path\to\Beasts of Asterheim" --dry-run
```

It recursively hashes files with SHA-256, validates signatures/basic binary lengths, classifies supported formats, suggests canonical creature/realm associations, detects identical checksums, and prints unmatched files. Dry-run writes nothing.

An approved copy operation requires both flags:

```powershell
npm.cmd run bestiary:import -- --source "C:\path\to\Beasts of Asterheim" --destination "C:\reviewed\destination" --apply
```

Apply mode creates a timestamped JSON manifest first and copies with exclusive creation. It never deletes, moves, renames, or overwrites originals. Review the manifest, unmatched entries, validation notes, realm aliases, and destination capacity before approval. Do not point `--destination` at `public` until web derivatives have passed optimization and publication review.

The current approved taxonomy recognizes 34 creatures. Aegis, Aster, Fenrir, and Skywind remain unmatched by design because they belong to the legacy legendary set.
