import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import MapView from './components/MapView'
import Controls from './components/Controls'
import ScheduleModal from './components/ScheduleModal'
import { useWebSocket } from './hooks/useWebSocket'
import { DAYS } from './constants'
import { t } from './i18n'
import type { MapViewHandle } from './components/MapView'
import type { MowerStatus, Location, Schedule, NextUp, WsMessage } from './types'

const WS_URL =
  (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
  window.location.host +
  '/ws/mower'

const MAX_TRACK_POINTS = 500

function toMins(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function computeNextUp(schedules: Schedule[]): NextUp {
  const byDay: Partial<Record<string, { start: string; end: string }>> = {}
  for (const s of schedules) {
    if (!s.enabled) continue
    for (const day of s.days) {
      byDay[day] = { start: s.start_time, end: s.stop_time }
    }
  }

  const now = new Date()
  const today = DAYS.find(d => d.jsDay === now.getDay())

  if (today && byDay[today.key]) {
    const s = byDay[today.key]!
    const mins = now.getHours() * 60 + now.getMinutes()
    const startM = toMins(s.start)
    const endM = toMins(s.end)
    const inside =
      startM < endM ? mins >= startM && mins < endM : mins >= startM || mins < endM
    if (inside) {
      return { active: true, text: t.nextUp.runningNow(t.days[today.key], s.start, s.end) }
    }
  }

  for (let offset = 0; offset < 8; offset++) {
    const idx = (now.getDay() + offset) % 7
    const day = DAYS.find(d => d.jsDay === idx)
    if (!day || !byDay[day.key]) continue
    const s = byDay[day.key]!
    if (offset === 0) {
      const mins = now.getHours() * 60 + now.getMinutes()
      if (mins >= toMins(s.start)) continue
    }
    const label =
      offset === 0 ? t.nextUp.today : offset === 1 ? t.nextUp.tomorrow : t.days[day.key]
    return { active: false, text: t.nextUp.nextSession(label, s.start, s.end) }
  }

  return {
    active: false,
    text:
      Object.keys(byDay).length > 0
        ? t.nextUp.noUpcoming
        : t.nextUp.off,
  }
}

export default function App() {
  const [status, setStatus] = useState<MowerStatus>({ state: 'unknown', battery: 0 })
  const [location, setLocation] = useState<Location | null>(null)
  const [track, setTrack] = useState<[number, number][]>([])
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const mapViewRef = useRef<MapViewHandle>(null)

  const loadSchedules = useCallback(async () => {
    try {
      const r = await fetch('/api/schedules/')
      setSchedules((await r.json()) as Schedule[])
    } catch {}
  }, [])

  useEffect(() => { loadSchedules() }, [loadSchedules])

  const handleMessage = useCallback((msg: WsMessage) => {
    if (msg.type === 'location') {
      setLocation({ lat: msg.lat, lng: msg.lng })
      setTrack(prev => {
        const next: [number, number][] = [...prev, [msg.lat, msg.lng]]
        return next.length > MAX_TRACK_POINTS ? next.slice(-MAX_TRACK_POINTS) : next
      })
    } else if (msg.type === 'status') {
      setStatus({ state: msg.state, battery: msg.battery })
    }
  }, [])

  const send = useWebSocket(WS_URL, handleMessage)
  const sendCommand = useCallback((type: string) => send({ type }), [send])

  const badgeCount = useMemo(() => {
    const days = new Set<string>()
    for (const s of schedules) {
      if (s.enabled) s.days.forEach(d => days.add(d))
    }
    return days.size
  }, [schedules])

  const nextUp = useMemo(() => computeNextUp(schedules), [schedules])

  return (
    <div className="app">
      <div className="map-wrap">
        <MapView ref={mapViewRef} location={location} track={track} mowerState={status.state} />
        <button
          className="center-fab"
          onClick={() => mapViewRef.current?.centerOnMower()}
          disabled={!location}
          aria-label={t.schedule.ariaCenterOnMower}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className={`next-up${nextUp.active ? ' active' : ''}`}>
        <span className="next-up-dot" />
        <span className="next-up-lbl">{t.schedule.nextUpLabel}</span>
        <span>{nextUp.text}</span>
      </div>

      <Controls onCommand={sendCommand} status={status} onSchedule={() => setScheduleOpen(true)} badgeCount={badgeCount} />

      {scheduleOpen && (
        <ScheduleModal
          onClose={() => setScheduleOpen(false)}
          onSaved={loadSchedules}
        />
      )}
    </div>
  )
}
