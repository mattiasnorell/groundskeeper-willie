import type { DayKey } from '../types'

export interface Translations {
  days: Record<DayKey, string>
  controls: {
    start: string
    stop: string
    home: string
    ariaStart: string
    ariaStop: string
    ariaHome: string
  }
  schedule: {
    fab: string
    ariaFab: string
    ariaCenterOnMower: string
    title: string
    subtitle: string
    nextUpLabel: string
    clearAll: string
    cancel: string
    save: string
    saving: string
    ariaClose: string
  }
  nextUp: {
    today: string
    tomorrow: string
    runningNow(dayName: string, start: string, end: string): string
    nextSession(label: string, start: string, end: string): string
    noUpcoming: string
    off: string
  }
}
