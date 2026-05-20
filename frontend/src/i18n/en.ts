import type { Translations } from './types'

const en: Translations = {
  days: {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  },
  controls: {
    start: 'Start',
    stop: 'Stop',
    home: 'Home',
    ariaStart: 'Start mowing',
    ariaStop: 'Stop mowing',
    ariaHome: 'Return to dock',
  },
  schedule: {
    fab: 'Schedule',
    ariaFab: 'Open schedule',
    ariaCenterOnMower: 'Center on mower',
    title: 'Schedule',
    subtitle: 'Pick days & working hours. Mower starts and stops automatically.',
    nextUpLabel: 'Schedule',
    clearAll: 'Clear all',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving…',
    ariaClose: 'Close',
  },
  nextUp: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    runningNow: (dayName, start, end) => `Running now · ${dayName} ${start}–${end}`,
    nextSession: (label, start, end) => `Next session — ${label} ${start}–${end}`,
    noUpcoming: 'No upcoming sessions this week.',
    off: 'Off — tap Schedule to set working hours.',
  },
}

export default en
