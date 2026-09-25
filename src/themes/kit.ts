import type { VenusSkin, VenusThemeArt, VenusThemeFamily } from './types'

/** Shared authoring kit for native VENUS 2 families. */

export const skin = (background: string, surface: string, surfaceRaised: string, text: string, muted: string, accent: string, accentSoft: string): VenusSkin => ({ background, surface, surfaceRaised, text, muted, accent, accentSoft })
export const svg = (markup: string, viewBox = '0 0 160 240') => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${markup}</svg>`)}")`
/** Six-digit hex plus opacity, e.g. a('#ff0000', .5) → #ff000080. */
export const a = (hex: string, opacity: number) => `${hex}${Math.round(Math.min(1, Math.max(0, opacity)) * 255).toString(16).padStart(2, '0')}`

/** Wing scenery drawn on a 160×240 board; objects share the same 2/3 box so they line up. */
export const scenery = (art: string) => `${art} center/auto 100% no-repeat`
export const board = (art: string) => `${art} center/100% 100% no-repeat`
export const BOARD = '2 / 3'
export const sheen = 'linear-gradient(120deg,transparent 38%,#ffffff12 50%,transparent 62%)'
export const ease = 'cubic-bezier(.45,0,.25,1)'
export const breathe = '0%,100%{filter:brightness(.94) saturate(1)}50%{filter:brightness(1.12) saturate(1.16)}'
export const drift = '0%,100%{transform:translate3d(-1.2%,-.8%,0) scale(1.03)}50%{transform:translate3d(1.2%,.8%,0) scale(1.07)}'
/** Studs painted into the plaque's inner frame at both ends. */
export const studs = (left: string, right = left, inset = 14) => `radial-gradient(circle at ${inset}px 50%,${left}),radial-gradient(circle at calc(100% - ${inset}px) 50%,${right})`

export interface MotionSpec {
  scene: [seconds: number, timing: string, frames: string]
  world: [seconds: number, timing: string, frames: string]
  panel?: [seconds: number, frames: string]
  inner: [seconds: number, timing: string, frames: string]
  overlay: [seconds: number, timing: string, frames: string]
  /** Theme-local keyframes used by wing interiors. */
  extra?: string
}

export type MotionTokens = Pick<VenusThemeArt, 'sceneAnimation' | 'worldAnimation' | 'panelAnimation' | 'panelInnerAnimation' | 'panelOverlayAnimation' | 'keyframes'>

/** Names every keyframe `venus-<prefix>-<kind>-<id>` so families never collide. */
export const motion = (prefix: string, id: string, m: MotionSpec): MotionTokens => {
  const [panelSeconds, panelFrames] = m.panel ?? [9, breathe]
  const name = (kind: string) => `venus-${prefix}-${kind}-${id}`
  return {
    sceneAnimation: `${name('scene')} ${m.scene[0]}s ${m.scene[1]} infinite`,
    worldAnimation: `${name('world')} ${m.world[0]}s ${m.world[1]} infinite`,
    panelAnimation: `${name('panel')} ${panelSeconds}s ${ease} infinite`,
    panelInnerAnimation: `${name('inner')} ${m.inner[0]}s ${m.inner[1]} infinite`,
    panelOverlayAnimation: `${name('overlay')} ${m.overlay[0]}s ${m.overlay[1]} infinite`,
    keyframes: `
@keyframes ${name('scene')}{${m.scene[2]}}
@keyframes ${name('world')}{${m.world[2]}}
@keyframes ${name('panel')}{${panelFrames}}
@keyframes ${name('inner')}{${m.inner[2]}}
@keyframes ${name('overlay')}{${m.overlay[2]}}
${m.extra ?? ''}`,
  }
}

export const family = (id: string, name: string, description: string, keywords: string[], dark: VenusSkin, light: VenusSkin, art: VenusThemeArt): VenusThemeFamily => ({ id, name, description, keywords, skins: { dark, light }, art })

export type Mode = 'dark' | 'light'
/**
 * A family whose art is authored once as a function of its palette ink, then rendered
 * separately for the dark and light skins so each skin gets dedicated artwork.
 */
export function world<Ink>(id: string, name: string, description: string, keywords: string[], dark: { skin: VenusSkin; ink: Ink }, light: { skin: VenusSkin; ink: Ink }, paint: (k: Ink, mode: Mode) => VenusThemeArt): VenusThemeFamily {
  return { id, name, description, keywords, skins: { dark: dark.skin, light: light.skin }, art: paint(dark.ink, 'dark'), lightArt: paint(light.ink, 'light') }
}

