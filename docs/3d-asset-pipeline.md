# 3D asset pipeline

## Stages

1. Preserve the sculpt/master in immutable source storage.
2. Scan and checksum the source in dry-run mode.
3. Associate the asset with a canonical creature and realm; review every unmatched file.
4. Validate manifold geometry, normals, scale, minimum wall thickness, multipart keys, drainage, base, and naming.
5. Produce a print master (STL/LYS) and record printer, resin, layer height, supports, volume, time, and physical result.
6. Produce a separate, optimized GLB for the web. Never expose the high-poly master.
7. Publish only reviewed derivatives, record checksum/version, then link the public URL in the CMS.

`printStatus=validated` requires a completed physical print. `supportStatus=validated` requires reviewed supports and a successful print. Unknown values must stay unknown; estimates are not validation.

## Directory convention

`bestiary/<realm>/<creature>/{hero,models,gallery}/<normalized-file>`

Original files are never renamed or moved. An import creates copies only after review, writes a manifest before copying, uses exclusive creation, and refuses path traversal or overwrite.

## Security and performance

- Public URLs accept site-relative paths or HTTPS only.
- Drive paths, UNC paths, `file:` URLs, traversal, and HTTP are rejected.
- The Three.js viewer is client-only and its libraries/model load after explicit interaction.
- A static image is always the default; reduced motion disables damping.
