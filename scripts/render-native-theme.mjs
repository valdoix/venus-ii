#!/usr/bin/env bun
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildThemeCSS } from '../src/css/build.ts'
import { DEFAULTS } from '../src/settings/schema.ts'
import { VENUS_THEMES } from '../src/themes/index.ts'
import { artFor } from '../src/themes/types.ts'
import { LAYER_SLOTS } from '../src/css/backdrop.ts'
import { stackFamilies } from '../src/fonts/catalog.ts'
import { BUNDLED_FACES } from '../src/fonts/data.generated.ts'

const id = process.argv[2] || 'reliquary-saint'
const mode = process.argv[3] === 'light' ? 'light' : 'dark'
const theme = VENUS_THEMES.find((entry) => entry.id === id)
if (!theme) throw new Error(`Unknown native Venus 2 theme: ${id}`)

const settings = { ...DEFAULTS, activeThemeId: id, skinPreference: mode }
const css = buildThemeCSS(theme, settings)
const art = artFor(theme, mode)
const families = new Set([art.headingFont, art.bodyFont, art.monoFont, art.plaqueFont].map((x) => stackFamilies(x)[0]).filter(Boolean))
const fontCSS = BUNDLED_FACES.filter((f) => families.has(f.family)).map((f) => `@font-face{font-family:"${f.family}";font-weight:${f.weight};font-display:block;src:url(data:font/woff2;base64,${f.data}) format("woff2")}`).join('')
const slots = '<i></i>'.repeat(LAYER_SLOTS)
const backdrop = `<div data-venus2-backdrop aria-hidden="true"><div data-layer="scene">${slots}</div><div data-layer="world">${slots}</div></div>`
const face = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="900" viewBox="0 0 640 900"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${theme.skins[mode].accentSoft}"/><stop offset="1" stop-color="${theme.skins[mode].surface}"/></linearGradient></defs><rect width="640" height="900" fill="url(#g)"/><circle cx="320" cy="260" r="132" fill="#d8aa8d"/><path d="M128 900c18-272 105-398 192-398s174 126 192 398" fill="${theme.skins[mode].accent}"/><path d="M188 245c14-151 247-189 278 13-58-70-207-106-278-13" fill="#38251f"/></svg>`)

const minimal = `<article data-component="MinimalMessage" data-part="character"><div class="_avatar_demo"><img src="data:image/svg+xml,${face}" alt="Portrait placeholder"></div><div class="_bubble_demo"><header class="_header_demo"><div class="_name_demo">Sister Ysabet</div><div class="_metaPill_demo">#122 · western shrine</div></header><div data-component="MessageContent"><p>The reliquary has begun answering prayers that no one remembers making.</p><p><em>The candles bend toward the sealed chapel.</em></p></div></div></article>`
const bubble = `<article data-component="BubbleMessage" data-part="character"><div class="_avatarBg_demo"></div><div class="_bubble_demo"><header class="_header_demo"><div class="_headerLeft_demo"><div class="_avatar_demo"><img src="data:image/svg+xml,${face}" alt="Portrait placeholder"></div><div class="_metaWrap_demo"><div class="_name_demo">Sister Ysabet</div><div class="_metaPill_demo">#122 · western shrine</div></div></div><span data-spindle-mount="message_header" style="display:contents"><span data-venus2-panel="left" aria-hidden="true"></span><span data-venus2-panel="right" aria-hidden="true"></span></span></header><div class="_content_demo"><div data-component="MessageContent"><p>The reliquary has begun answering prayers that no one remembers making.</p><p><q>Listen.</q> The gold is breathing again.</p></div></div></div></article>`
const html = `<!doctype html><html data-theme-mode="${mode}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${theme.name} production smoke</title><style>*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:system-ui,sans-serif}#root{width:min(1180px,calc(100% - 40px));margin:auto;padding:54px 0 110px}.proof{display:grid;gap:56px}.label{position:relative;z-index:2;margin:0 0 14px;font:700 12px ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase}.label b{color:var(--venus-accent)}p{margin:0 0 1em}.stage{min-width:0}</style><style>${fontCSS}</style><style>${css}</style></head><body>${backdrop}<div id="root"><main data-component="ChatView"><section data-component="MessageList" class="proof"><div class="stage"><div class="label"><b>${theme.name}</b> · ${mode} · minimal</div>${minimal}</div><div class="stage"><div class="label"><b>${theme.name}</b> · ${mode} · bubble</div>${bubble}</div></section></main></div></body></html>`

const outputDir = join(process.cwd(), 'test-output', 'native-atlas')
mkdirSync(outputDir, { recursive: true })
const output = join(outputDir, `${id}-${mode}.html`)
writeFileSync(output, html, 'utf8')
console.log(output)
