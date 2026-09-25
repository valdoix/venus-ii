# VENUS 2.0

VENUS 2.0 is a portrait-first maximalist theme library and live customizer for Lumiverse. It ships 49 native theme families: the nine founding worlds, eighteen medieval/fantasy/futuristic atlas worlds, the ten-world maximalist expansion, and the twelve-world Playhouse expansion (playful, couture, uncanny, and retro-future). Every family has its own light and dark artwork, not just a recoloured palette.

## What it provides

- Dedicated light and dark skins, following Lumiverse automatically unless overridden.
- Minimal and Bubble styling. Minimal uses a large portrait and one moving light strip. Bubble uses a large central portrait flanked by fixed, square-cornered rectangular panels whose interior art animates independently.
- A landmark backdrop per theme (a skyline, shopfront, coast or palace pinned to the bottom of the screen) over animated ambient layers, with system, full, reduced, and off motion policies.
- Theme-specific portrait shapes, plaques and typefaces, with customizer overrides for shape, fit, size, and lower fade across both message variants.
- Typography controls: bundled reading faces, any Google Fonts family by name, custom font stacks, optional display-only curly quotation marks, alignment, scale, line height, tracking, and content width.
- A compact drawer and a full Customizer Studio with library search, per-surface controls, profiles, reset, and JSON export/import.

## Profiles

A profile stores every shared setting: fonts, text size and spacing, alignment, curly quotes, portrait width, shape, fit and fade, motion, animated background, material opacity, skin, scope, font source and Google Fonts picks. Save one in Customizer Studio → Profiles, or pick one from **Tuning profile** in the drawer.

The selected profile stays active on every theme until you pick "None", stop using it, or reset. While it is active, changes on the shared "All themes" layer are saved into the profile. Resetting that layer returns to the defaults and stops using the profile; the profile itself is kept. Per-family and per-mode overrides still apply on top of a profile.

The default portrait width is 260 px. Settings that still had the old 320 px default are moved to 260 px; any other width is kept.

## Fonts

Every theme typeface is bundled (Latin subset, see [FONTS.md](FONTS.md)), so themes look right offline. Customizer Studio → Typography → **Font source** switches between:

- **Bundled**: the default. Nothing is downloaded.
- **Google Fonts**: theme faces load from fonts.google.com with every script and true italics. System fonts stand in while offline.
- **System fonts only**: no web fonts at all.

A body or display typeface can also be any Google Fonts family entered by name; it always loads from Google Fonts.

Only the active theme's families are decoded and registered, on first use.

## Performance notes

- Ambient backgrounds are real layers (`[data-venus2-backdrop]`), one element per background layer. The authored `background-position` motion is converted to an equivalent `translate` at build time (`src/css/backdrop.ts`), so background animation never repaints. Animating `background-position` on viewport-sized layers halved the frame rate in Lumiverse's embedded browser.
- Theme CSS and tuning CSS are separate style elements, and each is only replaced when its text changes, so dragging a slider does not re-parse the theme art.
- New messages are decorated incrementally from mutation records rather than by rescanning the chat, and curly quotes only reprocess the message that changed.
- Message cards only blur what is behind them when the material opacity is below 0.9.

## Theme authoring

Add one typed module under `src/themes/` that satisfies `VenusThemeFamily`, then register it in `src/themes/index.ts`. Families built with `world()` from `src/themes/kit.ts` paint their art as a function of palette ink, rendered once per skin: `art` is the dark artwork and `lightArt` the dedicated light artwork, including wing scenes and the `landmark()` backdrop composition.

The founding nine are in `src/themes/founding.ts`; the eighteen-world atlas in `src/themes/atlas-realms.ts` and `src/themes/atlas-futures.ts`; the ten worlds in `src/themes/ten-worlds.ts`; the Playhouse twelve in `src/themes/playhouse.ts`.

Rules the tests enforce: no `clip-path`, no `steps()` timing in ambient or panel motion, square panel frames, at most eight layers per ambient wrapper, and a typeface that is either bundled or a system font.

### Panel interiors

Triptych wings keep a stationary square frame. Two optional tokens control what moves inside it:

- `panelLayout: 'fixed'` paints `panelLeft`/`panelRight` exactly as authored, honouring each layer's own position, size, and repeat. The default `drift` oversizes wing art so `panelAnimation` can wander it.
- `panelInteriors.left` / `.right` restyle or replace the glyph. `object` paints art layers in its place, and `keepGlyph` keeps both. `aspect` locks the box to the wing's full height at a ratio such as `2 / 3`, so objects line up with `center/auto 100%` scenery. `inset`, `place`, `fontSize`, `color`, `origin`, `mask`, and `animation` tune it per wing.

`panelOverlay`, `panelOverlayBlend`, and `panelOverlayOpacity` replace the shared prismatic sweep; `plaqueFont` and `plaqueTransform` give the plaque name its own face.

## Verification

Run `bun run test:all`. It type-checks, runs the settings, CSS, backdrop and font tests, and builds `dist/frontend.js`. The extension is frontend-only and needs no permissions.

Generate a proof page with `bun scripts/render-native-theme.mjs reliquary-saint dark`. It uses the production CSS, backdrop layers and bundled fonts, and is written to `test-output/native-atlas/`.

## Releasing

Lumiverse installs from the GitHub repository and skips its own build when `dist/` is tracked in git, so commit the built `dist/frontend.js` with each release.
