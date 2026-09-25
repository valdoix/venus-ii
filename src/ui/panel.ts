import type { SpindleFrontendContext } from 'lumiverse-spindle-types'
import type { FontSource, PortraitShape, ProfileAppearance, TextAlignment, Tuning, VenusSettings } from '../settings/schema'
import { DEFAULTS, activeProfile, cleanFamilyName, effectiveSettings, migrate, resolveTuning, snapshotProfile } from '../settings/schema'
import { stackFamilies } from '../fonts/catalog'
import type { FontLoader } from '../fonts/loader'
import * as state from '../settings/state'
import { VENUS_THEMES, type VenusThemeFamily } from '../themes'
import { artFor } from '../themes/types'

const css = `
.venus2,.venus2-dialog{--v2-ui:#f7f4ff;--v2-muted:#aaa5bd;--v2-label:#d8d3e4;--v2-faint:#8f899d;--v2-accent:#d8b4fe;--v2-accent-strong:#c084fc;--v2-accent-text:#e9d5ff;--v2-edge:#ffffff1b;--v2-edge-strong:#ffffff24;--v2-fill:#ffffff08;--v2-fill-hover:#ffffff0d;--v2-input:#0b0911;--v2-input-text:#f7f4ff;--v2-code-text:#ddd6fe;--v2-panel-bg:radial-gradient(circle at 100% 0,#a855f722,transparent 36%),linear-gradient(180deg,#171220,#0e0b16);--v2-hero-bg:linear-gradient(135deg,#2d1c42cc,#171220 65%);--v2-hero-edge:#e9d5ff2b;--v2-hero-mark:#e9d5ff10;--v2-preview-bg:#0d0914;--v2-studio-bg:radial-gradient(circle at 85% 0,#7c3aed21,transparent 35%),#100c18;--v2-studio-edge:#e9d5ff38;--v2-nav-bg:#09070e;--v2-nav-text:#aaa5b5;--v2-nav-hover:#fff;--v2-nav-active:#f5e9ff;--v2-scrim:#05030bc7;--v2-shadow:#0005;--v2-shadow-deep:#000c;--v2-switch-off:#5d5868;--v2-danger-text:#fecdd3;--v2-status:#a7f3d0;box-sizing:border-box;color:var(--v2-ui);font:13px/1.45 Inter,ui-sans-serif,system-ui,sans-serif}
html[data-theme-mode="light"] .venus2,html[data-theme-mode="light"] .venus2-dialog{--v2-ui:#1f1a2b;--v2-muted:#645d73;--v2-label:#3d3650;--v2-faint:#77708a;--v2-accent:#7e22ce;--v2-accent-strong:#9333ea;--v2-accent-text:#6b21a8;--v2-edge:#2a1f3f1f;--v2-edge-strong:#2a1f3f2e;--v2-fill:#2a1f3f08;--v2-fill-hover:#7c3aed0f;--v2-input:#ffffff;--v2-input-text:#1f1a2b;--v2-code-text:#4c1d95;--v2-panel-bg:radial-gradient(circle at 100% 0,#a855f71c,transparent 36%),linear-gradient(180deg,#fbf8ff,#f3eefb);--v2-hero-bg:linear-gradient(135deg,#efe4fdcc,#fbf8ff 65%);--v2-hero-edge:#7c3aed2b;--v2-hero-mark:#7c3aed14;--v2-preview-bg:#f1ebf9;--v2-studio-bg:radial-gradient(circle at 85% 0,#7c3aed14,transparent 35%),#fcfaff;--v2-studio-edge:#7c3aed33;--v2-nav-bg:#f4effb;--v2-nav-text:#5b5470;--v2-nav-hover:#1f1a2b;--v2-nav-active:#4c1d95;--v2-scrim:#2a1f3f66;--v2-shadow:#2a1f3f22;--v2-shadow-deep:#2a1f3f55;--v2-switch-off:#c9c2d6;--v2-danger-text:#be123c;--v2-status:#047857}
.venus2 *,.venus2-dialog *{box-sizing:border-box}.venus2{min-height:100%;padding:14px;background:var(--v2-panel-bg)}
.venus2 h1,.venus2 h2,.venus2 h3,.venus2 h4,.venus2 strong,.venus2-dialog h1,.venus2-dialog h2,.venus2-dialog h3,.venus2-dialog h4,.venus2-dialog strong{color:var(--v2-ui)}
.venus2 button,.venus2 input,.venus2 select,.venus2 textarea{font:inherit}.venus2 button,.venus2-dialog button{cursor:pointer}.v2-kicker{font:700 9px/1.2 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;color:var(--v2-accent)}.v2-title{margin:3px 0 0;font:750 22px/1.05 Georgia,serif;letter-spacing:.06em}.v2-copy{margin:7px 0 0;color:var(--v2-muted);font-size:12px}.v2-hero{position:relative;overflow:hidden;padding:15px;border:1px solid var(--v2-hero-edge);border-radius:16px;background:var(--v2-hero-bg);box-shadow:0 16px 34px var(--v2-shadow)}.v2-hero:after{content:"♀";position:absolute;right:-7px;top:-20px;color:var(--v2-hero-mark);font:700 90px Georgia}.v2-version{display:inline-flex;margin-top:10px;padding:3px 7px;border:1px solid #c084fc44;border-radius:99px;background:#c084fc14;color:var(--v2-accent-text);font:700 9px ui-monospace,monospace;letter-spacing:.1em}
.v2-toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 0;padding:10px 11px;border:1px solid var(--v2-edge);border-radius:12px;background:var(--v2-fill)}.v2-toggle strong{display:block;font-size:12px}.v2-toggle small{display:block;margin-top:2px;color:var(--v2-muted);font-size:10px}.v2-switch{position:relative;width:38px;height:22px;flex:0 0 auto}.v2-switch input{position:absolute;opacity:0}.v2-switch i{display:block;width:100%;height:100%;border-radius:99px;background:var(--v2-switch-off);transition:.2s}.v2-switch i:after{content:"";display:block;width:16px;height:16px;margin:3px;border-radius:50%;background:white;box-shadow:0 2px 7px #0005;transition:.2s}.v2-switch input:checked+i{background:linear-gradient(90deg,#a855f7,#ec4899)}.v2-switch input:checked+i:after{transform:translateX(16px)}.v2-switch input:focus-visible+i{outline:2px solid #f0abfc;outline-offset:2px}
.v2-preview{--p:#d8b4fe;--s:#fb7185;--surface:#251a33;--left:linear-gradient(135deg,#673ab7,#ec4899);--right:linear-gradient(135deg,#0ea5e9,#7c3aed);--plaque:linear-gradient(90deg,#6d28d9,#db2777);margin:12px 0;padding:12px;border:1px solid color-mix(in srgb,var(--p) 35%,transparent);border-radius:13px;background:radial-gradient(circle at 50% 0,color-mix(in srgb,var(--p) 20%,transparent),transparent 45%),var(--v2-preview-bg);box-shadow:inset 0 1px #fff1}.v2-triptych{display:grid;grid-template-columns:minmax(22px,1fr) 52px minmax(22px,1fr);align-items:stretch;gap:5px;height:68px}.v2-triptych i{overflow:hidden;border:1px solid color-mix(in srgb,var(--p) 68%,transparent);border-radius:0;animation:v2-preview-drift 6s cubic-bezier(.45,0,.25,1) infinite alternate}.v2-triptych i:first-child{background:var(--left)}.v2-triptych i:last-child{background:var(--right);animation-delay:-3s}.v2-preview:not([data-panel-layout=fixed]) .v2-triptych i{background-size:150% 150%}.v2-preview[data-panel-layout=fixed] .v2-triptych i{animation:none}.v2-face{border:2px solid var(--p);border-radius:var(--portrait-radius,8px);background:radial-gradient(circle at 50% 27%,#f1c9aa 0 13%,transparent 14%),radial-gradient(ellipse at 50% 88%,#364a66 0 38%,transparent 39%),linear-gradient(145deg,var(--s),var(--surface));box-shadow:0 0 16px color-mix(in srgb,var(--p) 45%,transparent)}.v2-plaque{width:78%;margin:6px auto 0;padding:5px 7px;overflow:hidden;border:1px solid var(--p);border-radius:var(--plaque-radius,3px);background:var(--plaque);color:#fff;text-align:center;font:700 8px/1.2 var(--heading,Georgia,serif);letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;text-overflow:ellipsis;text-shadow:0 1px 2px #0008}.v2-now{margin-top:8px;display:flex;align-items:center;justify-content:space-between;gap:8px}.v2-now div{min-width:0}.v2-now strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}.v2-now small{color:var(--v2-muted);font-size:10px}.v2-swatches{display:flex;gap:3px}.v2-swatches i{width:10px;height:10px;border-radius:50%;border:1px solid var(--v2-edge-strong)}
.v2-fields{display:grid;gap:8px}.v2-field{display:grid;grid-template-columns:minmax(90px,1fr) minmax(100px,1.15fr);align-items:center;gap:9px}.v2-field>label{color:var(--v2-label);font-size:11px}.v2-field select,.v2-field input[type=text],.v2-field input[type=search],.v2-field textarea{width:100%;min-width:0;padding:7px 8px;border:1px solid var(--v2-edge-strong);border-radius:8px;background:var(--v2-input);color:var(--v2-input-text);outline:none}.v2-field select option{background:var(--v2-input);color:var(--v2-input-text)}.v2-field select:focus,.v2-field input:focus,.v2-field textarea:focus{border-color:var(--v2-accent-strong);box-shadow:0 0 0 2px #c084fc22}.v2-range{display:grid;grid-template-columns:1fr 42px;gap:7px;align-items:center}.v2-range input{width:100%;accent-color:var(--v2-accent-strong)}.v2-range output{color:var(--v2-code-text);text-align:right;font:700 10px ui-monospace,monospace}.v2-primary,.v2-secondary,.v2-danger{width:100%;margin-top:10px;padding:9px 11px;border-radius:10px;color:var(--v2-ui);font-weight:700}.v2-primary{border:0;background:linear-gradient(100deg,#7c3aed,#db2777);box-shadow:0 8px 22px #7c3aed44;color:#fff}.v2-primary:hover{filter:brightness(1.12)}.v2-secondary{border:1px solid var(--v2-edge-strong);background:var(--v2-fill)}.v2-danger{border:1px solid #fb718544;background:#fb71850e;color:var(--v2-danger-text)}.v2-note{margin:9px 0 0;color:var(--v2-muted);font-size:10px;line-height:1.45}
.v2-font-control{display:grid;gap:6px}.v2-font-custom[hidden],.v2-google-row[hidden]{display:none}.v2-google-row{display:grid;grid-template-columns:1fr auto;gap:6px}.v2-google-row button{padding:6px 10px;border:1px solid var(--v2-edge-strong);border-radius:8px;background:var(--v2-fill);color:var(--v2-ui);font-weight:700}.v2-font-status{min-height:14px;color:var(--v2-muted);font-size:10px}.v2-font-status[data-state=failed]{color:var(--v2-danger-text)}.v2-font-status[data-state=loaded]{color:var(--v2-status)}.v2-profile-item{display:grid;grid-template-columns:1fr auto;gap:6px}.v2-profile-list button.active{border-color:var(--v2-accent-strong);background:linear-gradient(90deg,#7c3aed26,#db277712);color:var(--v2-accent-text);font-weight:700}.v2-profile-badge{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:10px 0 0;padding:8px 10px;border:1px solid var(--v2-accent-strong);border-radius:10px;background:#7c3aed14;font-size:11px}.v2-profile-badge button{padding:4px 9px;border:1px solid var(--v2-edge-strong);border-radius:8px;background:var(--v2-fill);color:var(--v2-ui);font-size:10px;font-weight:700}.v2-profile-item .v2-remove{padding:0 11px;color:var(--v2-danger-text)}
.venus2-dialog{position:fixed;z-index:2147483647;inset:0;display:grid;place-items:center;padding:18px;background:var(--v2-scrim);backdrop-filter:blur(8px)}.v2-studio{display:flex;flex-direction:column;width:min(1040px,96vw);height:min(760px,92vh);overflow:hidden;border:1px solid var(--v2-studio-edge);border-radius:20px;background:var(--v2-studio-bg)!important;color:var(--v2-ui);box-shadow:0 30px 100px var(--v2-shadow-deep)}.v2-studio-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:17px 20px;border-bottom:1px solid var(--v2-edge)}.v2-studio-head h2{margin:2px 0 0;font:750 19px Georgia,serif;letter-spacing:.06em}.v2-close{display:grid;place-items:center;width:34px;height:34px;border:1px solid var(--v2-edge-strong);border-radius:50%;background:var(--v2-fill);color:var(--v2-ui);font-size:18px}.v2-toolbar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:10px 20px;border-bottom:1px solid var(--v2-edge);background:var(--v2-fill)}.v2-toolbar .v2-field{display:block}.v2-toolbar .v2-field>label{display:block;margin-bottom:4px;color:var(--v2-faint);font:700 8px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}.v2-studio-body{display:grid;grid-template-columns:178px minmax(0,1fr);min-height:0;flex:1}.v2-nav{padding:14px;border-right:1px solid var(--v2-edge);background:var(--v2-nav-bg)}.v2-nav button{display:flex;width:100%;align-items:center;gap:9px;margin:2px 0;padding:9px 10px;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--v2-nav-text);text-align:left}.v2-nav button:hover{background:var(--v2-fill-hover);color:var(--v2-nav-hover)}.v2-nav button.active{border-color:#c084fc3b;background:linear-gradient(90deg,#7c3aed33,#db277716);color:var(--v2-nav-active)}.v2-stage{min-width:0;overflow:auto;padding:20px!important;background:transparent!important}.v2-stage h3{margin:0;font:750 21px Georgia,serif;letter-spacing:.04em}.v2-stage-lead{margin:5px 0 18px;color:var(--v2-muted)}.v2-theme-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}.v2-theme-card{position:relative;min-width:0;padding:10px;border:1px solid var(--v2-edge);border-radius:14px;background:var(--v2-fill);color:var(--v2-ui);text-align:left;transition:transform .2s,border-color .2s,background .2s}.v2-theme-card:hover{transform:translateY(-2px);border-color:#c084fc66;background:var(--v2-fill-hover)}.v2-theme-card.active{border-color:var(--p,#d8b4fe);box-shadow:0 0 0 2px color-mix(in srgb,var(--p,#d8b4fe) 20%,transparent),0 12px 32px var(--v2-shadow)}.v2-theme-card .v2-preview{margin:0 0 9px;padding:8px}.v2-theme-card h4{margin:0;font-size:12px}.v2-theme-card p{height:30px;margin:4px 0 0;overflow:hidden;color:var(--v2-muted);font-size:10px;line-height:1.45}.v2-search{width:100%;margin:0 0 13px;padding:9px 11px;border:1px solid var(--v2-edge-strong);border-radius:10px;background:var(--v2-input);color:var(--v2-input-text);outline:none}.v2-section{max-width:720px;padding:15px;border:1px solid var(--v2-edge);border-radius:14px;background:var(--v2-fill)}.v2-section+.v2-section{margin-top:12px}.v2-section h4{margin:0 0 12px}.v2-section .v2-field+.v2-field{margin-top:11px}.v2-section textarea{width:100%;min-height:150px;resize:vertical;padding:10px;border:1px solid var(--v2-edge-strong);border-radius:10px;background:var(--v2-input);color:var(--v2-code-text);font:11px/1.5 ui-monospace,monospace}.v2-profile-row{display:flex;gap:8px}.v2-profile-row input{flex:1;padding:8px;border:1px solid var(--v2-edge-strong);border-radius:9px;background:var(--v2-input);color:var(--v2-input-text)}.v2-profile-row button{padding:8px 12px;border:0;border-radius:9px;background:#7c3aed;color:#fff;font-weight:700}.v2-profile-list{display:grid;gap:7px;margin-top:12px}.v2-profile-list button{padding:9px;border:1px solid var(--v2-edge);border-radius:9px;background:var(--v2-fill);color:var(--v2-ui);text-align:left}.v2-status{min-height:18px;margin:8px 0 0;color:var(--v2-status);font-size:11px}
@keyframes v2-preview-drift{to{background-position:35px -28px;filter:brightness(1.35) saturate(1.18)}}
@media(max-width:820px){.v2-theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.v2-studio-body{grid-template-columns:140px minmax(0,1fr)}}@media(max-width:600px){.venus2-dialog{padding:0}.v2-studio{width:100vw;height:100vh;border-radius:0}.v2-toolbar{grid-template-columns:1fr}.v2-studio-body{display:block}.v2-nav{display:flex;gap:5px;overflow-x:auto;border-right:0;border-bottom:1px solid var(--v2-edge)}.v2-nav button{width:auto;white-space:nowrap}.v2-stage{padding:14px!important}.v2-theme-grid{grid-template-columns:1fr}.v2-field{grid-template-columns:1fr}.v2-theme-card p{height:auto}}
@media(prefers-reduced-motion:reduce){.venus2 *,.venus2-dialog *{animation:none!important;transition:none!important}}
`

