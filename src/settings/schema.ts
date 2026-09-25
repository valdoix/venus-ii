export const VENUS_SETTINGS_VERSION = 4
export type SkinPreference = 'auto' | 'light' | 'dark'
export type PresentationMode = 'minimal' | 'bubble'
export type MotionMode = 'system' | 'full' | 'reduced' | 'off'
export type ThemeScope = 'app' | 'chat'
export type TextAlignment = 'left' | 'center' | 'justify'
export type PortraitShape = 'theme' | 'circle' | 'rounded' | 'squircle' | 'arch' | 'oval' | 'pill' | 'square'
export type PortraitFit = 'theme' | 'cover' | 'contain'
/** Where theme typefaces come from: embedded in the extension, fetched from Google Fonts, or none. */
export type FontSource = 'bundled' | 'google' | 'system'
export interface Tuning {
  bodyFont: string | null; headingFont: string | null; curlyQuotes: boolean; textAlign: TextAlignment; bodyScale: number; lineHeight: number; letterSpacing: number
  messageGap: number; cardPadding: number; contentWidth: number | null; portraitShape: PortraitShape; portraitFit: PortraitFit
  portraitSize: number; portraitFade: boolean; backgrounds: boolean; motion: MotionMode; panelOpacity: number
}
/** Settings outside Tuning that a profile also carries. */
export interface ProfileAppearance { skinPreference: SkinPreference; scope: ThemeScope; fontSource: FontSource; googleFamilies: string[] }
export const APPEARANCE_KEYS = ['skinPreference', 'scope', 'fontSource', 'googleFamilies'] as const
/**
 * A reusable set of every customizer setting. While it is the active profile it sits
 * above the global tuning, and edits made on the "All themes" layer are written into it.
 */
export interface VenusProfile { id: string; name: string; tuning: Tuning; appearance: ProfileAppearance }
export interface VenusSettings {
  version: 4; enabled: boolean; activeThemeId: string | null; skinPreference: SkinPreference; scope: ThemeScope; previewMode: PresentationMode
  global: Tuning; themeOverrides: Record<string, Partial<Tuning> & { modes?: Partial<Record<PresentationMode, Partial<Tuning>>>; skinPreference?: SkinPreference }>
  profiles: VenusProfile[]; activeProfileId: string | null
  fontSource: FontSource
  /** Families the person picked from Google Fonts by name; loaded from Google whatever the font source. */
  googleFamilies: string[]
}
export const DEFAULT_TUNING: Tuning = { bodyFont: null, headingFont: null, curlyQuotes: false, textAlign: 'left', bodyScale: 1, lineHeight: 1.68, letterSpacing: 0, messageGap: 34, cardPadding: 22, contentWidth: null, portraitShape: 'theme', portraitFit: 'cover', portraitSize: 260, portraitFade: false, backgrounds: true, motion: 'system', panelOpacity: .94 }
export const DEFAULTS: VenusSettings = { version: 4, enabled: true, activeThemeId: 'coronation-machine', skinPreference: 'auto', scope: 'app', previewMode: 'bubble', global: { ...DEFAULT_TUNING }, themeOverrides: {}, profiles: [], activeProfileId: null, fontSource: 'bundled', googleFamilies: [] }
const shapes = new Set<PortraitShape>(['theme', 'circle', 'rounded', 'squircle', 'arch', 'oval', 'pill', 'square'])
const motions = new Set<MotionMode>(['system', 'full', 'reduced', 'off'])
const alignments = new Set<TextAlignment>(['left', 'center', 'justify'])
const skins = new Set<SkinPreference>(['auto', 'light', 'dark'])
const presentations = new Set<PresentationMode>(['minimal', 'bubble'])
const scopes = new Set<ThemeScope>(['app', 'chat'])
const fontSources = new Set<FontSource>(['bundled', 'google', 'system'])
const families = (v: unknown) => Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === 'string').map(cleanFamilyName).filter(Boolean))].slice(0, 16) : []
/** A Google Fonts family name: letters, digits and spaces only, so it is safe in a URL and a CSS string. */
export const cleanFamilyName = (value: string) => value.replace(/[^\p{L}\p{N} ]+/gu, '').replace(/\s+/g, ' ').trim().slice(0, 60)
/** Font stacks are written into CSS, so anything that could close a declaration or rule is dropped. */
export const cleanFontStack = (value: string) => value.replace(/[{}<>;\\]/g, '').slice(0, 300).trim()
const stack = (v: unknown, d: string | null) => typeof v === 'string' ? cleanFontStack(v) || null : d
const n = (v: unknown, d: number, min: number, max: number) => typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : d
export function normalizeTuning(raw: unknown, base: Tuning = DEFAULT_TUNING): Tuning {
  const v = raw && typeof raw === 'object' ? raw as Partial<Tuning> : {}
  return { bodyFont: stack(v.bodyFont, base.bodyFont), headingFont: stack(v.headingFont, base.headingFont), curlyQuotes: typeof v.curlyQuotes === 'boolean' ? v.curlyQuotes : base.curlyQuotes, textAlign: alignments.has(v.textAlign as TextAlignment) ? v.textAlign as TextAlignment : base.textAlign, bodyScale: n(v.bodyScale, base.bodyScale, .8, 1.5), lineHeight: n(v.lineHeight, base.lineHeight, 1.2, 2.4), letterSpacing: n(v.letterSpacing, base.letterSpacing, -.03, .12), messageGap: n(v.messageGap, base.messageGap, 0, 64), cardPadding: n(v.cardPadding, base.cardPadding, 4, 40), contentWidth: v.contentWidth == null ? null : n(v.contentWidth, 70, 30, 120), portraitShape: shapes.has(v.portraitShape as PortraitShape) ? v.portraitShape as PortraitShape : base.portraitShape, portraitFit: v.portraitFit === 'cover' || v.portraitFit === 'contain' || v.portraitFit === 'theme' ? v.portraitFit : base.portraitFit, portraitSize: n(v.portraitSize, base.portraitSize, 160, 520), portraitFade: typeof v.portraitFade === 'boolean' ? v.portraitFade : base.portraitFade, backgrounds: typeof v.backgrounds === 'boolean' ? v.backgrounds : base.backgrounds, motion: motions.has(v.motion as MotionMode) ? v.motion as MotionMode : base.motion, panelOpacity: n(v.panelOpacity, base.panelOpacity, .2, 1) }
}
function normalizeAppearance(raw: unknown, base: ProfileAppearance): ProfileAppearance {
  const v = raw && typeof raw === 'object' ? raw as Partial<ProfileAppearance> : {}
  return { skinPreference: skins.has(v.skinPreference as SkinPreference) ? v.skinPreference as SkinPreference : base.skinPreference, scope: scopes.has(v.scope as ThemeScope) ? v.scope as ThemeScope : base.scope, fontSource: fontSources.has(v.fontSource as FontSource) ? v.fontSource as FontSource : base.fontSource, googleFamilies: Array.isArray(v.googleFamilies) ? families(v.googleFamilies) : base.googleFamilies }
}
/** Portrait widths that were the shipped default in an older schema, upgraded to today's default. */
const OLD_PORTRAIT_DEFAULTS: Record<number, number> = { 2: 244, 3: 320 }
const upgradePortrait = (tuning: Partial<Tuning>, version: number) => tuning.portraitSize === OLD_PORTRAIT_DEFAULTS[version] ? { ...tuning, portraitSize: DEFAULT_TUNING.portraitSize } : tuning

