# Creature Atlas

## Public experience

- `/[locale]/atlas/creatures`: searchable/filterable archive by realm, category, threat, production state, STL/GLB source presence, and marketplace availability.
- `/[locale]/atlas/creatures/[slug]`: narrative record with lore, behavior, habitat, abilities, weaknesses, world relations, technical status, creative prompt, marketplace state, related creatures, and opt-in 3D viewer.

All 34 detail pages are statically parameterized and included in the localized sitemap. Each page provides canonical/hreflang metadata, Open Graph/Twitter data, `CreativeWork` JSON-LD, and breadcrumbs. Marketplace data can graduate to `Product` only when a genuine public offer with URL, price, currency, and availability exists.

## CMS

`/admin/creatures` exposes the existing versioned generic editor and a coverage dashboard. The seed integrates with the existing audit/version repository. Translatable fields are declared in `localized-content.ts` and `translation.ts`; current EN/ES seed translations are preserved by `withEditorialTranslations`.

## Accessibility/performance

Filters use native labels/selects/checkboxes and announce result count. Cards and relations are keyboard links. The 3D canvas is keyboard-focusable (arrow keys rotate, Home resets), touch orbit is native, and fullscreen is user-triggered. No Three.js code or GLB is requested during normal page load. At narrow widths filters and records become a single reading column; motion is suppressed with `prefers-reduced-motion`.