/** Font stacks: bundled-name first, then the closest widely installed faces. */
export const fonts = {
  mono: '"DM Mono","Space Mono",ui-monospace,monospace',
  plexMono: '"IBM Plex Mono","Consolas",ui-monospace,monospace',
  typewriter: '"Courier Prime","Courier New",ui-monospace,monospace',
  terminal: '"VT323","Lucida Console","Consolas",monospace',
  cinzelDeco: '"Cinzel Decorative","Cinzel","Copperplate Gothic Bold","Trajan Pro",serif',
  marcellus: '"Marcellus","Constantia","Palatino Linotype",serif',
  erica: '"Erica One","Rockwell Extra Bold","Cooper Black",Impact,sans-serif',
  karla: '"Karla","Trebuchet MS",system-ui,sans-serif',
  spectral: '"Spectral","Sitka Heading","Cambria",Georgia,serif',
  sourceSerif: '"Source Serif 4","Sitka Text","Cambria",Georgia,serif',
  dmSerif: '"DM Serif Display","Didot","Bodoni MT",Georgia,serif',
  lora: '"Lora","Constantia",Georgia,serif',
  blackletter: '"UnifrakturMaguntia","Old English Text MT","Blackadder ITC",serif',
  crimson: '"Crimson Pro","Garamond","Palatino Linotype",Georgia,serif',
  orbit: '"Orbitron","Bahnschrift","Eurostile","Segoe UI",sans-serif',
  manrope: '"Manrope","Segoe UI",system-ui,sans-serif',
  alegreya: '"Alegreya","Palatino Linotype","Book Antiqua",serif',
  fraunces: '"Fraunces","Cooper Black",Georgia,serif',
  workSans: '"Work Sans","Segoe UI",system-ui,sans-serif',
  uncial: '"Uncial Antiqua","Papyrus","Gabriola",serif',
  garamond: '"EB Garamond","Garamond","Palatino Linotype",Georgia,serif',
  cormorant: '"Cormorant Garamond","EB Garamond",Garamond,Georgia,serif',
  bodoni: '"Bodoni Moda","Didot","Bodoni MT",serif',
  italiana: '"Italiana","Didot","Bodoni 72","Bodoni MT",serif',
  libre: '"Libre Baskerville","Baskerville","Book Antiqua",Georgia,serif',
  youngSerif: '"Young Serif","Rockwell","Cambria",Georgia,serif',
  literata: '"Literata","Source Serif 4","Cambria",Georgia,serif',
  rubikMono: '"Rubik Mono One","Bahnschrift","Arial Black",sans-serif',
  righteous: '"Righteous","Futura","Trebuchet MS",sans-serif',
  syne: '"Syne","Futura","Trebuchet MS",sans-serif',
  spaceGrotesk: '"Space Grotesk","Segoe UI",system-ui,sans-serif',
  bigShoulders: '"Big Shoulders Text","Bahnschrift Condensed","Arial Narrow",sans-serif',
  instrument: '"Instrument Sans","Helvetica Neue",Arial,sans-serif',
  poiret: '"Poiret One","Futura","Century Gothic",sans-serif',
  mincho: '"Sawarabi Mincho","Yu Mincho","MS Mincho",serif',
  zenKaku: '"Zen Kaku Gothic Antique","Hiragino Sans","Yu Gothic","Bahnschrift",sans-serif',
  figtree: '"Figtree","Segoe UI",system-ui,sans-serif',
  outfit: '"Outfit","Futura","Century Gothic","Trebuchet MS",sans-serif',
  archivo: '"Archivo Black","Arial Black","Helvetica Neue",Impact,sans-serif',
  archivoNarrow: '"Archivo Narrow","Arial Narrow","Helvetica Neue",Arial,sans-serif',
  atkinson: '"Atkinson Hyperlegible","Verdana",system-ui,sans-serif',
  pressStart: '"Press Start 2P","Lucida Console",monospace',
  dmSans: '"DM Sans","Segoe UI",system-ui,sans-serif',
  handwritten: '"Segoe Print","Ink Free","Marker Felt","Bradley Hand","Comic Sans MS",cursive',
  script: '"Gabriola","Segoe Script","Brush Script MT",cursive',
  noto: '"Noto Sans","Segoe UI",system-ui,sans-serif',
  fragment: '"Fragment Mono","Consolas",ui-monospace,monospace',
}

/** A full-width backdrop composition (skyline, horizon, landmark) pinned to an edge of the world. */
export const landmark = (markup: string, viewBox = '0 0 1600 400', position = 'center bottom') => `${svg(markup, viewBox)} ${position}/100% auto no-repeat`
