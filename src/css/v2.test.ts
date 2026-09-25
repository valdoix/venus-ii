import { expect, test } from 'bun:test'
import { buildThemeCSS, buildTuningCSS } from './build'
import { BACKDROP, LAYER_SLOTS, buildBackdropCSS, layerCount, splitTop } from './backdrop'
import { FONT_FAMILIES, isCatalogFamily, stackFamilies } from '../fonts/catalog'
import { BUNDLED_FACES } from '../fonts/data.generated'
import { artFor } from '../themes/types'
import { DEFAULTS } from '../settings/schema'
import { VENUS_THEMES } from '../themes'

test('maximalist library provides forty-nine paired dedicated skins and both animation systems', () => {
  const css = buildThemeCSS(VENUS_THEMES[0], DEFAULTS)
  expect(VENUS_THEMES).toHaveLength(49)
  expect(VENUS_THEMES[0].skins.light).toBeDefined()
  expect(VENUS_THEMES[0].skins.dark).toBeDefined()
  expect(css).toContain(`${BACKDROP}{position:fixed`)
  expect(css).toContain('@keyframes venus-panel-signal')
  expect(css).toContain('@keyframes venus-light-stream')
  expect(css).toContain('content:none!important')
})

test('ships the ten-world expansion with distinct layered backgrounds and smooth motion', () => {
  const ids = ['lacquer-seance','velvet-seismograph','moire-opera','monsoon-cartography','candlewax-ministry','raku-weather-station','cicada-embassy','bakelite-oracle','quilted-cosmos','last-greenhouse']
  const signatures = new Set<string>()
  for (const id of ids) {
    const theme = VENUS_THEMES.find((item) => item.id === id)
    expect(theme).toBeDefined()
    expect(theme!.art.backdrop).toBeTruthy()
    expect(theme!.art.ornament).toBeTruthy()
    expect(theme!.art.sceneAnimation).toContain(`venus-ten-scene-${id}`)
    expect(theme!.art.worldAnimation).toContain(`venus-ten-world-${id}`)
    expect(theme!.art.panelAnimation).toContain(`venus-ten-panel-${id}`)
    expect(theme!.art.keyframes).not.toContain('steps(')
    expect(`${theme!.art.sceneAnimation} ${theme!.art.worldAnimation} ${theme!.art.panelAnimation}`).toContain('cubic-bezier')
    signatures.add(`${theme!.art.backdrop}|${theme!.art.scene}|${theme!.art.ornament}`)
  }
  expect(signatures.size).toBe(ids.length)
})

test('ships every new maximalist atlas family with dedicated skins and motion', () => {
  const atlasIds = ['reliquary-saint','peacock-sultanate','plague-masquerade','siege-codex','frost-court','alchemist-king','dragon-treasury','reality-carnival','astral-botanica','mirror-palace','abyssal-empire','unwritten-library','orbital-versailles','kaiju-broadcast','synthetic-angels','disco-mausoleum','bioship-flowers','memory-bazaar']
  expect(new Set(VENUS_THEMES.map((theme) => theme.id)).size).toBe(VENUS_THEMES.length)
  for (const id of atlasIds) {
    const theme = VENUS_THEMES.find((item) => item.id === id)
    expect(theme).toBeDefined()
    expect(theme!.skins.dark).not.toEqual(theme!.skins.light)
    expect(theme!.art.ornament).toBeTruthy()
    expect(theme!.art.worldAnimation).toContain(`venus-atlas-world-${id}`)
    expect(theme!.art.panelAnimation).toContain(`venus-atlas-panel-${id}`)
    expect(theme!.art.panelInnerAnimation).toContain(`venus-atlas-inner-${id}`)
    expect(theme!.art.panelOverlayAnimation).toContain(`venus-atlas-overlay-${id}`)
    expect(theme!.art.plaqueText).toBeTruthy()
    expect(theme!.art.keyframes).toContain(`@keyframes venus-atlas-world-${id}`)
    expect(theme!.art.keyframes).toContain(`@keyframes venus-atlas-panel-${id}`)
    expect(theme!.art.keyframes).toContain(`@keyframes venus-atlas-inner-${id}`)
    expect(theme!.art.keyframes).toContain(`@keyframes venus-atlas-overlay-${id}`)
    expect(`${theme!.art.sceneAnimation} ${theme!.art.worldAnimation} ${theme!.art.panelAnimation}`).not.toContain('steps(')
    expect(theme!.art.keyframes).toContain('transform:')
  }
})

