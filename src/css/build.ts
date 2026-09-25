import type { VenusSettings, PortraitShape } from '../settings/schema'
import { resolveTuning } from '../settings/schema'
import type { VenusPanelInterior, VenusThemeFamily } from '../themes'
import { artFor } from '../themes/types'
import { BACKDROP, buildBackdropCSS } from './backdrop'

const MIN = '[data-component="MinimalMessage"]'
const BUB = '[data-component="BubbleMessage"]'
const CONTENT = '[data-component="MessageContent"]'
const CHAT = '[data-component="ChatView"]'
const LIST = '[data-component="MessageList"]'
const AVATAR = '[class*="_avatar_" i]:not([class*="_avatarFallback_" i])'
const MIN_AVATAR = `${MIN}[data-part] > ${AVATAR}`
const MIN_BUBBLE = `${MIN}[data-part] > [class*="_bubble_" i]`
const MIN_HEADER = `${MIN_BUBBLE} > [class*="_header_" i]`
const BUB_CARD = `${BUB}[data-part]`
const BUBBLE = `${BUB_CARD} > [class*="_bubble_" i]`
const BUB_HEADER = `${BUBBLE} > [class*="_header_" i]`
const HEADER_LEFT = `${BUB_HEADER} > [class*="_headerLeft_" i]`
const BUB_AVATAR = `${HEADER_LEFT} > ${AVATAR}`
const META_WRAP = `${HEADER_LEFT} > [class*="_metaWrap_" i]`
const PANEL_MOUNT = `${BUB_HEADER} > [data-spindle-mount="message_header"]`
const PANEL = `${PANEL_MOUNT} > [data-venus2-panel]`
const BUB_CONTENT = `${BUBBLE} > [class*="_content_" i]`
const NAME = '[class*="_name_" i]'
const META = '[class*="_metaPill_" i]'

// CSS cache to avoid regenerating identical CSS
const themeCache = new Map<string, string>()
const tuningCache = new Map<string, string>()

export function resolveSkin(theme: VenusThemeFamily, preference: VenusSettings['skinPreference']): 'light' | 'dark' {
  if (preference !== 'auto') return preference
  return typeof document !== 'undefined' && document.documentElement.dataset.themeMode === 'light' ? 'light' : 'dark'
}

function tokenSelector(scope: VenusSettings['scope']) { return scope === 'chat' ? CHAT : ':root' }
function radius(shape: PortraitShape): string | null {
  return ({ theme: null, circle: '50%', rounded: '18px', squircle: '32% / 28%', arch: '48% 48% 9% 9% / 62% 62% 8% 8%', oval: '50% / 42%', pill: '999px', square: '0' })[shape]
}
function cssContent(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\A ')}"`
}
/** One wing's authored interior. Objects keep their own layer sizes, so the background is not !important and stays animatable. */
function interiorCSS(side: 'left' | 'right', interior: VenusPanelInterior | undefined): string {
  if (!interior) return ''
  const d: string[] = []
  if (interior.object) { if (!interior.keepGlyph) d.push('content:""!important'); d.push(`background:${interior.object}`) }
  if (interior.object && !interior.keepGlyph) d.push('text-shadow:none!important')
  if (interior.aspect) d.push('inset:0 auto!important', 'left:50%!important', 'width:auto!important', 'height:100%!important', `aspect-ratio:${interior.aspect}!important`, 'translate:-50% 0!important')
  else if (interior.inset) d.push(`inset:${interior.inset}!important`)
  if (interior.place) d.push(`place-items:${interior.place}!important`)
  if (interior.fontSize) d.push(`font-size:${interior.fontSize}!important`)
  if (interior.color) d.push(`color:${interior.color}!important`)
  if (interior.origin) d.push(`transform-origin:${interior.origin}!important`)
  if (interior.mask) d.push(`-webkit-mask:${interior.mask}!important`, `mask:${interior.mask}!important`)
  if (interior.animation) d.push(`animation:${interior.animation}!important`)
  return `${PANEL}[data-venus2-panel="${side}"]::before{${d.join(';')}}`
}

