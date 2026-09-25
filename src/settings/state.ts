import { DEFAULTS, type VenusSettings } from './schema'

let current = structuredClone(DEFAULTS)
const listeners = new Set<(value: VenusSettings) => void>()

// Batch notification mechanism to avoid excessive listener calls
let notificationScheduled = false
const scheduleNotification = () => {
  if (notificationScheduled) return
  notificationScheduled = true
  
  // Use microtask to batch multiple rapid updates
  queueMicrotask(() => {
    notificationScheduled = false
    const snapshot = current
    listeners.forEach((fn) => fn(snapshot))
  })
}

export const get = () => current

export function replace(value: VenusSettings) { 
  current = value
  scheduleNotification()
}

export function patch(value: Partial<VenusSettings>) { 
  replace({ ...current, ...value })
}

export function reset() { 
  replace({ ...structuredClone(DEFAULTS), enabled: current.enabled })
}

export const subscribe = (fn: (value: VenusSettings) => void) => { 
  listeners.add(fn)
  return () => listeners.delete(fn)
}
