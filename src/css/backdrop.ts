import type { VenusThemeArt } from '../themes/types'

/**
 * Compositor-only ambient backdrop.
 *
 * Themes author their ambient scene as multi-layer backgrounds whose keyframes move
 * `background-position`. Animating that property repaints a viewport-sized layer every
 * frame (measured: frame time doubles). Here every background layer becomes its own
 * element and its position track becomes an equivalent `translate`, so the browser only
 * composites. Everything else in the authored keyframes (transform, filter, opacity)
 * stays on the layer's wrapper, driven by the same timing so the choreography is kept.
 */

export const BACKDROP = '[data-venus2-backdrop]'
/** Background layers per wrapper that the DOM provides; themes are tested against it. */
export const LAYER_SLOTS = 8

export const BUILTIN_BACKDROP_KEYFRAMES = `
@keyframes venus-background-drift{0%{background-position:0 0,0 0,0 0;transform:translate3d(-2%,-1%,0) scale(1.02);filter:brightness(.92)}100%{background-position:82px 126px,-54px 71px,49px -63px;transform:translate3d(2%,1%,0) scale(1.08);filter:brightness(1.13)}}
@keyframes venus-background-parallax{0%{background-position:-50px 20px;transform:translate3d(-1%,0,0)}100%{background-position:96px -72px;transform:translate3d(2%,1%,0)}}`
const DEFAULT_SCENE_ANIMATION = 'venus-background-drift 20s cubic-bezier(.45,0,.25,1) infinite alternate'
const DEFAULT_WORLD_ANIMATION = 'venus-background-parallax 13s cubic-bezier(.45,0,.25,1) infinite alternate'

/** Splits on commas that are not nested inside parentheses or quotes. */
export function splitTop(value: string): string[] {
  const out: string[] = []; let depth = 0; let quote = ''; let start = 0
  for (let i = 0; i < value.length; i++) {
    const c = value[i]
    if (quote) { if (c === quote && value[i - 1] !== '\\') quote = ''; continue }
    if (c === '"' || c === "'") quote = c
    else if (c === '(') depth++
    else if (c === ')') depth--
    else if (c === ',' && depth === 0) { out.push(value.slice(start, i).trim()); start = i + 1 }
  }
  out.push(value.slice(start).trim())
  return out.filter(Boolean)
}

interface Stop { selector: string; decls: [string, string][] }

/** Finds `@keyframes name{...}` in a stylesheet string and returns its stops. */
export function findKeyframes(css: string, name: string): Stop[] | null {
  const head = `@keyframes ${name}{`
  const at = css.indexOf(head)
  if (at < 0) return null
  let depth = 1; let i = at + head.length; const bodyStart = i
  for (; i < css.length && depth; i++) { if (css[i] === '{') depth++; else if (css[i] === '}') depth-- }
  const body = css.slice(bodyStart, i - 1)
  const stops: Stop[] = []
  for (const match of body.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const decls: [string, string][] = []
    for (const part of splitDecls(match[2])) {
      const colon = part.indexOf(':')
      if (colon > 0) decls.push([part.slice(0, colon).trim(), part.slice(colon + 1).trim()])
    }
    stops.push({ selector: match[1].trim(), decls })
  }
  return stops
}

function splitDecls(body: string): string[] {
  const out: string[] = []; let depth = 0; let start = 0
  for (let i = 0; i < body.length; i++) {
    const c = body[i]
    if (c === '(') depth++
    else if (c === ')') depth--
    else if (c === ';' && depth === 0) { out.push(body.slice(start, i)); start = i + 1 }
  }
  out.push(body.slice(start))
  return out.map((x) => x.trim()).filter(Boolean)
}

type Length = { px: number; pct: number }
const KEYWORD: Record<string, number> = { left: 0, top: 0, center: 50, right: 100, bottom: 100 }
function length(token: string | undefined): Length {
  if (!token) return { px: 0, pct: 50 }
  if (token in KEYWORD) return { px: 0, pct: KEYWORD[token] }
  const n = parseFloat(token)
  if (!Number.isFinite(n)) return { px: 0, pct: 0 }
  return token.endsWith('%') ? { px: 0, pct: n } : { px: n, pct: 0 }
}
function position(value: string): [Length, Length] {
  const parts = value.trim().split(/\s+/)
  if (parts.length === 1) return [length(parts[0]), { px: 0, pct: 50 }]
  return [length(parts[0]), length(parts[1])]
}
/** Tile size along one axis as a fraction of the box plus a px part; `auto` on a gradient fills the box. */
function tile(size: string, axis: 0 | 1): { frac: number; px: number } {
  const parts = size.trim().split(/\s+/)
  if (parts[0] === 'cover' || parts[0] === 'contain') return { frac: 1, px: 0 }
  const token = parts[axis] ?? parts[0]
  if (!token || token === 'auto') return { frac: 1, px: 0 }
  const n = parseFloat(token)
  return token.endsWith('%') ? { frac: n / 100, px: 0 } : { frac: 0, px: n }
}
const num = (n: number) => +n.toFixed(3)
/** background-position delta → translate. A % position moves by p·(box − tile). */
function shift(delta: Length, t: { frac: number; px: number }): string {
  const pct = delta.pct * (1 - t.frac)
  const px = delta.px - (delta.pct * t.px) / 100
  if (!pct) return `${num(px)}px`
  if (!px) return `${num(pct)}%`
  return `calc(${num(pct)}% + ${num(px)}px)`
}

interface Track { image: string; size: string; base: string | null; frames: { selector: string; translate: string }[]; extend: [number, number] }

