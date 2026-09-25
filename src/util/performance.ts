/** Performance monitoring utilities for VENUS 2.0 */

interface PerformanceMetrics {
  cssGenerationTime: number
  domOperationTime: number
  totalSetupTime: number
  panelDecorations: number
  smartQuoteSyncs: number
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private timers: Map<string, number> = new Map()
  private enabled = false

  constructor() {
    // Opt-in only (?venus_perf in the URL or localStorage.venus_perf = '1'); Lumiverse
    // usually runs on localhost, so the hostname says nothing about development.
    if (typeof window !== 'undefined') {
      let flag = false
      try { flag = localStorage.getItem('venus_perf') === '1' } catch {}
      this.enabled = window.location.search.includes('venus_perf') || flag
    }
  }

  startTimer(label: string) {
    if (!this.enabled) return
    this.timers.set(label, performance.now())
  }

  endTimer(label: string): number {
    if (!this.enabled) return 0
    const start = this.timers.get(label)
    if (start === undefined) return 0
    const duration = performance.now() - start
    this.timers.delete(label)
    return duration
  }

  recordMetric(key: keyof PerformanceMetrics, value: number) {
    if (!this.enabled) return
    this.metrics[key] = value
  }

  incrementCounter(key: keyof PerformanceMetrics) {
    if (!this.enabled) return
    this.metrics[key] = ((this.metrics[key] as number) || 0) + 1
  }

  getMetrics(): Readonly<Partial<PerformanceMetrics>> {
    return { ...this.metrics }
  }

  logMetrics() {
    if (!this.enabled) return
    console.group('🌟 VENUS 2.0 Performance Metrics')
    console.table(this.metrics)
    console.groupEnd()
  }

  reset() {
    this.metrics = {}
    this.timers.clear()
  }
}

export const perfMonitor = new PerformanceMonitor()