type Tab = 'Library' | 'Typography' | 'Layout' | 'Portraits' | 'Effects' | 'Profiles' | 'Data'
type EditLayer = 'global' | 'theme' | 'mode'

const SYSTEM_FONTS = [
  ['Georgia · readable serif', 'Georgia, "Times New Roman", serif'],
  ['Palatino · humanist serif', '"Palatino Linotype", Palatino, serif'],
  ['Garamond · literary serif', 'Garamond, "Times New Roman", serif'],
  ['Segoe / system · clean sans', 'system-ui, "Segoe UI", Arial, sans-serif'],
  ['Verdana · wide sans', 'Verdana, Geneva, sans-serif'],
  ['Consolas · technical mono', 'Consolas, "Courier New", monospace'],
] as const
/** Curated reading faces that ship inside the extension (see src/fonts/catalog.ts). */
const BUNDLED_FONTS = [
  ['EB Garamond · classical serif', '"EB Garamond", Garamond, Georgia, serif'],
  ['Cormorant Garamond · display serif', '"Cormorant Garamond", Garamond, Georgia, serif'],
  ['Lora · warm serif', 'Lora, Georgia, serif'],
  ['Literata · book serif', 'Literata, Georgia, serif'],
  ['Source Serif 4 · modern serif', '"Source Serif 4", Georgia, serif'],
  ['Crimson Pro · old-style serif', '"Crimson Pro", Garamond, Georgia, serif'],
  ['Spectral · screen serif', 'Spectral, Georgia, serif'],
  ['Libre Baskerville · elegant serif', '"Libre Baskerville", Baskerville, Georgia, serif'],
  ['Fraunces · soft display serif', 'Fraunces, Georgia, serif'],
  ['Playfair Display · fashion serif', '"Playfair Display", Didot, Georgia, serif'],
  ['Alegreya · calligraphic serif', 'Alegreya, "Palatino Linotype", serif'],
  ['DM Sans · geometric sans', '"DM Sans", "Segoe UI", sans-serif'],
  ['Work Sans · friendly sans', '"Work Sans", "Segoe UI", sans-serif'],
  ['Manrope · modern sans', 'Manrope, "Segoe UI", sans-serif'],
  ['Figtree · rounded sans', 'Figtree, "Segoe UI", sans-serif'],
  ['Atkinson Hyperlegible · accessible sans', '"Atkinson Hyperlegible", Verdana, sans-serif'],
  ['Space Grotesk · techno sans', '"Space Grotesk", "Segoe UI", sans-serif'],
  ['IBM Plex Mono · mono', '"IBM Plex Mono", Consolas, monospace'],
  ['Courier Prime · typewriter', '"Courier Prime", "Courier New", monospace'],
] as const
const FONT_OPTIONS = [...BUNDLED_FONTS, ...SYSTEM_FONTS]
const uuid = () => { try { return crypto.randomUUID() } catch { return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}` } }

function node<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  if (text !== undefined) el.textContent = text
  return el
}
function button(text: string, className?: string) {
  const el = node('button', text); el.type = 'button'; if (className) el.className = className; return el
}
function selectedSkin(s: VenusSettings, theme: VenusThemeFamily) {
  const key = s.skinPreference === 'auto' ? (document.documentElement.dataset.themeMode === 'light' ? 'light' : 'dark') : s.skinPreference
  return theme.skins[key]
}
function decorate(el: HTMLElement, theme: VenusThemeFamily, settings: VenusSettings) {
  const skin = selectedSkin(settings, theme)
  const art = artFor(theme, skin === theme.skins.light ? 'light' : 'dark')
  el.style.setProperty('--p', skin.accent)
  el.style.setProperty('--s', skin.accentSoft)
  el.style.setProperty('--surface', skin.surface)
  el.style.setProperty('--left', art.panelLeft)
  el.style.setProperty('--right', art.panelRight)
  el.style.setProperty('--plaque', art.plaque)
  el.style.setProperty('--portrait-radius', art.portraitRadius)
  el.style.setProperty('--plaque-radius', art.plaqueRadius)
  el.style.setProperty('--heading', art.headingFont)
}
function preview(theme: VenusThemeFamily, settings: VenusSettings, compact = false) {
  const box = node('div'); box.className = 'v2-preview'; box.dataset.panelLayout = artFor(theme, selectedSkin(settings, theme) === theme.skins.light ? 'light' : 'dark').panelLayout ?? 'drift'; decorate(box, theme, settings)
  const tri = node('div'); tri.className = 'v2-triptych'; tri.append(node('i'), (() => { const x = node('div'); x.className = 'v2-face'; return x })(), node('i'))
  const plaque = node('div', compact ? theme.name : `${theme.name} · triptych`); plaque.className = 'v2-plaque'
  box.append(tri, plaque); return box
}
function selectField<T extends string>(label: string, value: T, entries: readonly (readonly [string, T])[], set: (v: T) => void) {
  const row = node('div'); row.className = 'v2-field'; const lab = node('label', label); const input = node('select'); input.setAttribute('aria-label', label)
  for (const [name, key] of entries) { const option = new Option(name, key); option.selected = key === value; input.add(option) }
  input.onchange = () => set(input.value as T); row.append(lab, input); return row
}
function rangeField(label: string, value: number, min: number, max: number, step: number, set: (v: number) => void, suffix = '') {
  const row = node('div'); row.className = 'v2-field'; const lab = node('label', label); const wrap = node('div'); wrap.className = 'v2-range'; const input = node('input'); input.type = 'range'; input.min = String(min); input.max = String(max); input.step = String(step); input.value = String(value); input.setAttribute('aria-label', label); const out = node('output', `${value}${suffix}`)
  input.oninput = () => { out.value = input.value; out.textContent = `${input.value}${suffix}`; set(Number(input.value)) }; wrap.append(input, out); row.append(lab, wrap); return row
}
interface FontFieldContext { loader: FontLoader; googleFamilies: readonly string[]; addGoogle: (family: string) => void; track: (dispose: () => void) => void }
function fontField(label: string, value: string | null, set: (v: string | null) => void, fx: FontFieldContext) {
  const row = node('div'); row.className = 'v2-field'; const lab = node('label', label); const controls = node('div'); controls.className = 'v2-font-control'; const select = node('select'); select.setAttribute('aria-label', `${label} preset`)
  select.add(new Option('Theme signature', ''))
  const group = (name: string, entries: readonly (readonly [string, string])[]) => { const g = document.createElement('optgroup'); g.label = name; for (const [text, stack] of entries) g.append(new Option(text, stack)); select.append(g) }
  group('Bundled with VENUS', BUNDLED_FONTS)
  group('System fonts', SYSTEM_FONTS)
  const googleKey = '__google__'; const customKey = '__custom__'
  const more = document.createElement('optgroup'); more.label = 'More'; more.append(new Option('Google Fonts family…', googleKey), new Option('Custom font stack…', customKey)); select.append(more)
  const first = stackFamilies(value)[0]
  const isGoogle = !!first && fx.googleFamilies.some((family) => family.toLowerCase() === first.toLowerCase())
  const known = value == null || FONT_OPTIONS.some(([, stack]) => stack === value)
  select.value = isGoogle ? googleKey : known ? value ?? '' : customKey
  const google = node('div'); google.className = 'v2-google-row'; google.hidden = select.value !== googleKey
  const family = node('input'); family.type = 'text'; family.placeholder = 'Family name, e.g. Playfair Display'; family.value = isGoogle ? first : ''; family.setAttribute('aria-label', `${label} Google Fonts family`)
  const load = button('Load'); google.append(family, load)
  const status = node('div'); status.className = 'v2-font-status'; status.setAttribute('aria-live', 'polite')
  const showStatus = () => {
    const name = cleanFamilyName(family.value)
    const loadState = select.value === googleKey && name ? fx.loader.status(name, 'google') : undefined
    status.dataset.state = loadState ?? ''
    status.textContent = loadState === 'loaded' ? `${name} is loaded from Google Fonts.` : loadState === 'failed' ? `Google Fonts has no family called “${name}”, or it could not be reached.` : loadState === 'loading' ? `Loading ${name}…` : select.value === googleKey ? 'Any family from fonts.google.com. Needs an internet connection.' : ''
  }
  fx.track(fx.loader.subscribe(showStatus))
  const commitGoogle = () => { const name = cleanFamilyName(family.value); if (!name) return; family.value = name; fx.addGoogle(name); set(`"${name}", system-ui, sans-serif`) }
  load.onclick = commitGoogle; family.onkeydown = (event) => { if (event.key === 'Enter') commitGoogle() }
  const custom = node('input'); custom.type = 'text'; custom.className = 'v2-font-custom'; custom.placeholder = 'Example: "EB Garamond", Georgia, serif'; custom.value = !known && !isGoogle ? value ?? '' : ''; custom.hidden = select.value !== customKey; custom.setAttribute('aria-label', `${label} custom stack`)
  select.onchange = () => {
    custom.hidden = select.value !== customKey; google.hidden = select.value !== googleKey; showStatus()
    if (select.value === customKey) { custom.focus(); return }
    if (select.value === googleKey) { family.focus(); return }
    set(select.value || null)
  }
  custom.onchange = () => set(custom.value.trim() || null)
  showStatus()
  controls.append(select, google, custom, status); row.append(lab, controls); return row
}
function switchRow(label: string, hint: string, value: boolean, set: (v: boolean) => void) {
  const row = node('label'); row.className = 'v2-toggle'; const copy = node('span'); copy.append(node('strong', label), node('small', hint)); const toggle = node('span'); toggle.className = 'v2-switch'; const input = node('input'); input.type = 'checkbox'; input.checked = value; input.setAttribute('aria-label', label); input.onchange = () => set(input.checked); toggle.append(input, node('i')); row.append(copy, toggle); return row
}

export function mountPanel(root: HTMLElement, _ctx: SpindleFrontendContext, fonts: FontLoader) {
  const style = node('style'); style.textContent = css; document.head.append(style); root.className = 'venus2'
  let modal: HTMLElement | undefined
  let studioView: HTMLElement | undefined
  let activeTab: Tab = 'Library'
  let editLayer: EditLayer = 'global'
  let status = ''
  let librarySearch = ''
  let pendingReset = false
  let disposers: (() => void)[] = []
  const track = (dispose: () => void) => { disposers.push(dispose) }
  const dispose = () => { for (const fn of disposers) fn(); disposers = [] }

  const activeTheme = () => VENUS_THEMES.find((item) => item.id === state.get().activeThemeId) ?? VENUS_THEMES[0]
  const patchTuning = (patch: Partial<Tuning>) => {
    const s = state.get(); const id = activeTheme().id
    if (editLayer === 'global') {
      // With a profile in use, the "All themes" layer is the profile itself, so edits stay with it.
      const profile = activeProfile(s)
      if (profile) { state.patch({ profiles: s.profiles.map((x) => x.id === profile.id ? { ...x, tuning: { ...x.tuning, ...patch } } : x) }); return }
      state.patch({ global: { ...s.global, ...patch } }); return
    }
    const current = s.themeOverrides[id] ?? {}
    if (editLayer === 'theme') { state.patch({ themeOverrides: { ...s.themeOverrides, [id]: { ...current, ...patch } } }); return }
    const mode = s.previewMode
    state.patch({ themeOverrides: { ...s.themeOverrides, [id]: { ...current, modes: { ...current.modes, [mode]: { ...current.modes?.[mode], ...patch } } } } })
  }
  /** Skin, scope and font choices: written to the active profile when there is one. */
  const patchAppearance = (patch: Partial<ProfileAppearance>) => {
    const s = state.get(); const profile = activeProfile(s)
    if (profile) { state.patch({ profiles: s.profiles.map((x) => x.id === profile.id ? { ...x, appearance: { ...x.appearance, ...patch } } : x) }); return }
    state.patch(patch)
  }
  const resetLayer = () => {
    const s = state.get(); const id = activeTheme().id
    // Resetting the global layer also stops using the profile; the profile itself is kept.
    if (editLayer === 'global') { state.patch({ global: { ...DEFAULTS.global }, activeProfileId: null }); return }
    const overrides = { ...s.themeOverrides }; const current = { ...(overrides[id] ?? {}) }
    if (editLayer === 'theme') { const modes = current.modes; overrides[id] = modes ? { modes } : {}; state.patch({ themeOverrides: overrides }); return }
    const modes = { ...(current.modes ?? {}) }; delete modes[s.previewMode]; overrides[id] = { ...current, modes }; state.patch({ themeOverrides: overrides })
  }

  const renderQuick = () => {
    const raw = state.get(); const s = effectiveSettings(raw); const theme = activeTheme(); const skin = selectedSkin(s, theme); const profile = activeProfile(raw)
    root.replaceChildren()
    const hero = node('section'); hero.className = 'v2-hero'; hero.append(node('div', 'Theme engine · maximalist edition'))
    hero.firstElementChild!.className = 'v2-kicker'; hero.append(node('h2', 'VENUS 2.0'), node('p', `${VENUS_THEMES.length} living worlds, paired skins, and a portrait-first message system.`)); hero.querySelector('h2')!.className = 'v2-title'; hero.querySelector('p')!.className = 'v2-copy'; const version = node('span', 'V2 · PRODUCTION'); version.className = 'v2-version'; hero.append(version); root.append(hero)
    root.append(switchRow('VENUS is active', 'Applies the selected family live', s.enabled, (enabled) => state.patch({ enabled })))
    const art = preview(theme, s, true); const now = node('div'); now.className = 'v2-now'; const copy = node('div'); copy.append(node('strong', theme.name), node('small', s.skinPreference === 'auto' ? 'Following Lumiverse appearance' : `${s.skinPreference} skin`)); const swatches = node('span'); swatches.className = 'v2-swatches'; for (const color of [skin.background, skin.surface, skin.accent, skin.accentSoft]) { const dot = node('i'); dot.style.background = color; swatches.append(dot) } now.append(copy, swatches); art.append(now); root.append(art)
    const fields = node('div'); fields.className = 'v2-fields'
    fields.append(
      selectField('Theme family', theme.id, VENUS_THEMES.map((x) => [x.name, x.id] as const), (activeThemeId) => state.patch({ activeThemeId })),
      selectField('Skin', s.skinPreference, [['Follow Lumiverse','auto'],['Light','light'],['Dark','dark']] as const, (skinPreference) => patchAppearance({ skinPreference })),
      selectField('Apply to', s.scope, [['Whole app','app'],['Chat only','chat']] as const, (scope) => patchAppearance({ scope })),
      selectField('Tuning profile', raw.activeProfileId ?? '', [['None · global settings', ''], ...raw.profiles.map((x) => [x.name, x.id] as const)], (id) => state.patch({ activeProfileId: id || null })),
    )
    root.append(fields)
    if (profile) root.append(Object.assign(node('p', `Profile “${profile.name}” is active on every theme. Changes to shared settings are saved into it.`), { className: 'v2-note' }))
    const open = button('Open Customizer Studio', 'v2-primary'); open.onclick = openStudio; root.append(open)
    root.append(Object.assign(node('p', 'Minimal uses one moving vertical light strip. Bubble uses two rectangular animated art panels around a tall portrait. Portrait shine is disabled.'), { className: 'v2-note' }))
  }

  const renderStudio = () => {
    if (!studioView) return
    dispose()
    const scroll = studioView.scrollTop
    const raw = state.get(); const s = effectiveSettings(raw); const profile = activeProfile(raw); const theme = activeTheme(); const t = resolveTuning(raw); studioView.replaceChildren()
    const heading = node('h3', activeTab); const lead = node('p'); lead.className = 'v2-stage-lead'; lead.textContent = ({ Library:'Choose a complete art direction. Every family includes a dedicated light and dark skin.', Typography:'Tune the reading voice without flattening the theme’s own display style.', Layout:'Control message rhythm and text measure while preserving the portrait-stage composition.', Portraits:'Resize and reshape both Minimal and Bubble portraits together.', Effects:'Control background motion, panel motion, and material opacity.', Profiles:'Save every setting as a reusable profile. The profile you select stays active on every theme until you stop using it or reset.', Data:'Export, validate, import, or reset VENUS 2.0 settings.' } as const)[activeTab]; studioView.append(heading, lead)
    if (profile && activeTab !== 'Library' && activeTab !== 'Profiles') { const badge = node('div'); badge.className = 'v2-profile-badge'; const stop = button('Stop using'); stop.onclick = () => { state.patch({ activeProfileId: null }); status = `Stopped using “${profile.name}”.`; renderStudio() }; badge.append(node('span', editLayer === 'global' ? `Editing profile “${profile.name}”` : `Profile “${profile.name}” is active`), stop); studioView.append(badge) }
    const section = () => { const el = node('section'); el.className = 'v2-section'; return el }
    if (activeTab === 'Library') {
      const search = node('input'); search.type = 'search'; search.className = 'v2-search'; search.placeholder = 'Search royal, botanical, neon, gothic…'; search.value = librarySearch; search.setAttribute('aria-label', 'Search theme families'); const grid = node('div'); grid.className = 'v2-theme-grid'
      fonts.ensure(VENUS_THEMES.map((item) => stackFamilies(artFor(item, selectedSkin(s, item) === item.skins.light ? 'light' : 'dark').headingFont)[0]).filter(Boolean), s.fontSource, s.googleFamilies)
      const draw = () => { librarySearch = search.value; const q = search.value.trim().toLowerCase(); grid.replaceChildren(...VENUS_THEMES.filter((x) => `${x.name} ${x.description} ${x.keywords.join(' ')}`.toLowerCase().includes(q)).map((item) => { const card = button(''); card.className = `v2-theme-card${item.id === state.get().activeThemeId ? ' active' : ''}`; decorate(card, item, s); card.append(preview(item, s, true), node('h4', item.name), node('p', item.description)); card.onclick = () => state.patch({ activeThemeId: item.id }); return card })) }; search.oninput = draw; draw(); studioView.append(search, grid)
    }
    if (activeTab === 'Typography') { const box = section(); const fx: FontFieldContext = { loader: fonts, googleFamilies: s.googleFamilies, addGoogle: (family) => { const list = effectiveSettings(state.get()).googleFamilies; if (!list.some((x) => x.toLowerCase() === family.toLowerCase())) patchAppearance({ googleFamilies: [...list, family].slice(-16) }) }, track }
      const source = section(); source.append(node('h4', 'Font source'), selectField('Theme typefaces', s.fontSource, [['Bundled · works offline','bundled'],['Google Fonts · every script, true italics','google'],['System fonts only','system']] as const, (fontSource: FontSource) => { patchAppearance({ fontSource }); renderStudio() }), Object.assign(node('p', s.fontSource === 'bundled' ? 'Every theme typeface ships inside VENUS (Latin characters). Nothing is downloaded.' : s.fontSource === 'google' ? 'Theme typefaces load from fonts.google.com with every script and true italics. Needs an internet connection; system fonts stand in while offline.' : 'Themes use the closest fonts already installed on this device. Nothing is downloaded.'), { className: 'v2-note' })); studioView.append(source)
      box.append(node('h4', 'Reading system'), fontField('Body typeface', t.bodyFont, (bodyFont) => patchTuning({ bodyFont }), fx), fontField('Display typeface', t.headingFont, (headingFont) => patchTuning({ headingFont }), fx), switchRow('Curly quotation marks', 'Displays straight double quotes as typographic “smart quotes” without changing saved messages', t.curlyQuotes, (curlyQuotes) => patchTuning({ curlyQuotes })), rangeField('Text scale', t.bodyScale, .8, 1.5, .05, (bodyScale) => patchTuning({ bodyScale })), rangeField('Line height', t.lineHeight, 1.2, 2.4, .05, (lineHeight) => patchTuning({ lineHeight })), rangeField('Tracking', t.letterSpacing, -.03, .12, .01, (letterSpacing) => patchTuning({ letterSpacing }), 'em')); studioView.append(box) }
    if (activeTab === 'Layout') { const box = section(); box.append(node('h4', 'Message geometry'), selectField('Text alignment', t.textAlign, [['Left','left'],['Centered','center'],['Justified','justify']] as const, (textAlign: TextAlignment) => patchTuning({ textAlign })), rangeField('Card padding', t.cardPadding, 4, 40, 1, (cardPadding) => patchTuning({ cardPadding }), 'px'), rangeField('Message gap', t.messageGap, 0, 64, 1, (messageGap) => patchTuning({ messageGap }), 'px'), rangeField('Text measure', t.contentWidth ?? 120, 30, 120, 1, (contentWidth) => patchTuning({ contentWidth }), 'ch')); const clear = button('Use full available text width', 'v2-secondary'); clear.onclick = () => patchTuning({ contentWidth: null }); box.append(clear); studioView.append(box) }
    if (activeTab === 'Portraits') { const box = section(); box.append(node('h4', 'Portrait stage'), selectField('Shape', t.portraitShape, [['Theme signature','theme'],['Circle','circle'],['Rounded','rounded'],['Squircle','squircle'],['Arch','arch'],['Oval','oval'],['Pill','pill'],['Square','square']] as const, (portraitShape: PortraitShape) => patchTuning({ portraitShape })), selectField('Image fit', t.portraitFit, [['Theme default','theme'],['Crop / cover','cover'],['Whole image','contain']] as const, (portraitFit) => patchTuning({ portraitFit })), rangeField('Portrait width', t.portraitSize, 160, 520, 4, (portraitSize) => patchTuning({ portraitSize }), 'px'), switchRow('Soft lower fade', 'Keeps the face intact and dissolves the lower edge', t.portraitFade, (portraitFade) => patchTuning({ portraitFade }))); studioView.append(box) }
    if (activeTab === 'Effects') { const box = section(); box.append(preview(theme, s), selectField('Motion', t.motion, [['Follow system','system'],['Full motion','full'],['Reduced','reduced'],['Off','off']] as const, (motion) => patchTuning({ motion })), switchRow('Animated background', 'Two smooth ambient layers behind the interface', t.backgrounds, (backgrounds) => patchTuning({ backgrounds })), rangeField('Material opacity', t.panelOpacity, .2, 1, .01, (panelOpacity) => patchTuning({ panelOpacity }))); studioView.append(box) }
    if (activeTab === 'Profiles') {
      const box = section(); box.append(node('h4', 'Reusable profiles'))
      box.append(Object.assign(node('p', 'A profile stores every shared setting: fonts, text size and spacing, portrait size and shape, motion, background, opacity, skin, scope and font source. Per-family overrides still apply on top of it.'), { className: 'v2-note' }))
      const row = node('div'); row.className = 'v2-profile-row'; row.style.marginTop = '12px'; const input = node('input'); input.placeholder = 'Profile name'; input.setAttribute('aria-label', 'Profile name'); input.maxLength = 60
      const save = button('Save & use'); save.onclick = () => { const name = input.value.trim(); if (!name) { status = 'Give the profile a name first.'; renderStudio(); return } const created = snapshotProfile(state.get(), uuid(), name); state.patch({ profiles: [...state.get().profiles, created].slice(-24), activeProfileId: created.id }); status = `Saved “${name}” and made it active.`; renderStudio() }
      input.onkeydown = (event) => { if (event.key === 'Enter') save.click() }
      row.append(input, save)
      const list = node('div'); list.className = 'v2-profile-list'
      const none = button(profile ? 'Stop using a profile · back to global settings' : '✓ No profile · global settings'); if (!profile) none.classList.add('active'); none.onclick = () => { state.patch({ activeProfileId: null }); status = profile ? `Stopped using “${profile.name}”.` : ''; renderStudio() }; list.append(none)
      for (const item of raw.profiles) {
        const on = item.id === raw.activeProfileId
        const entry = node('div'); entry.className = 'v2-profile-item'
        const use = button(on ? `✓ ${item.name} · active` : `Use · ${item.name}`); if (on) use.classList.add('active'); use.setAttribute('aria-pressed', String(on))
        use.onclick = () => { state.patch({ activeProfileId: on ? null : item.id }); status = on ? `Stopped using “${item.name}”.` : `“${item.name}” is now active on every theme.`; renderStudio() }
        const remove = button('×', 'v2-remove'); remove.setAttribute('aria-label', `Delete profile ${item.name}`); remove.onclick = () => { const next = state.get(); state.patch({ profiles: next.profiles.filter((x) => x.id !== item.id), activeProfileId: next.activeProfileId === item.id ? null : next.activeProfileId }); status = `Deleted “${item.name}”.`; renderStudio() }
        entry.append(use, remove); list.append(entry)
      }
      box.append(row, list); studioView.append(box)
    }
    if (activeTab === 'Data') { const box = section(); box.append(node('h4', 'Portable settings')); const area = node('textarea'); area.placeholder = 'Paste VENUS 2.0 settings JSON here'; area.setAttribute('aria-label', 'VENUS settings JSON'); const exportButton = button('Copy settings JSON', 'v2-secondary'); exportButton.onclick = async () => { try { await navigator.clipboard.writeText(JSON.stringify(state.get(), null, 2)); status = 'Settings copied to the clipboard.' } catch { area.value = JSON.stringify(state.get(), null, 2); status = 'Clipboard unavailable; the JSON is in the text box.' } renderStudio() }; const importButton = button('Import validated JSON', 'v2-primary'); importButton.onclick = () => { try { const raw = JSON.parse(area.value) as { version?: unknown }; if (raw.version !== 2 && raw.version !== 3 && raw.version !== 4) throw new Error(); state.replace(migrate(raw)); status = 'Settings imported and normalized.' } catch { status = 'Import failed: paste valid VENUS 2.0 JSON.' } renderStudio() }; const reset = button(pendingReset ? 'Click again to reset everything' : 'Reset all VENUS 2.0 settings', 'v2-danger'); reset.onclick = () => { if (!pendingReset) { pendingReset = true; status = 'This clears every setting, override and profile.'; renderStudio(); return } pendingReset = false; state.replace(structuredClone(DEFAULTS)); status = 'VENUS 2.0 was reset.'; renderStudio() }; box.append(area, exportButton, importButton, reset); studioView.append(box) }
    if (activeTab !== 'Library' && activeTab !== 'Data') { const reset = button(`Reset ${editLayer === 'global' ? (profile ? 'and stop using the profile' : 'global tuning') : editLayer === 'theme' ? 'this family' : `${s.previewMode} overrides`}`, 'v2-danger'); reset.onclick = () => { resetLayer(); status = 'The current editing layer was reset.'; renderStudio() }; studioView.append(reset) }
    const message = node('div', status); message.className = 'v2-status'; message.setAttribute('aria-live', 'polite'); studioView.append(message)
    studioView.scrollTop = scroll
  }

  let refreshToolbar: (() => void) | undefined
  const openStudio = () => {
    modal?.remove(); status = ''; activeTab = 'Library'
    const shell = node('div'); shell.className = 'venus2-dialog'; shell.tabIndex = -1; shell.setAttribute('role', 'dialog'); shell.setAttribute('aria-modal', 'true'); shell.setAttribute('aria-label', 'VENUS 2.0 Customizer Studio')
    const studio = node('article'); studio.className = 'v2-studio'; const head = node('header'); head.className = 'v2-studio-head'; const title = node('div'); const kicker = node('div', 'VENUS 2.0 · live customizer'); kicker.className = 'v2-kicker'; title.append(kicker, node('h2', 'Customizer Studio')); const close = button('×', 'v2-close'); close.setAttribute('aria-label', 'Close customizer'); close.onclick = () => { shell.remove(); modal = undefined; pendingReset = false; dispose() }; head.append(title, close)
    const toolbar = node('div'); toolbar.className = 'v2-toolbar'; refreshToolbar = () => { const s = state.get(); toolbar.replaceChildren(selectField('Editing layer', editLayer, [[activeProfile(s) ? `Profile · ${activeProfile(s)!.name}` : 'All themes','global'],['This family','theme'],['Family + mode','mode']] as const, (value) => { editLayer = value; refreshToolbar!(); renderStudio() }), selectField('Mode overrides', s.previewMode, [['Minimal','minimal'],['Bubble triptych','bubble']] as const, (previewMode) => { state.patch({ previewMode }); refreshToolbar!(); renderStudio() }), selectField('Theme family', activeTheme().id, VENUS_THEMES.map((x) => [x.name, x.id] as const), (activeThemeId) => { state.patch({ activeThemeId }); refreshToolbar!(); renderStudio() })) }; refreshToolbar()
    const body = node('div'); body.className = 'v2-studio-body'; const nav = node('nav'); nav.className = 'v2-nav'; studioView = node('main'); studioView.className = 'v2-stage'; const tabs: Tab[] = ['Library','Typography','Layout','Portraits','Effects','Profiles','Data']; for (const tab of tabs) { const item = button(tab); if (tab === activeTab) item.classList.add('active'); item.onclick = () => { activeTab = tab; pendingReset = false; studioView!.scrollTop = 0; for (const child of Array.from(nav.children)) child.classList.toggle('active', child === item); renderStudio() }; nav.append(item) } body.append(nav, studioView); studio.append(head, toolbar, body); shell.append(studio); document.body.append(shell); modal = shell; shell.onclick = (event) => { if (event.target === shell) close.click() }; shell.onkeydown = (event) => { if (event.key === 'Escape') close.click() }; renderStudio(); close.focus()
  }

  let lastProfile: string | null = state.get().activeProfileId
  const refresh = () => {
    renderQuick()
    // Re-render the studio when the library is showing or the active profile changed, so every control shows the values in effect.
    const profileChanged = state.get().activeProfileId !== lastProfile; lastProfile = state.get().activeProfileId
    if (modal?.isConnected && (activeTab === 'Library' || profileChanged)) { renderStudio(); refreshToolbar?.() }
  }
  renderQuick()
  return { refresh, destroy: () => { dispose(); modal?.remove(); style.remove(); root.replaceChildren() } }
}
