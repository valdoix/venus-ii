/**
 * Every web font a VENUS theme names first in a stack. All are SIL Open Font License
 * families from Google Fonts; `scripts/bundle-fonts.ts` embeds their Latin subsets.
 */
export const FONT_FAMILIES = [
  'Alegreya', 'Alegreya SC', 'Archivo Black', 'Archivo Narrow', 'Atkinson Hyperlegible', 'Big Shoulders Text', 'Bodoni Moda',
  'Chakra Petch', 'Cinzel', 'Cinzel Decorative', 'Cormorant Garamond', 'Courier Prime', 'Crimson Pro', 'DM Mono', 'DM Sans',
  'DM Serif Display', 'EB Garamond', 'Erica One', 'Figtree', 'Fragment Mono', 'Fraunces', 'IBM Plex Mono', 'Instrument Sans',
  'Italiana', 'Kaisei Decol', 'Karla', 'Libre Baskerville', 'Limelight', 'Literata', 'Lora', 'Manrope', 'Marcellus', 'Marcellus SC',
  'Metamorphous', 'Monoton', 'Noto Sans', 'Orbitron', 'Outfit', 'Playfair Display', 'Poiret One', 'Press Start 2P', 'Righteous',
  'Rubik Mono One', 'Sawarabi Mincho', 'Source Serif 4', 'Space Grotesk', 'Space Mono', 'Spectral', 'Stardos Stencil', 'Syne',
  'Tenor Sans', 'UnifrakturMaguntia', 'Uncial Antiqua', 'VT323', 'Work Sans', 'Yatra One', 'Young Serif', 'Zen Kaku Gothic Antique',
] as const

export type FontFamily = (typeof FONT_FAMILIES)[number]
const known = new Set<string>(FONT_FAMILIES.map((family) => family.toLowerCase()))
export const isCatalogFamily = (family: string) => known.has(family.toLowerCase())

/** Family names listed in a CSS font-family stack, unquoted, in order. */
export function stackFamilies(stack: string | null | undefined): string[] {
  if (!stack) return []
  return stack.split(',').map((part) => part.trim().replace(/^["']|["']$/g, '').trim()).filter(Boolean)
}

/**
 * Google Fonts CSS2 URLs for one family, richest first. The API rejects a request that
 * names a cut the family lacks, so the loader falls back through this list.
 */
export function googleFontsURLs(family: string): string[] {
  const name = encodeURIComponent(family).replace(/%20/g, '+')
  const base = 'https://fonts.googleapis.com/css2?family='
  return [`${base}${name}:ital,wght@0,400;0,700;1,400;1,700&display=swap`, `${base}${name}:wght@400;700&display=swap`, `${base}${name}&display=swap`]
}
