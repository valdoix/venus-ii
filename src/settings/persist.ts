import type { SpindleFrontendContext } from 'lumiverse-spindle-types'
import { migrate } from './schema'
import * as state from './state'

const KEY = 'customizer:v2'
let timer: ReturnType<typeof setTimeout> | undefined
let save: ((value: unknown) => Promise<void> | void) | undefined

const parse = (raw: unknown) => typeof raw === 'string' ? JSON.parse(raw) as unknown : raw
const local = () => { try { return parse(localStorage.getItem(KEY)) } catch { return null } }

/**
 * Loads settings from the host settings store, falling back to the browser copy when the
 * store is unavailable or has never been written (so an upgrade never resets anyone).
 */
export function initPersistence(ctx: SpindleFrontendContext, ready: () => void): () => void {
  const bridge = ctx.settings
  save = bridge ? (value) => bridge.set(KEY, value) : undefined
  let live = true
  void (async () => {
    let raw: unknown = null
    try { raw = bridge ? parse(await bridge.get<unknown>(KEY)) : null } catch { raw = null }
    if (raw == null) raw = local()
    state.replace(migrate(raw))
    if (live) ready()
  })()
  return () => { live = false; if (timer) clearTimeout(timer); timer = undefined; save = undefined }
}

export function schedulePersist() { if (timer) clearTimeout(timer); timer = setTimeout(flushPersist, 180) }

export function flushPersist() {
  if (timer) clearTimeout(timer)
  timer = undefined
  const value = state.get()
  try { localStorage.setItem(KEY, JSON.stringify(value)) } catch {}
  try { void Promise.resolve(save?.(value)).catch(() => {}) } catch {}
}
