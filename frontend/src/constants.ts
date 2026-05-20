import type { DayKey } from './types'

export interface Day {
  key: DayKey
  jsDay: number
}

export const DAYS: Day[] = [
  { key: 'mon', jsDay: 1 },
  { key: 'tue', jsDay: 2 },
  { key: 'wed', jsDay: 3 },
  { key: 'thu', jsDay: 4 },
  { key: 'fri', jsDay: 5 },
  { key: 'sat', jsDay: 6 },
  { key: 'sun', jsDay: 0 },
]
