import { t } from '../i18n'
import type { MowerStatus } from '../types'

interface ControlsProps {
  onCommand: (type: string) => void
  status: MowerStatus
  onSchedule: () => void
  badgeCount: number
}

export default function Controls({ onCommand, status, onSchedule, badgeCount }: ControlsProps) {
  const mowing = status.state === 'mowing'

  return (
    <div className="controls">
      <button
        className="ctrl-btn btn-home"
        onClick={() => onCommand('home')}
        disabled={!mowing}
        aria-label={t.controls.ariaHome}
      >
        <span className="ico" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M5.5 10.5V20h13v-9.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <button
        className={`ctrl-btn ${mowing ? 'btn-stop' : 'btn-start'}`}
        onClick={() => onCommand(mowing ? 'stop' : 'start')}
        aria-label={mowing ? t.controls.ariaStop : t.controls.ariaStart}
      >
        <span className="ico" aria-hidden="true">
          {mowing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 5l13 7-13 7V5z" fill="currentColor"/>
            </svg>
          )}
        </span>
        {mowing ? t.controls.stop : t.controls.start}
      </button>

      <button
        className="ctrl-btn btn-schedule"
        onClick={onSchedule}
        aria-label={t.schedule.ariaFab}
      >
        <span className="ico" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
    </div>
  )
}