/** Production layout shared by every family. Art remains theme-specific through tokens. */
export function buildThemeCSS(theme: VenusThemeFamily, settings: VenusSettings): string {
  // Generate cache key from theme ID, skin preference, and scope
  const skinMode = resolveSkin(theme, settings.skinPreference)
  const cacheKey = `${theme.id}:${skinMode}:${settings.scope}`
  
  // Return cached CSS if available
  const cached = themeCache.get(cacheKey)
  if (cached) return cached
  
  const skin = theme.skins[skinMode]
  const art = artFor(theme, skinMode)
  const root = tokenSelector(settings.scope)
  const app = settings.scope === 'app'
  const backdrop = app ? 'body' : CHAT
  const foreground = app ? '#root' : `${CHAT}>*:not(${BACKDROP})`
  const transparentSurfaces = app ? `${CHAT},${LIST}` : LIST
  const lumiverseImportance = app ? '!important' : ''
  const lumiverseTokens = [`--lumiverse-primary:${skin.accent}`,`--lumiverse-primary-text:${skin.accent}`,`--lumiverse-primary-hover:color-mix(in srgb,${skin.accent} 80%,${skin.text})`,`--lumiverse-primary-muted:color-mix(in srgb,${skin.accent} 58%,transparent)`,`--lumiverse-primary-010:color-mix(in srgb,${skin.accent} 10%,transparent)`,`--lumiverse-primary-020:color-mix(in srgb,${skin.accent} 20%,transparent)`,`--lumiverse-accent:${skin.accent}`,`--lumiverse-accent-2:${skin.accentSoft}`,`--lumiverse-bg:${skin.background}`,`--lumiverse-bg-elevated:${skin.surface}`,`--lumiverse-bg-hover:${skin.surfaceRaised}`,`--lumiverse-text:${skin.text}`,`--lumiverse-text-muted:${skin.muted}`,`--lumiverse-icon:${skin.text}`,`--lumiverse-prose-dialogue:${skin.accentSoft}`,`--lumiverse-prose-italic:${skin.accent}`].map((token) => `${token}${lumiverseImportance}`).join(';')
  const panelSize = art.panelLayout === 'fixed' ? '' : 'background-size:130% 130%,150% 150%,auto!important;'
  const overlay = art.panelOverlay ? `${PANEL}::after{background:${art.panelOverlay}!important;${art.panelOverlayBlend ? `mix-blend-mode:${art.panelOverlayBlend}!important;` : ''}${art.panelOverlayOpacity == null ? '' : `opacity:${art.panelOverlayOpacity}!important;`}}` : ''
  const plaqueName = art.plaqueFont || art.plaqueTransform ? `${META_WRAP} ${NAME}{${art.plaqueFont ? `font-family:${art.plaqueFont}!important;` : ''}${art.plaqueTransform ? `text-transform:${art.plaqueTransform}!important;${art.plaqueTransform === 'none' ? 'letter-spacing:.03em!important;' : ''}` : ''}}` : ''
  const css = `
${root}{
--venus-bg:${skin.background};--venus-surface:${skin.surface};--venus-raised:${skin.surfaceRaised};--venus-text:${skin.text};--venus-muted:${skin.muted};--venus-accent:${skin.accent};--venus-accent-soft:${skin.accentSoft};
--venus-backdrop:${art.backdrop ?? 'radial-gradient(circle at 50% -15%,color-mix(in srgb,var(--venus-accent) 18%,transparent),transparent 46%),linear-gradient(145deg,var(--venus-raised),var(--venus-bg) 58%)'};
--venus-line:${art.line};--venus-line-speed:${art.lineSpeed};
--venus-panel-left:${art.panelLeft};--venus-panel-right:${art.panelRight};--venus-panel-detail:${art.panelDetail};--venus-panel-copy-left:${cssContent(art.panelGlyphs[0])};--venus-panel-copy-right:${cssContent(art.panelGlyphs[1])};--venus-panel-animation:${art.panelAnimation};--venus-panel-inner-animation:${art.panelInnerAnimation ?? 'venus-panel-inner-default 7.4s cubic-bezier(.45,0,.25,1) infinite'};--venus-panel-overlay-animation:${art.panelOverlayAnimation ?? 'venus-panel-overlay-default 10.2s linear infinite'};
--venus-plaque:${art.plaque};--venus-plaque-text:${art.plaqueText ?? skin.text};--venus-plaque-border:${art.plaqueBorder};--venus-plaque-shadow:${art.plaqueShadow};--venus-plaque-inset:${art.plaqueInset};--venus-plaque-radius:${art.plaqueRadius};--venus-portrait-radius:${art.portraitRadius};
--venus-heading:${art.headingFont};--venus-body:${art.bodyFont};--venus-mono:${art.monoFont};--venus-portrait-base:260px;--venus-portrait-w:var(--venus-portrait-base);--venus-portrait-h:calc(var(--venus-portrait-w) * 1.41);--venus-panel-opacity:.94;
${lumiverseTokens}
}
${app ? 'html,' : ''}${backdrop}{background:var(--venus-backdrop)!important;background-color:var(--venus-bg)!important;background-attachment:fixed!important;color:var(--venus-text)!important}
${backdrop}{position:relative;isolation:isolate}
${buildBackdropCSS(art, app)}
${foreground}{position:relative!important;z-index:1;background:transparent!important}
${app ? '[data-app-root]{background:transparent!important;background-color:transparent!important}' : ''}
${transparentSurfaces}{background:transparent!important}

${MIN},${BUB_CARD}{--long-message-fade-color:var(--venus-surface);font-family:var(--venus-body)!important;color:var(--venus-text)!important}
${CONTENT},${CONTENT} p,${CONTENT} li{font-family:var(--venus-body)!important;color:var(--venus-text)!important}
${CONTENT}{font-size:calc(16px * var(--lumiverse-font-scale,1));line-height:1.68;overflow-wrap:anywhere}
${CONTENT} em,${CONTENT} .think{color:var(--venus-accent)!important}
${CONTENT} q,${CONTENT} .say{color:var(--venus-accent-soft)!important}

/* Minimal: the VENUS 1 portrait-stage composition, with one animated light strip. */
${MIN}[data-part]{position:relative!important;display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto auto!important;justify-items:center!important;gap:0!important;width:100%!important;max-width:none!important;padding:0!important;margin:0 0 34px!important;background:transparent!important;border:0!important;box-shadow:none!important}
${MIN}[data-part]::before,${MIN}[data-part]::after{content:none!important;display:none!important}
${MIN_AVATAR}{grid-row:1!important;grid-column:1!important;position:relative!important;z-index:3!important;flex:none!important;width:var(--venus-portrait-w)!important;min-width:var(--venus-portrait-w)!important;max-width:none!important;height:var(--venus-portrait-h)!important;min-height:var(--venus-portrait-h)!important;max-height:none!important;aspect-ratio:auto!important;margin:0 auto 13px!important;overflow:hidden!important;isolation:isolate!important;border:4px solid var(--venus-accent)!important;border-radius:var(--venus-portrait-radius)!important;background:linear-gradient(155deg,color-mix(in srgb,var(--venus-accent) 28%,var(--venus-surface)),var(--venus-bg))!important;box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--venus-text) 15%,transparent),0 0 0 3px var(--venus-bg),0 0 0 6px color-mix(in srgb,var(--venus-accent-soft) 62%,transparent),0 0 34px color-mix(in srgb,var(--venus-accent) 48%,transparent),0 22px 46px color-mix(in srgb,var(--venus-bg) 82%,transparent)!important;-webkit-mask-image:none!important;mask-image:none!important}
${MIN_AVATAR} img,${BUB_AVATAR} img{position:relative!important;z-index:1!important;display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center top!important;border-radius:inherit!important}
${MIN_AVATAR}::before,${MIN_AVATAR}::after,${BUB_AVATAR}::before,${BUB_AVATAR}::after{content:none!important;display:none!important;animation:none!important}
${MIN_BUBBLE}{grid-row:2!important;grid-column:1!important;width:100%!important;max-width:none!important;min-width:0!important}
${MIN_HEADER}{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:.35rem!important;margin:0!important;padding:2px 86px 14px!important;text-align:center!important}
${MIN_HEADER}::before,${MIN_HEADER}::after{content:""!important;position:absolute!important;top:17px!important;width:72px!important;height:1px!important;background:linear-gradient(90deg,transparent,var(--venus-accent-soft),var(--venus-accent))!important;box-shadow:0 0 10px var(--venus-accent)!important}
${MIN_HEADER}::before{left:0!important}${MIN_HEADER}::after{right:0!important;transform:scaleX(-1)}
${MIN_HEADER} ${NAME}{font-family:var(--venus-heading)!important;font-size:calc(28px * var(--lumiverse-font-scale,1))!important;font-weight:760!important;line-height:1.05!important;letter-spacing:.055em!important;color:var(--venus-accent)!important;text-align:center!important;text-shadow:0 0 18px color-mix(in srgb,var(--venus-accent) 30%,transparent)!important}
${MIN_HEADER} ${META}{font-family:var(--venus-mono)!important;letter-spacing:.11em!important;color:var(--venus-muted)!important;background:color-mix(in srgb,var(--venus-bg) 65%,transparent)!important;border:1px solid color-mix(in srgb,var(--venus-accent) 25%,transparent)!important}
${MIN} ${CONTENT}{position:relative!important;width:100%!important;max-width:none!important;box-sizing:border-box!important;padding:22px 25px!important;overflow:hidden!important;border:1px solid color-mix(in srgb,var(--venus-accent) 42%,transparent)!important;border-radius:8px!important;background:color-mix(in srgb,var(--venus-surface) calc(var(--venus-panel-opacity) * 100%),transparent)!important;box-shadow:inset 0 1px color-mix(in srgb,var(--venus-text) 16%,transparent),0 18px 42px color-mix(in srgb,var(--venus-bg) 58%,transparent)!important}
${MIN} ${CONTENT}::before{content:""!important;position:absolute!important;z-index:2!important;inset:0 auto 0 0!important;width:4px!important;background:var(--venus-line)!important;background-size:100% 230%!important;box-shadow:0 0 9px var(--venus-accent),0 0 22px color-mix(in srgb,var(--venus-accent-soft) 82%,transparent)!important;animation:venus-light-stream var(--venus-line-speed) cubic-bezier(.45,0,.25,1) infinite!important}

/* Bubble: a tall central portrait, fixed rectangular frames, animated interior art, and a bespoke plaque. */
${BUB_CARD}{position:relative!important;width:100%!important;max-width:none!important;margin-bottom:34px!important}
${BUBBLE}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;max-width:none!important;overflow:hidden!important;padding:0!important;border:1px solid color-mix(in srgb,var(--venus-accent) 38%,transparent)!important;border-radius:9px!important;background:color-mix(in srgb,var(--venus-raised) 88%,transparent)!important;box-shadow:inset 0 1px color-mix(in srgb,var(--venus-text) 13%,transparent),0 24px 58px color-mix(in srgb,var(--venus-bg) 66%,transparent)!important}
${BUB_CARD}>[class*="_avatarBg_" i]{display:none!important;opacity:0!important;pointer-events:none!important}
${BUB_HEADER}{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;width:100%!important;min-height:0!important;height:auto!important;padding:0!important;overflow:visible!important;isolation:isolate!important;background:transparent!important}
${HEADER_LEFT}{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;width:100%!important;max-width:none!important;min-height:calc(var(--venus-portrait-h) + 112px)!important;padding:0!important;margin:0!important;text-align:center!important;isolation:isolate!important}
${HEADER_LEFT}::before,${HEADER_LEFT}::after{content:none!important;display:none!important}
${PANEL}{position:absolute!important;top:22px!important;height:calc(var(--venus-portrait-h) - 18px)!important;z-index:1!important;display:block!important;box-sizing:border-box!important;overflow:hidden!important;isolation:isolate!important;border:2px solid color-mix(in srgb,var(--venus-accent) 82%,transparent)!important;border-radius:0!important;background:var(--venus-panel-detail),var(--venus-panel-left),var(--venus-raised)!important;${panelSize}color:var(--venus-accent)!important;box-shadow:inset 0 0 0 5px color-mix(in srgb,var(--venus-bg) 48%,transparent),inset 0 0 34px color-mix(in srgb,var(--venus-bg) 78%,transparent),0 0 19px color-mix(in srgb,var(--venus-accent-soft) 38%,transparent)!important;opacity:.96!important;pointer-events:none!important;animation:var(--venus-panel-animation)!important}
${PANEL}[data-venus2-panel="left"]{left:0!important;right:calc(50% + var(--venus-portrait-w)/2 + 10px)!important}
${PANEL}[data-venus2-panel="right"]{right:0!important;left:calc(50% + var(--venus-portrait-w)/2 + 10px)!important;background:var(--venus-panel-detail),var(--venus-panel-right),var(--venus-raised)!important;${panelSize}animation-direction:reverse!important;animation-delay:-2.1s!important}
${PANEL}::before{position:absolute!important;inset:0!important;z-index:2!important;display:grid!important;place-items:center!important;color:currentColor!important;white-space:pre!important;text-align:center!important;font:500 clamp(38px,6vw,82px)/1 var(--venus-heading)!important;letter-spacing:.08em!important;text-shadow:0 0 12px var(--venus-accent-soft),0 0 28px var(--venus-accent)!important;transform-origin:center!important;pointer-events:none!important;animation:var(--venus-panel-inner-animation)!important}
${PANEL}[data-venus2-panel="left"]::before{content:var(--venus-panel-copy-left)!important}
${PANEL}[data-venus2-panel="right"]::before{content:var(--venus-panel-copy-right)!important;animation-direction:reverse!important;animation-delay:-2.7s!important}
${PANEL}::after{content:""!important;position:absolute!important;inset:-35%!important;z-index:1!important;background:conic-gradient(from 0deg,transparent,var(--venus-accent-soft),transparent 16%,var(--venus-accent),transparent 38%,var(--venus-text),transparent 62%,var(--venus-accent-soft),transparent 84%)!important;opacity:.36!important;mix-blend-mode:screen!important;transform-origin:center!important;pointer-events:none!important;animation:var(--venus-panel-overlay-animation)!important}
${PANEL}[data-venus2-panel="right"]::after{animation-direction:reverse!important;animation-delay:-4.1s!important}
${interiorCSS('left', art.panelInteriors?.left)}
${interiorCSS('right', art.panelInteriors?.right)}
${overlay}
${BUB_AVATAR}{position:relative!important;z-index:3!important;flex:none!important;width:var(--venus-portrait-w)!important;min-width:var(--venus-portrait-w)!important;max-width:none!important;height:var(--venus-portrait-h)!important;min-height:var(--venus-portrait-h)!important;max-height:none!important;aspect-ratio:auto!important;margin:10px auto 0!important;overflow:hidden!important;isolation:isolate!important;border:4px solid var(--venus-accent)!important;border-radius:var(--venus-portrait-radius)!important;background:linear-gradient(155deg,color-mix(in srgb,var(--venus-accent) 28%,var(--venus-surface)),var(--venus-bg))!important;box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--venus-text) 15%,transparent),0 0 0 3px var(--venus-bg),0 0 0 6px color-mix(in srgb,var(--venus-accent-soft) 62%,transparent),0 0 34px color-mix(in srgb,var(--venus-accent) 48%,transparent),0 22px 46px color-mix(in srgb,var(--venus-bg) 82%,transparent)!important;-webkit-mask-image:none!important;mask-image:none!important;animation:none!important}
${META_WRAP}{position:relative!important;z-index:5!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:.28rem!important;width:min(76%,490px)!important;margin:17px auto 0!important;padding:12px 28px 11px!important;overflow:hidden!important;border:1px solid var(--venus-plaque-border)!important;border-radius:var(--venus-plaque-radius)!important;background:var(--venus-plaque)!important;box-shadow:var(--venus-plaque-shadow)!important;color:var(--venus-plaque-text)!important;text-align:center!important;isolation:isolate!important}
${META_WRAP}::before{content:""!important;position:absolute!important;inset:4px!important;z-index:-1!important;border:1px solid color-mix(in srgb,var(--venus-text) 34%,transparent)!important;border-radius:inherit!important;background:var(--venus-plaque-inset)!important;pointer-events:none!important}
${META_WRAP} ${NAME}{display:block!important;width:100%!important;font-family:var(--venus-heading)!important;font-size:calc(27px * var(--lumiverse-font-scale,1))!important;font-weight:760!important;line-height:1.08!important;letter-spacing:.11em!important;color:var(--venus-plaque-text)!important;text-align:center!important;text-transform:uppercase!important;text-shadow:0 0 13px color-mix(in srgb,var(--venus-accent) 65%,transparent)!important}
${plaqueName}
${META_WRAP} ${META}{display:flex!important;justify-content:center!important;width:100%!important;border:0!important;background:transparent!important;box-shadow:none!important;font-family:var(--venus-mono)!important;letter-spacing:.13em!important;color:var(--venus-plaque-text)!important;text-align:center!important}
${BUB_CONTENT}{position:relative!important;width:100%!important;max-width:none!important;box-sizing:border-box!important;margin:0!important;padding:22px 25px 27px!important;background:color-mix(in srgb,var(--venus-surface) calc(var(--venus-panel-opacity) * 100%),transparent)!important;border-top:1px solid color-mix(in srgb,var(--venus-accent) 32%,transparent)!important}
${BUB_CONTENT}::before{content:""!important;display:block!important;height:5px!important;margin:-22px -25px 20px!important;background:var(--venus-panel-left)!important;background-size:180% 180%!important;opacity:.86!important;animation:venus-panel-signal 6s cubic-bezier(.45,0,.25,1) infinite!important}
${BUB_CONTENT}>${CONTENT}{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;box-sizing:border-box!important;background:transparent!important;border:0!important;box-shadow:none!important}

[class*="_panel_" i],[data-spindle-mount="sidebar"]{background:color-mix(in srgb,var(--venus-surface) 92%,transparent)!important}
[data-component="InputArea"]{background:color-mix(in srgb,var(--venus-raised) 91%,transparent)!important;border-color:color-mix(in srgb,var(--venus-accent) 30%,transparent)!important}
[data-component="InputArea"] textarea{font-family:var(--venus-body)!important;color:var(--venus-text)!important}

@keyframes venus-light-stream{0%{background-position:0 0;filter:brightness(.9)}100%{background-position:0 230%;filter:brightness(1.45) saturate(1.35)}}
@keyframes venus-panel-signal{to{background-position:180% 180%;filter:brightness(1.24)}}
@keyframes venus-panel-inner-default{0%,100%{transform:rotate(-5deg) scale(.88);filter:saturate(.9)}50%{transform:rotate(7deg) scale(1.08);filter:saturate(1.5);text-shadow:0 0 30px currentColor}}
@keyframes venus-panel-overlay-default{to{transform:rotate(360deg) scale(1.22);filter:hue-rotate(80deg)}}
${art.keyframes ?? ''}
@media(max-width:720px){${MIN},${BUB_CARD}{--venus-portrait-w:min(var(--venus-portrait-base,260px),280px,66vw)!important}${PANEL}{opacity:.78!important}${META_WRAP}{width:min(88%,410px)!important;padding-inline:18px!important}${MIN_HEADER}{padding-inline:56px!important}${MIN_HEADER}::before,${MIN_HEADER}::after{width:44px!important}${MIN} ${CONTENT},${BUB_CONTENT}{padding:18px!important}${BUB_CONTENT}::before{margin:-18px -18px 17px!important}}
@media(max-width:460px){${MIN},${BUB_CARD}{--venus-portrait-w:min(var(--venus-portrait-base,260px),230px,68vw)!important}${HEADER_LEFT}{min-height:calc(var(--venus-portrait-h) + 102px)!important}${PANEL}::before{font-size:clamp(22px,8vw,42px)!important;letter-spacing:0!important}${META_WRAP} ${NAME}{font-size:20px!important;letter-spacing:.07em!important}}
`
  
  // Cache the generated CSS
  themeCache.set(cacheKey, css)
  return css
}

