import { useState, useEffect } from 'react'
import { DAYS } from '../constants'
import { t } from '../i18n'
import type { DayKey, Schedule } from '../types'

interface ScheduleModalProps {
  onClose: () => void
  onSaved: () => void
}

interface DayState {
  on: boolean
  start: string
  end: string
}

type DaysState = Record<DayKey, DayState>

function defaultState(): DaysState {
  const s = {} as DaysState
  for (const d of DAYS) s[d.key] = { on: false, start: '14:00', end: '17:00' }
  return s
}

export default function ScheduleModal({ onClose, onSaved }: ScheduleModalProps) {
  const [days, setDays] = useState<DaysState>(defaultState)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch('/api/schedules/')
      .then(r => r.json())
      .then((schedules: Schedule[]) => {
        const base = defaultState()
        for (const s of schedules) {
          if (!s.enabled) continue
          for (const day of s.days) {
            if (base[day]) base[day] = { on: true, start: s.start_time, end: s.stop_time }
          }
        }
        setDays(base)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function toggle(key: DayKey) {
    setDays(d => ({ ...d, [key]: { ...d[key], on: !d[key].on } }))
  }

  function setTime(key: DayKey, field: 'start' | 'end', value: string) {
    setDays(d => ({ ...d, [key]: { ...d[key], [field]: value } }))
  }

  function clearAll() {
    setDays(defaultState())
  }

  async function save() {
    setBusy(true)
    try {
      const existing: Schedule[] = await fetch('/api/schedules/').then(r => r.json())
      await Promise.all(
        existing.map(s => fetch(`/api/schedules/${s.id}`, { method: 'DELETE' })),
      )
      await Promise.all(
        DAYS
          .filter(d => days[d.key].on)
          .map(d =>
            fetch('/api/schedules/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                days: [d.key],
                start_time: days[d.key].start,
                stop_time: days[d.key].end,
                enabled: true,
              }),
            }),
          ),
      )
      onSaved()
      onClose()
    } catch {
      setBusy(false)
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="sched-title">
        <div className="modal-head">
          <div>
            <h2 id="sched-title">{t.schedule.title}</h2>
            <div className="modal-sub">{t.schedule.subtitle}</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label={t.schedule.ariaClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {DAYS.map(d => {
            const s = days[d.key]
            return (
              <div
                key={d.key}
                className={`day-row${s.on ? ' is-on' : ''}`}
                onClick={() => toggle(d.key)}
              >
                <span className="day-check" />
                <span className="day-name">{t.days[d.key]}</span>
                <span className="day-times" onClick={e => e.stopPropagation()}>
                  <input
                    type="time"
                    value={s.start}
                    onChange={e => setTime(d.key, 'start', e.target.value)}
                  />
                  <span className="dash">–</span>
                  <input
                    type="time"
                    value={s.end}
                    onChange={e => setTime(d.key, 'end', e.target.value)}
                  />
                </span>
              </div>
            )
          })}
        </div>

        <div className="modal-foot">
          <button className="btn-sm btn-ghost" onClick={clearAll}>{t.schedule.clearAll}</button>
          <div className="modal-foot-right">
            <button className="btn-sm btn-secondary-sm" onClick={onClose}>{t.schedule.cancel}</button>
            <button className="btn-sm btn-primary-sm" onClick={save} disabled={busy}>
              {busy ? t.schedule.saving : t.schedule.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