test('bubble panel frames stay fixed while their interior styling animates', () => {
  const css = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === 'reliquary-saint')!, DEFAULTS)
  expect(css).toContain('fixed rectangular frames, animated interior art')
  expect(css).not.toContain('venus-panel-drift-left')
  expect(css).not.toContain('venus-panel-drift-right')
})

test('bubble triptych has square-cornered rectangular side panels and never relies on polygon clipping', () => {
  const css = buildThemeCSS(VENUS_THEMES[0], DEFAULTS)
  expect(css).toContain('border-radius:0')
  expect(css).not.toContain('clip-path')
  expect(css).toContain('--venus-panel-left:')
  expect(css).toContain('--venus-panel-right:')
  expect(css).toContain('[data-venus2-panel="left"]')
  expect(css).toContain('[data-venus2-panel="right"]')
  expect(css).toContain('var(--venus-panel-copy-left)')
})

test('bubble header panels animate their interiors without moving their frames', () => {
  const id = 'reliquary-saint'
  const css = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === id)!, DEFAULTS)
  expect(css).toContain('animation:var(--venus-panel-animation)!important')
  expect(css).toContain('animation:var(--venus-panel-inner-animation)!important')
  expect(css).toContain('animation:var(--venus-panel-overlay-animation)!important')
  expect(css).toContain(`@keyframes venus-atlas-inner-${id}`)
  expect(css).toContain(`@keyframes venus-atlas-overlay-${id}`)
  expect(css).not.toContain('will-change')
  expect(css).not.toContain('@keyframes venus-panel-drift-left')
  expect(css).not.toContain('@keyframes venus-panel-drift-right')
})

test('full motion is not disabled by the base theme reduced-motion query', () => {
  const css = buildThemeCSS(VENUS_THEMES[0], DEFAULTS)
  expect(css).not.toContain('@media(prefers-reduced-motion:reduce)')
  const full = buildTuningCSS({ ...DEFAULTS, global: { ...DEFAULTS.global, motion: 'full' } })
  expect(full).not.toContain('animation:none!important;transition:none!important')
})

test('portrait customizer reaches minimal and bubble message hooks', () => {
  const css = buildTuningCSS({ ...DEFAULTS, global: { ...DEFAULTS.global, portraitShape: 'arch', portraitFit: 'contain' } })
  expect(css).toContain('[data-component="MinimalMessage"]')
  expect(css).toContain('[data-component="BubbleMessage"]')
  expect(css).toContain('object-fit:contain')
  expect(css).toContain('--venus-portrait-base:260px')
})

test('portrait-first base mirrors the proven Venus 1 composition without portrait animation', () => {
  const css = buildThemeCSS(VENUS_THEMES[0], DEFAULTS)
  expect(css).toContain('--venus-portrait-base:260px')
  expect(css).toContain('--venus-portrait-h:calc(var(--venus-portrait-w) * 1.41)')
  expect(css).toContain('grid-template-rows:auto auto!important')
  expect(css).toContain('animation:none!important')
})

test('reading layout supports justified, left, and centered message text', () => {
  for (const textAlign of ['justify', 'left', 'center'] as const) {
    const css = buildTuningCSS({ ...DEFAULTS, global: { ...DEFAULTS.global, textAlign } })
    expect(css).toContain(`text-align:${textAlign}!important`)
  }
})

test('custom body and display font stacks are emitted as theme tokens', () => {
  const css = buildTuningCSS({ ...DEFAULTS, global: { ...DEFAULTS.global, bodyFont: '"EB Garamond", Garamond, serif', headingFont: 'Didot, serif' } })
  expect(css).toContain('--venus-body:"EB Garamond", Garamond, serif;')
  expect(css).toContain('--venus-heading:Didot, serif;')
})

const PLAYHOUSE_IDS = ['midnight-laundromat','pachinko-shrine','brutalist-birthday','chalk-atelier','riviera-lido','toile-de-chaos','hotel-somnambule','lighthouse-lie','dollhouse-inspection','mixtape-mainframe','aero-aquarium','googie-orbit-diner']