/** User tuning sits above the authored theme without dismantling its composition. */
export function buildTuningCSS(settings: VenusSettings): string {
  if (!settings.enabled) return ''
  
  const t = resolveTuning(settings)
  
  // Generate cache key from all tuning parameters that affect CSS
  const cacheKey = `${settings.scope}:${t.portraitShape}:${t.portraitFade}:${t.portraitFit}:${t.portraitSize}:${t.panelOpacity}:${t.bodyFont ?? ''}:${t.headingFont ?? ''}:${t.bodyScale}:${t.lineHeight}:${t.letterSpacing}:${t.textAlign}:${t.cardPadding}:${t.messageGap}:${t.contentWidth ?? ''}:${t.backgrounds}:${t.motion}`
  
  // Return cached CSS if available
  const cached = tuningCache.get(cacheKey)
  if (cached) return cached
  
  const r = radius(t.portraitShape)
  // Doubled selector: tuning must beat the theme's token defaults whichever style element comes last.
  const root = settings.scope === 'chat' ? `${CHAT}${CHAT}` : ':root:root'
  const appPrefix = settings.scope === 'chat' ? `${CHAT} ` : ''
  const minAvatar = `${appPrefix}${MIN_AVATAR}`
  const bubbleAvatar = `${appPrefix}${BUB_AVATAR}`
  const avatars = `${minAvatar},${bubbleAvatar}`
  const avatarImages = `${minAvatar} img,${bubbleAvatar} img`
  const minContent = `${appPrefix}${MIN} ${CONTENT}`
  const bubbleContent = `${appPrefix}${BUB_CONTENT}`
  const motionTargets = `${appPrefix}${MIN},${appPrefix}${MIN} *,${appPrefix}${MIN}::before,${appPrefix}${MIN}::after,${appPrefix}${MIN} *::before,${appPrefix}${MIN} *::after,${appPrefix}${BUB_CARD},${appPrefix}${BUB_CARD} *,${appPrefix}${BUB_CARD}::before,${appPrefix}${BUB_CARD}::after,${appPrefix}${BUB_CARD} *::before,${appPrefix}${BUB_CARD} *::after,${appPrefix}${PANEL},${appPrefix}${PANEL}[data-venus2-panel]::before,${appPrefix}${PANEL}[data-venus2-panel]::after,${appPrefix}${MIN} ${CONTENT}::before,${appPrefix}${BUB_CONTENT}::before,${BACKDROP} *`
  const shape = r == null ? '' : `border-radius:${r}!important;overflow:hidden!important;-webkit-mask-image:none!important;mask-image:none!important;`
  const fade = t.portraitFade ? '-webkit-mask-image:linear-gradient(to bottom,#000 0,#000 68%,transparent 100%)!important;mask-image:linear-gradient(to bottom,#000 0,#000 68%,transparent 100%)!important;border-color:transparent!important;' : ''
  const motion = t.motion === 'off' ? `${motionTargets}{animation:none!important;transition:none!important}` : t.motion === 'reduced' ? `${motionTargets}{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}` : ''
  const css = `
${root}{--venus-portrait-base:${t.portraitSize}px;--venus-portrait-w:var(--venus-portrait-base);--venus-panel-opacity:${t.panelOpacity};${t.bodyFont ? `--venus-body:${t.bodyFont};` : ''}${t.headingFont ? `--venus-heading:${t.headingFont};` : ''}}
${appPrefix}${MIN},${appPrefix}${BUB_CARD}{margin-bottom:${t.messageGap}px!important}
${minContent},${bubbleContent}{padding:${t.cardPadding}px!important}
${bubbleContent}::before{margin:-${t.cardPadding}px -${t.cardPadding}px ${Math.max(12, t.cardPadding - 3)}px!important}
${appPrefix}${CONTENT}{font-size:calc(16px * ${t.bodyScale} * var(--lumiverse-font-scale,1))!important;line-height:${t.lineHeight}!important;letter-spacing:${t.letterSpacing}em!important;text-align:${t.textAlign}!important}
${appPrefix}${CONTENT} p,${appPrefix}${CONTENT} li,${appPrefix}${CONTENT} blockquote,${appPrefix}${CONTENT} h1,${appPrefix}${CONTENT} h2,${appPrefix}${CONTENT} h3,${appPrefix}${CONTENT} h4{text-align:${t.textAlign}!important}
${t.contentWidth ? `${appPrefix}${CONTENT} p,${appPrefix}${CONTENT} li,${appPrefix}${CONTENT} h1,${appPrefix}${CONTENT} h2,${appPrefix}${CONTENT} h3,${appPrefix}${CONTENT} blockquote{max-width:${t.contentWidth}ch!important;margin-left:auto!important;margin-right:auto!important}` : ''}
${avatars}{${shape}${fade}}
${avatarImages}{${t.portraitFit === 'theme' ? '' : `object-fit:${t.portraitFit}!important;`}${r == null ? '' : `border-radius:${r}!important;`}}
${t.backgrounds ? '' : `${BACKDROP}{display:none!important}`}
${t.panelOpacity < .9 ? `${minContent},${appPrefix}${BUBBLE},${appPrefix}[data-component="InputArea"]{backdrop-filter:blur(12px)}` : ''}
${motion}
@media(prefers-reduced-motion:reduce){${t.motion === 'system' ? `${motionTargets}{animation:none!important;transition:none!important}` : ''}}
`
  
  // Cache the generated CSS
  tuningCache.set(cacheKey, css)
  return css
}

/** Clear CSS caches when theme data changes */
export function clearCSSCache() {
  themeCache.clear()
  tuningCache.clear()
}
