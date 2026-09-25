import type { SpindleFrontendContext } from 'lumiverse-spindle-types'
import { LAYER_SLOTS } from './css/backdrop'
import { buildThemeCSS, buildTuningCSS, clearCSSCache, resolveSkin } from './css/build'
import { stackFamilies } from './fonts/catalog'
import { createFontLoader } from './fonts/loader'
import { initPersistence, schedulePersist, flushPersist } from './settings/persist'
import * as state from './settings/state'
import { effectiveSettings, resolveTuning } from './settings/schema'
import { VENUS_THEMES } from './themes'
import { artFor } from './themes/types'
import { createSmartQuoteController } from './typography/smart-quotes'
import { mountPanel } from './ui/panel'
import { perfMonitor } from './util/performance'

const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c.4 4.6 2.4 6.6 7 7-4.6.4-6.6 2.4-7 7-.4-4.6-2.4-6.6-7-7 4.6-.4 6.6-2.4 7-7z"/></svg>'
const PANEL_MOUNT = '[data-component="BubbleMessage"] [data-spindle-mount="message_header"]'
const CHAT = '[data-component="ChatView"]'

export function setup(ctx: SpindleFrontendContext) {
  perfMonitor.startTimer('total-setup')
  ctx.deferReady()
  let live = true
  const smartQuotes = createSmartQuoteController()
  const fonts = createFontLoader()
  const decoratedPanels = new WeakSet<Element>()

  // Theme and tuning CSS live in separate style elements so a slider only replaces the small one.
  let themeStyle: { css: string; remove: () => void } | undefined
  let tuningStyle: { css: string; remove: () => void } | undefined
  const setStyle = (current: typeof themeStyle, css: string) => {
    if (current?.css === css) return current
    current?.remove()
    return css ? { css, remove: ctx.dom.addStyle(css) } : undefined
  }

  // The ambient backdrop: one wrapper per scene/world with a slot for each background layer.
  const backdrop = document.createElement('div')
  backdrop.dataset.venus2Backdrop = ''
  backdrop.setAttribute('aria-hidden', 'true')
  for (const kind of ['scene', 'world']) {
    const wrap = document.createElement('div'); wrap.dataset.layer = kind
    for (let i = 0; i < LAYER_SLOTS; i++) wrap.append(document.createElement('i'))
    backdrop.append(wrap)
  }
  let backdropHost: 'app' | 'chat' | null = null
  const placeBackdrop = () => {
    if (!backdropHost) { backdrop.remove(); return }
    const host = backdropHost === 'app' ? document.body : document.querySelector(CHAT)
    if (!host) { backdrop.remove(); return }
    if (backdrop.parentElement !== host || host.firstChild !== backdrop) host.prepend(backdrop)
  }

  const safe = () => document.documentElement.hasAttribute('data-safe-theme')
  const activeTheme = () => VENUS_THEMES.find((x) => x.id === state.get().activeThemeId)
  const shouldCurlQuotes = () => { const s = state.get(); return s.enabled && !safe() && !!activeTheme() && resolveTuning(s).curlyQuotes }

  const apply = () => {
    perfMonitor.startTimer('css-generation')
    // The active profile, if any, is layered over the global settings here.
    const s = effectiveSettings(state.get()); const theme = activeTheme()
    smartQuotes.sync(shouldCurlQuotes())
    if (!s.enabled || safe() || !theme) {
      themeStyle = setStyle(themeStyle, ''); tuningStyle = setStyle(tuningStyle, '')
      backdropHost = null; placeBackdrop()
      perfMonitor.endTimer('css-generation')
      return
    }
    const art = artFor(theme, resolveSkin(theme, s.skinPreference)); const t = resolveTuning(s)
    fonts.ensure([art.headingFont, art.bodyFont, art.monoFont, art.plaqueFont, t.bodyFont, t.headingFont].map((stack) => stackFamilies(stack)[0]).filter((x): x is string => !!x), s.fontSource, s.googleFamilies)
    themeStyle = setStyle(themeStyle, buildThemeCSS(theme, s))
    tuningStyle = setStyle(tuningStyle, buildTuningCSS(s))
    backdropHost = s.scope; placeBackdrop()
    perfMonitor.recordMetric('cssGenerationTime', perfMonitor.endTimer('css-generation'))
  }

  const stopPersistence = initPersistence(ctx, () => { if (live) apply() })
  const tab = ctx.ui.registerDrawerTab({ id: 'venus-2-customizer', title: 'VENUS 2.0', shortName: 'VENUS 2', headerTitle: 'VENUS 2.0 · Customizer', description: 'Portrait-first maximalist theme library and live customizer', keywords: ['theme', 'skin', 'portrait', 'customizer', 'maximalism', 'venus 2'], iconSvg: ICON })
  const panel = mountPanel(tab.root, ctx, fonts)

  const decoratePanelMount = (mount: Element) => {
    if (decoratedPanels.has(mount)) return
    decoratedPanels.add(mount)
    perfMonitor.incrementCounter('panelDecorations')
    const left = ctx.dom.createElement('span', { 'data-venus2-panel': 'left', 'aria-hidden': 'true' })
    const right = ctx.dom.createElement('span', { 'data-venus2-panel': 'right', 'aria-hidden': 'true' })
    mount.append(left, right)
  }
  const decorateWithin = (root: ParentNode) => {
    if (root instanceof Element && root.matches(PANEL_MOUNT)) decoratePanelMount(root)
    root.querySelectorAll(PANEL_MOUNT).forEach(decoratePanelMount)
  }
  decorateWithin(document)

  // Mutations are handled per added subtree, synchronously (before paint, so panels never
  // flash in late) and without rescanning the whole chat while a reply streams in.
  const bodyObserver = new MutationObserver((records) => {
    if (!live) return
    perfMonitor.startTimer('panel-decoration')
    let quotes = false
    for (const record of records) {
      if (smartQuotes.noteMutation(record)) quotes = true
      for (const node of record.addedNodes) if (node.nodeType === Node.ELEMENT_NODE && node !== backdrop) decorateWithin(node as Element)
    }
    if (backdropHost === 'chat' && !backdrop.isConnected) placeBackdrop()
    if (quotes) smartQuotes.sync(shouldCurlQuotes())
    perfMonitor.recordMetric('domOperationTime', perfMonitor.endTimer('panel-decoration'))
  })
  bodyObserver.observe(document.body, { childList: true, subtree: true })

  const off = state.subscribe(() => { apply(); schedulePersist(); panel.refresh() })
  const modeObserver = new MutationObserver(() => { apply(); panel.refresh() })
  modeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme-mode', 'data-safe-theme'] })

  const unload = () => flushPersist()
  addEventListener('pagehide', unload)

  perfMonitor.recordMetric('totalSetupTime', perfMonitor.endTimer('total-setup'))
  perfMonitor.logMetrics()
  ctx.ready()

  return () => {
    live = false
    off()
    modeObserver.disconnect(); bodyObserver.disconnect()
    themeStyle?.remove(); tuningStyle?.remove(); themeStyle = tuningStyle = undefined
    backdrop.remove()
    smartQuotes.destroy()
    fonts.destroy()
    document.querySelectorAll('[data-venus2-panel]').forEach((element) => element.remove())
    stopPersistence()
    flushPersist()
    removeEventListener('pagehide', unload)
    panel.destroy()
    tab.destroy()
    clearCSSCache()
    perfMonitor.reset()
  }
}
