export interface VenusSkin { background: string; surface: string; surfaceRaised: string; text: string; muted: string; accent: string; accentSoft: string }
/**
 * Interior of one fixed triptych wing. The frame never moves; this restyles or replaces what animates inside it.
 * Every field is optional; unset fields keep the shared glyph treatment.
 */
export interface VenusPanelInterior {
  /** Background layers for an art object painted inside the wing. Per-layer position, size, and repeat are honoured. */
  object?: string
  /** Keep the text glyph on top of `object` instead of replacing it. */
  keepGlyph?: boolean
  /** Lock the interior box to the wing's full height at this aspect ratio, centred, so objects register with `center/auto 100%` scenery. */
  aspect?: string
  /** CSS `inset` for the interior box when no aspect lock is used. */
  inset?: string
  /** CSS `place-items` for the glyph. */
  place?: string
  fontSize?: string
  color?: string
  /** Complete animation shorthand for this wing; overrides `panelInnerAnimation` and the right wing's reversal. */
  animation?: string
  /** Transform origin for needles, keys, pendulums, and reels. */
  origin?: string
  /** Mask image, e.g. a circle for a spinning reel. */
  mask?: string
}
/** CSS-gradient art tokens. They remain portable across Lumiverse's message seams. */
export interface VenusThemeArt {
  /** Complete page field behind both animated environmental layers. */
  backdrop?: string
  scene: string
  sceneSize: string
  sceneOpacity?: number
  sceneFilter?: string
  sceneBlendMode?: string
  /** Optional second full-world composition layered over the scene. */
  ornament?: string
  ornamentSize?: string
  worldOpacity?: number
  worldFilter?: string
  worldBlendMode?: string
  /** Complete animation shorthands so every family can own its world motion. */
  sceneAnimation?: string
  worldAnimation?: string
  paper: string
  line: string
  lineSpeed: string
  panelLeft: string
  panelRight: string
  panelDetail: string
  panelGlyphs: readonly [string, string]
  panelAnimation: string
  /** Independent inner-symbol animation used by the fixed bubble side panels. */
  panelInnerAnimation?: string
  /** Independent moving light/texture animation layered above the panel artwork. */
  panelOverlayAnimation?: string
  /** `drift` (default) oversizes wing art so panelAnimation can wander it; `fixed` paints the authored layers exactly as written. */
  panelLayout?: 'drift' | 'fixed'
  /** Per-wing interiors layered inside the stationary frames. */
  panelInteriors?: { left?: VenusPanelInterior; right?: VenusPanelInterior }
  /** Replaces the shared prismatic sweep inside both wings. */
  panelOverlay?: string
  panelOverlayBlend?: string
  panelOverlayOpacity?: number
  portraitRadius: string
  plaque: string
  plaqueText?: string
  plaqueBorder: string
  plaqueShadow: string
  plaqueInset: string
  plaqueRadius: string
  /** Plaque name face when it should differ from headingFont, e.g. a handwritten label. */
  plaqueFont?: string
  plaqueTransform?: 'uppercase' | 'none'
  headingFont: string
  bodyFont: string
  monoFont: string
  /** Theme-local keyframes used by world and panel animation shorthands. */
  keyframes?: string
}
/** `art` is the dark-skin art; `lightArt`, when present, is the dedicated light-skin art. */
export interface VenusThemeFamily { id: string; name: string; description: string; keywords: string[]; skins: { light: VenusSkin; dark: VenusSkin }; art: VenusThemeArt; lightArt?: VenusThemeArt }
/** The art for a resolved skin: light skins use their dedicated art when a family provides it. */
export const artFor = (theme: VenusThemeFamily, mode: 'light' | 'dark'): VenusThemeArt => mode === 'light' && theme.lightArt ? theme.lightArt : theme.art