test('ships the Playhouse expansion with paired skins, own motion, and authored wings', () => {
  const signatures = new Set<string>()
  for (const id of PLAYHOUSE_IDS) {
    const theme = VENUS_THEMES.find((item) => item.id === id)
    expect(theme).toBeDefined()
    expect(theme!.skins.dark).not.toEqual(theme!.skins.light)
    expect(theme!.art.panelLayout).toBe('fixed')
    expect(theme!.art.panelInteriors).toBeDefined()
    expect(theme!.art.plaqueText).toBeTruthy()
    for (const kind of ['scene', 'world', 'panel', 'inner', 'overlay']) expect(theme!.art.keyframes).toContain(`@keyframes venus-play-${kind}-${id}`)
    expect(`${theme!.art.sceneAnimation} ${theme!.art.worldAnimation} ${theme!.art.panelAnimation} ${theme!.art.keyframes}`).not.toContain('steps(')
    const css = buildThemeCSS(theme!, DEFAULTS)
    expect(css).not.toContain('clip-path')
    expect(css).toContain('border-radius:0')
    signatures.add(`${theme!.art.scene}|${theme!.art.panelLeft}|${theme!.art.panelRight}`)
  }
  expect(signatures.size).toBe(PLAYHOUSE_IDS.length)
})

test('fixed wings keep authored layer sizes while drift wings keep the oversize treatment', () => {
  const fixed = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === 'hotel-somnambule')!, DEFAULTS)
  const base = VENUS_THEMES.find((theme) => theme.id === 'reliquary-saint')!
  const drift = buildThemeCSS({ ...base, id: 'drift-probe', lightArt: undefined, art: { ...base.art, panelLayout: undefined, panelInteriors: undefined } }, DEFAULTS)
  expect(fixed).not.toContain('background-size:130% 130%,150% 150%,auto!important')
  expect(drift).toContain('background-size:130% 130%,150% 150%,auto!important')
  expect(drift).not.toContain('aspect-ratio:2 / 3')
})

test('panel interiors paint art objects in an aspect-locked box with their own motion', () => {
  const css = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === 'hotel-somnambule')!, DEFAULTS)
  expect(css).toContain('[data-venus2-panel="left"]::before{content:""!important;background:url("data:image/svg+xml')
  expect(css).toContain('aspect-ratio:2 / 3!important')
  expect(css).toContain('transform-origin:50% 45.83%!important')
  expect(css).toContain('animation:venus-play-hotel-swing 3.6s')
  const glyph = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === 'pachinko-shrine')!, DEFAULTS)
  expect(glyph).not.toMatch(/data-venus2-panel="left"\]::before\{content:""/)
})

test('custom overlays and plaque faces are emitted only when authored', () => {
  const mixtape = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === 'mixtape-mainframe')!, DEFAULTS)
  expect(mixtape).toContain('mix-blend-mode:screen!important;opacity:0.35!important')
  expect(mixtape).toContain('text-transform:none!important')
  expect(mixtape).toContain('"Segoe Print"')
  const reliquary = buildThemeCSS(VENUS_THEMES.find((theme) => theme.id === 'reliquary-saint')!, DEFAULTS)
  expect(reliquary).not.toContain('text-transform:none!important')
})

test('motion off and reduced reach wing interiors and light strips', () => {
  for (const motion of ['off', 'reduced'] as const) {
    const css = buildTuningCSS({ ...DEFAULTS, global: { ...DEFAULTS.global, motion } })
    expect(css).toContain('[data-spindle-mount="message_header"] > [data-venus2-panel][data-venus2-panel]::before')
    expect(css).toContain('[data-component="MinimalMessage"] [data-component="MessageContent"]::before')
  }
})

test('whole-app scope clears the Lumiverse shell and outranks its inline palette', () => {
  const theme = VENUS_THEMES.find((item) => item.id === 'pachinko-shrine')!
  const app = buildThemeCSS(theme, { ...DEFAULTS, scope: 'app', skinPreference: 'light' })
  expect(app).toContain('[data-app-root]{background:transparent!important')
  expect(app).toContain(`--lumiverse-bg:${theme.skins.light.background}!important`)
  expect(app).toContain('background-color:var(--venus-bg)!important')
  expect(app).toContain(`${BACKDROP}{position:fixed`)
  expect(buildThemeCSS(theme, { ...DEFAULTS, scope: 'chat' })).toContain(`${BACKDROP}{position:absolute`)
  const chat = buildThemeCSS(theme, { ...DEFAULTS, scope: 'chat', skinPreference: 'light' })
  expect(chat).not.toContain('[data-app-root]')
  expect(chat).toContain(`--lumiverse-bg:${theme.skins.light.background};`)
})

