export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type MowerState = 'mowing' | 'charging' | 'idle' | 'error' | 'unknown'

export interface MowerStatus {
  state: MowerState
  battery: number
}

export interface Location {
  lat: number
  lng: number
}

export interface Schedule {
  id: string
  days: DayKey[]
  start_time: string
  stop_time: string
  enabled: boolean
}

export type WsMessage =
  | { type: 'location'; lat: number; lng: number }
  | { type: 'status'; state: MowerState; battery: number }

export interface NextUp {
  active: boolean
  text: string
}