/** v1 is intentionally reset: all legacy theme IDs and tuning are retired. */
export function migrate(raw: unknown): VenusSettings {
  if (!raw || typeof raw !== 'object') return structuredClone(DEFAULTS)
  const sourceVersion = (raw as { version?: unknown }).version
  if (sourceVersion !== 2 && sourceVersion !== 3 && sourceVersion !== 4) return structuredClone(DEFAULTS)
  const v = raw as Partial<VenusSettings>; const overrides = v.themeOverrides && typeof v.themeOverrides === 'object' ? v.themeOverrides : {}
  // Earlier schemas shipped a larger default portrait. Only that untouched default is
  // upgraded; intentionally customized widths migrate unchanged.
  const global = normalizeTuning(upgradePortrait(v.global && typeof v.global === 'object' ? v.global as Partial<Tuning> : {}, sourceVersion))
  const appearance = normalizeAppearance(v, { skinPreference: 'auto', scope: 'app', fontSource: 'bundled', googleFamilies: [] })
  const profiles: VenusProfile[] = Array.isArray(v.profiles) ? v.profiles.filter((x): x is VenusProfile => !!x && typeof x.id === 'string' && typeof x.name === 'string').slice(0, 24).map((x) => ({ id: x.id, name: x.name.slice(0, 60), tuning: normalizeTuning(upgradePortrait(x.tuning ?? {}, sourceVersion), global), appearance: normalizeAppearance(x.appearance, appearance) })) : []
  const activeProfileId = typeof v.activeProfileId === 'string' && profiles.some((x) => x.id === v.activeProfileId) ? v.activeProfileId : null
  return { ...structuredClone(DEFAULTS), enabled: typeof v.enabled === 'boolean' ? v.enabled : true, activeThemeId: typeof v.activeThemeId === 'string' || v.activeThemeId === null ? v.activeThemeId : DEFAULTS.activeThemeId, ...appearance, previewMode: presentations.has(v.previewMode as PresentationMode) ? v.previewMode as PresentationMode : 'bubble', global, themeOverrides: overrides as VenusSettings['themeOverrides'], profiles, activeProfileId }
}

export const activeProfile = (s: VenusSettings) => s.activeProfileId ? s.profiles.find((x) => x.id === s.activeProfileId) : undefined

/** The settings as they apply right now: the active profile layered over the global tuning and appearance. */
export function effectiveSettings(s: VenusSettings): VenusSettings {
  const profile = activeProfile(s)
  if (!profile) return s
  return { ...s, ...profile.appearance, global: normalizeTuning(profile.tuning, s.global) }
}

/** A profile snapshot of everything currently in effect for the global layer. */
export function snapshotProfile(s: VenusSettings, id: string, name: string): VenusProfile {
  const e = effectiveSettings(s)
  return { id, name, tuning: { ...e.global }, appearance: { skinPreference: e.skinPreference, scope: e.scope, fontSource: e.fontSource, googleFamilies: [...e.googleFamilies] } }
}

/** Order: defaults, global, active profile, this family, this family in this presentation mode. */
export function resolveTuning(s: VenusSettings): Tuning { const e = effectiveSettings(s); const o = e.activeThemeId ? e.themeOverrides[e.activeThemeId] : undefined; return normalizeTuning({ ...e.global, ...o, ...o?.modes?.[e.previewMode] }) }
