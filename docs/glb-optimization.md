# GLB web optimization

The audited GLBs are 66–75 MiB and roughly 1.9 million triangles each. They are masters, not web deliverables.

## Target derivative

- Preserve silhouette first; target roughly 80k–200k triangles for hero inspection and less for cards/mobile.
- Bake high-poly detail into normal/ambient-occlusion maps.
- Use 1K–2K textures according to screen contribution, combine channels where appropriate, and remove unused nodes/materials/animations.
- Apply mesh compression (Meshopt is preferred for broad web use) and KTX2/Basis textures when the visual comparison passes.
- Center the model, use a predictable Y-up orientation and metric scale, and retain a stable camera-friendly bounding box.
- Validate in desktop and representative mobile GPUs before assigning `publicGlbUrl`.

Example review flow (tool versions must be pinned in CI before adoption): inspect → deduplicate/prune → simplify → texture compress → mesh compress → validate → visual diff → publish derivative. Keep the master checksum and derivative checksum as different `CreatureAsset` versions.

The viewer intentionally has no master fallback. If an optimized GLB is absent, it displays the render and an honest unavailable message.
