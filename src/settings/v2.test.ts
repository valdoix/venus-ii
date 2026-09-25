import { expect, test } from 'bun:test'
import { DEFAULTS, effectiveSettings, migrate, resolveTuning, snapshotProfile } from './schema'

test('v1 settings receive a clean current-schema reset', () => {
  expect(migrate({ version: 1, baseTheme: 'retired-skin' })).toEqual(DEFAULTS)
})

test('schema 2 settings keep choices while upgrading the old portrait default', () => {
  const migrated = migrate({ ...DEFAULTS, version: 2, activeThemeId: 'opal-menagerie', global: { ...DEFAULTS.global, textAlign: undefined, portraitSize: 244 } })
  expect(migrated.version).toBe(4)
  expect(migrated.activeThemeId).toBe('opal-menagerie')
  expect(migrated.global.portraitSize).toBe(260)
  expect(migrated.global.textAlign).toBe('left')
})

test('mode overrides take precedence over shared theme and global values', () => {
  const s = migrate({ ...DEFAULTS, global: { ...DEFAULTS.global, cardPadding: 8 }, themeOverrides: { 'coronation-machine': { cardPadding: 16, modes: { bubble: { cardPadding: 22 } } } } })
  expect(resolveTuning(s).cardPadding).toBe(22)
})

test('normalization bounds untrusted numeric settings', () => {
  expect(migrate({ ...DEFAULTS, global: { bodyScale: 99, portraitSize: -1 } }).global.bodyScale).toBe(1.5)
  expect(migrate({ ...DEFAULTS, global: { bodyScale: 99, portraitSize: -1 } }).global.portraitSize).toBe(160)
})

test('curly quotation marks are opt-in and survive settings normalization', () => {
  expect(DEFAULTS.global.curlyQuotes).toBe(false)
  expect(migrate({ ...DEFAULTS, global: { ...DEFAULTS.global, curlyQuotes: true } }).global.curlyQuotes).toBe(true)
  expect(migrate({ ...DEFAULTS, global: { ...DEFAULTS.global, curlyQuotes: 'yes' } }).global.curlyQuotes).toBe(false)
})

test('imported font stacks cannot break out of their CSS declaration', () => {
  const s = migrate({ version: 3, global: { bodyFont: 'Lora;}body{display:none', headingFont: '' } })
  expect(s.global.bodyFont).toBe('Lorabodydisplay:none')
  expect(s.global.headingFont).toBeNull()
  expect(migrate({ version: 3, fontSource: 'google', googleFamilies: ['Playfair Display', 'x"}{'] })).toMatchObject({ fontSource: 'google', googleFamilies: ['Playfair Display', 'x'] })
})

test('the default portrait is smaller, and only the untouched old default is upgraded', () => {
  expect(DEFAULTS.global.portraitSize).toBe(260)
  expect(migrate({ ...DEFAULTS, version: 3, global: { ...DEFAULTS.global, portraitSize: 320 } }).global.portraitSize).toBe(260)
  expect(migrate({ ...DEFAULTS, version: 3, global: { ...DEFAULTS.global, portraitSize: 400 } }).global.portraitSize).toBe(400)
  expect(migrate({ ...DEFAULTS, version: 4, global: { ...DEFAULTS.global, portraitSize: 320 } }).global.portraitSize).toBe(320)
})

test('an active profile carries every shared setting across themes until it is cleared', () => {
  const base = migrate({ ...DEFAULTS, global: { ...DEFAULTS.global, bodyFont: 'Georgia, serif', portraitSize: 300, cardPadding: 12 }, fontSource: 'google', skinPreference: 'dark', scope: 'chat' })
  const profile = snapshotProfile(base, 'p1', 'Reading')
  expect(profile.tuning).toMatchObject({ bodyFont: 'Georgia, serif', portraitSize: 300, cardPadding: 12 })
  expect(profile.appearance).toEqual({ skinPreference: 'dark', scope: 'chat', fontSource: 'google', googleFamilies: [] })
  // Later the global settings change, but the profile is active.
  const s = migrate({ ...base, global: { ...DEFAULTS.global }, fontSource: 'bundled', skinPreference: 'auto', scope: 'app', profiles: [profile], activeProfileId: 'p1' })
  for (const activeThemeId of ['coronation-machine', 'riviera-lido']) {
    const t = resolveTuning({ ...s, activeThemeId })
    expect(t.portraitSize).toBe(300)
    expect(t.bodyFont).toBe('Georgia, serif')
  }
  expect(effectiveSettings(s)).toMatchObject({ fontSource: 'google', skinPreference: 'dark', scope: 'chat' })
  const cleared = { ...s, activeProfileId: null }
  expect(resolveTuning(cleared).portraitSize).toBe(260)
  expect(effectiveSettings(cleared).fontSource).toBe('bundled')
})

test('profiles survive migration, and a dangling active profile is dropped', () => {
  const s = migrate({ ...DEFAULTS, version: 3, profiles: [{ id: 'a', name: 'Legacy', tuning: { portraitSize: 320, lineHeight: 2 } }], activeProfileId: 'a' })
  expect(s.profiles[0].tuning).toMatchObject({ portraitSize: 260, lineHeight: 2, cardPadding: 22 })
  expect(s.profiles[0].appearance.fontSource).toBe('bundled')
  expect(s.activeProfileId).toBe('a')
  expect(migrate({ ...DEFAULTS, activeProfileId: 'missing' }).activeProfileId).toBeNull()
})
