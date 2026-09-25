import { googleFontsURLs, isCatalogFamily } from './catalog'
import { BUNDLED_FACES } from './data.generated'

export type FontSource = 'bundled' | 'google' | 'system'
export type FontStatus = 'loading' | 'loaded' | 'failed'

/**
 * Registers web fonts on demand. Bundled faces are decoded only when a family is first
 * needed; Google families get one stylesheet link each so a missing family cannot
 * break the others. Nothing is unloaded when the theme changes: registered faces cost
 * nothing until text uses them, and switching back is instant.
 */
export function createFontLoader(doc: Document = document) {
  const faces = new Map<string, FontFace[]>()
  const links = new Map<string, HTMLLinkElement>()
  const status = new Map<string, FontStatus>()
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((fn) => fn())
  const key = (family: string) => family.toLowerCase()

  const bundled = (family: string) => {
    const id = key(family)
    if (faces.has(id) || typeof FontFace === 'undefined') return
    const made: FontFace[] = []
    for (const face of BUNDLED_FACES) {
      if (key(face.family) !== id) continue
      const binary = atob(face.data); const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
      const font = new FontFace(face.family, bytes, { weight: face.weight, display: 'swap' })
      doc.fonts.add(font); made.push(font)
    }
    faces.set(id, made)
    status.set(`bundled:${id}`, made.length ? 'loaded' : 'failed')
  }

  const google = (family: string) => {
    const id = key(family)
    if (links.has(id)) return
    const urls = googleFontsURLs(family)
    const link = doc.createElement('link'); link.rel = 'stylesheet'; link.dataset.venus2Font = family
    let attempt = 0
    link.onload = () => { status.set(`google:${id}`, 'loaded'); notify() }
    link.onerror = () => {
      attempt += 1
      if (attempt < urls.length) { link.href = urls[attempt]; return }
      status.set(`google:${id}`, 'failed'); notify()
    }
    link.href = urls[0]
    status.set(`google:${id}`, 'loading')
    links.set(id, link); doc.head.append(link)
  }

  const drop = (family: string) => {
    const id = key(family)
    for (const font of faces.get(id) ?? []) doc.fonts.delete(font)
    faces.delete(id); status.delete(`bundled:${id}`)
    links.get(id)?.remove(); links.delete(id); status.delete(`google:${id}`)
  }

  return {
    /**
     * Makes `families` available. Catalog families follow `source`; `customGoogle`
     * names families the person picked from Google Fonts themselves, which always load.
     */
    ensure(families: Iterable<string>, source: FontSource, customGoogle: readonly string[] = []) {
      const custom = new Set(customGoogle.map(key))
      for (const family of families) {
        if (custom.has(key(family))) { google(family); continue }
        if (!isCatalogFamily(family)) continue
        if (source === 'system') { drop(family); continue }
        if (source === 'google') { if (faces.has(key(family))) drop(family); google(family) }
        else { if (links.has(key(family))) drop(family); bundled(family) }
      }
    },
    status: (family: string, source: 'bundled' | 'google') => status.get(`${source}:${key(family)}`),
    subscribe(fn: () => void) { listeners.add(fn); return () => listeners.delete(fn) },
    destroy() { for (const family of [...faces.keys(), ...links.keys()]) drop(family); listeners.clear() },
  }
}

export type FontLoader = ReturnType<typeof createFontLoader>