test('every family ships dedicated light artwork and forbidden CSS never appears', () => {
  for (const theme of VENUS_THEMES) {
    const light = buildThemeCSS(theme, { ...DEFAULTS, skinPreference: 'light' })
    const dark = buildThemeCSS(theme, { ...DEFAULTS, skinPreference: 'dark' })
    expect(light).not.toContain('clip-path')
    expect(dark).not.toContain('clip-path')
    expect(`${theme.art.sceneAnimation} ${theme.art.worldAnimation} ${theme.art.panelAnimation} ${theme.art.keyframes}`).not.toContain('steps(')
    if (theme.lightArt) expect(light).not.toEqual(dark)
  }
  const rebuilt = VENUS_THEMES
  for (const theme of rebuilt) {
    expect(theme.lightArt).toBeDefined()
    expect(theme.art.panelLayout).toBe('fixed')
    expect(theme.art.panelInteriors?.left ?? theme.art.panelInteriors?.right).toBeDefined()
    expect(theme.lightArt!.panelLeft).not.toEqual(theme.art.panelLeft)
    expect(theme.lightArt!.backdrop).not.toEqual(theme.art.backdrop)
    // Moiré Opera's backdrop is its op-art interference field rather than a skyline.
    if (theme.id !== 'moire-opera') expect(theme.art.backdrop ?? '').toContain('data:image/svg+xml')
  }
  expect(new Set(rebuilt.map((theme) => theme.art.portraitRadius)).size).toBeGreaterThan(36)
  expect(new Set(rebuilt.map((theme) => theme.art.backdrop)).size).toBe(VENUS_THEMES.length)
})

test('the ambient backdrop animates only compositor properties and always sits on an opaque base', () => {
  for (const theme of VENUS_THEMES) for (const mode of ['dark', 'light'] as const) {
    const art = artFor(theme, mode)
    expect(layerCount(art)).toBeLessThanOrEqual(LAYER_SLOTS)
    const css = buildBackdropCSS(art, true)
    for (const block of css.matchAll(/@keyframes [\w-]+\{((?:[^{}]|\{[^{}]*\})*)\}/g)) expect(block[1]).not.toContain('background-position')
    expect(buildThemeCSS(theme, { ...DEFAULTS, skinPreference: mode })).toContain('background-color:var(--venus-bg)!important')
  }
})

test('background-position tracks become equivalent translations', () => {
  expect(splitTop('url("a,b"),linear-gradient(red,blue) 0 0/10px 10px,none')).toEqual(['url("a,b")', 'linear-gradient(red,blue) 0 0/10px 10px', 'none'])
  const art = { ...VENUS_THEMES[0].art, scene: 'linear-gradient(red,blue),radial-gradient(red,blue)', sceneSize: '40px 40px,auto', sceneAnimation: 'probe 10s linear infinite', keyframes: '@keyframes probe{0%{background-position:0 0,-100% 0;transform:scale(1)}100%{background-position:40px -80px,100% 0;transform:scale(1.1)}}' }
  const css = buildBackdropCSS(art, false)
  expect(css).toContain('@keyframes venus2-scene-l0{0%{translate:0px 0px}100%{translate:40px -80px}}')
  expect(css).toContain('inset:-80px -40px')
  expect(css).toContain('@keyframes venus2-scene-wrap{0%{transform:scale(1)}100%{transform:scale(1.1)}}')
  expect(css).not.toContain('venus2-scene-l1')
})

const SYSTEM_FIRST = new Set(['Segoe Print', 'Gabriola', 'Georgia', 'Garamond', 'Palatino Linotype', 'Segoe UI', 'system-ui', 'Consolas', 'Courier New', 'Inter'])
test('every theme typeface is bundled and every bundled family has faces', () => {
  for (const theme of VENUS_THEMES) for (const mode of ['dark', 'light'] as const) {
    const art = artFor(theme, mode)
    for (const stack of [art.headingFont, art.bodyFont, art.monoFont, art.plaqueFont]) {
      const first = stackFamilies(stack)[0]
      if (first && !SYSTEM_FIRST.has(first)) expect(isCatalogFamily(first), `${theme.id}: ${first}`).toBe(true)
    }
  }
  for (const family of FONT_FAMILIES) expect(BUNDLED_FACES.some((face) => face.family === family), family).toBe(true)
})

test('tuning outranks theme token defaults regardless of stylesheet order', () => {
  expect(buildTuningCSS(DEFAULTS)).toContain(':root:root{--venus-portrait-base:260px')
  expect(buildTuningCSS({ ...DEFAULTS, scope: 'chat' })).toContain('[data-component="ChatView"][data-component="ChatView"]{--venus-portrait-base')
})