function tracks(images: string[], sizes: string[], stops: Stop[] | null): Track[] {
  const positions = stops?.map((stop) => ({ selector: stop.selector, list: stop.decls.find(([p]) => p === 'background-position')?.[1] })) ?? []
  const moving = positions.filter((p) => p.list != null) as { selector: string; list: string }[]
  return images.map((image, i) => {
    const size = sizes[i % sizes.length] ?? 'auto'
    if (!moving.length) return { image, size, base: null, frames: [], extend: [0, 0] }
    const at = (list: string) => { const layers = splitTop(list); return position(layers[i % layers.length]) }
    const base = at(moving[0].list)
    let extendX = 0; let extendY = 0; let moves = false
    const frames = moving.map(({ selector, list }) => {
      const [x, y] = at(list)
      const dx = { px: x.px - base[0].px, pct: x.pct - base[0].pct }
      const dy = { px: y.px - base[1].px, pct: y.pct - base[1].pct }
      extendX = Math.max(extendX, Math.abs(dx.px)); extendY = Math.max(extendY, Math.abs(dy.px))
      const translate = `${shift(dx, tile(size, 0))} ${shift(dy, tile(size, 1))}`
      if (translate !== '0px 0px') moves = true
      return { selector, translate }
    })
    const baseList = splitTop(moving[0].list)
    return { image, size, base: baseList[i % baseList.length], frames: moves ? frames : [], extend: [extendX, extendY] }
  })
}

function animationWithName(shorthand: string, name: string) { const [, ...rest] = shorthand.trim().split(/\s+/); return [name, ...rest].join(' ') }

export interface BackdropKind { kind: 'scene' | 'world'; images: string[]; sizes: string[]; animation: string; opacity: string | number; filter: string; blend: string }

export function backdropKinds(art: VenusThemeArt): BackdropKind[] {
  return [
    { kind: 'scene', images: splitTop(art.scene), sizes: splitTop(art.sceneSize || 'auto'), animation: art.sceneAnimation ?? DEFAULT_SCENE_ANIMATION, opacity: art.sceneOpacity ?? .94, filter: art.sceneFilter ?? 'saturate(1.24) contrast(1.05)', blend: art.sceneBlendMode ?? 'normal' },
    { kind: 'world', images: [...splitTop(art.ornament ?? 'none'), ...splitTop(art.paper)], sizes: [...splitTop(art.ornamentSize ?? 'auto'), 'auto'], animation: art.worldAnimation ?? DEFAULT_WORLD_ANIMATION, opacity: art.worldOpacity ?? .92, filter: art.worldFilter ?? 'saturate(1.3) contrast(1.06)', blend: art.worldBlendMode ?? 'normal' },
  ]
}

/** CSS for the backdrop wrappers and layer slots. `host` is the element the backdrop sits in. */
export function buildBackdropCSS(art: VenusThemeArt, fixed: boolean): string {
  const all = `${BUILTIN_BACKDROP_KEYFRAMES}\n${art.keyframes ?? ''}`
  const rules: string[] = [
    `${BACKDROP}{position:${fixed ? 'fixed' : 'absolute'}!important;inset:0!important;z-index:0!important;overflow:hidden!important;pointer-events:none!important;contain:strict}`,
    `${BACKDROP}>div{position:absolute;inset:-15%;transform-origin:center}`,
    `${BACKDROP}>div>i{position:absolute;inset:0;display:none;background-repeat:repeat}`,
  ]
  for (const k of backdropKinds(art)) {
    const name = animationName(k.animation)
    const stops = findKeyframes(all, name)
    const wrap = `${BACKDROP}>[data-layer="${k.kind}"]`
    const rest = stops?.map((s) => ({ selector: s.selector, decls: s.decls.filter(([p]) => p !== 'background-position') })).filter((s) => s.decls.length) ?? []
    const wrapName = `venus2-${k.kind}-wrap`
    rules.push(`${wrap}{opacity:${k.opacity};filter:${k.filter};mix-blend-mode:${k.blend};${rest.length ? `animation:${animationWithName(k.animation, wrapName)}` : 'animation:none'}}`)
    if (rest.length) rules.push(`@keyframes ${wrapName}{${rest.map((s) => `${s.selector}{${s.decls.map(([p, v]) => `${p}:${v}`).join(';')}}`).join('')}}`)
    tracks(k.images, k.sizes, stops).slice(0, LAYER_SLOTS).forEach((t, i) => {
      if (t.image === 'none') return
      const slot = `${wrap}>i:nth-child(${i + 1})`
      const [ex, ey] = t.extend.map((e) => Math.ceil(e))
      const inset = ex || ey ? `inset:${ey ? `-${ey}px` : '0'} ${ex ? `-${ex}px` : '0'};` : ''
      const layerName = `venus2-${k.kind}-l${i}`
      rules.push(`${slot}{display:block;${inset}background:${t.image};background-size:${t.size};${t.base ? `background-position:${t.base};` : ''}${t.frames.length ? `animation:${animationWithName(k.animation, layerName)}` : ''}}`)
      if (t.frames.length) rules.push(`@keyframes ${layerName}{${t.frames.map((f) => `${f.selector}{translate:${f.translate}}`).join('')}}`)
    })
  }
  return rules.join('\n')
}

export const animationName = (shorthand: string) => shorthand.trim().split(/\s+/)[0]

/** How many layer slots a theme needs (for tests and the DOM). */
export function layerCount(art: VenusThemeArt): number { return Math.max(...backdropKinds(art).map((k) => k.images.length)) }
