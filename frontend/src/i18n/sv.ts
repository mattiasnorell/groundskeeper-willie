import type { Translations } from './types'

const sv: Translations = {
  days: {
    mon: 'Måndag',
    tue: 'Tisdag',
    wed: 'Onsdag',
    thu: 'Torsdag',
    fri: 'Fredag',
    sat: 'Lördag',
    sun: 'Söndag',
  },
  controls: {
    start: 'Starta',
    stop: 'Stoppa',
    home: 'Hem',
    ariaStart: 'Starta klippning',
    ariaStop: 'Stoppa klippning',
    ariaHome: 'Återgå till dockan',
  },
  schedule: {
    fab: 'Schema',
    ariaFab: 'Öppna schema',
    ariaCenterOnMower: 'Centrera på klipparen',
    title: 'Schema',
    subtitle: 'Välj dagar & arbetstider. Klipparen startar och stoppar automatiskt.',
    nextUpLabel: 'Schema',
    clearAll: 'Rensa alla',
    cancel: 'Avbryt',
    save: 'Spara',
    saving: 'Sparar…',
    ariaClose: 'Stäng',
  },
  nextUp: {
    today: 'Idag',
    tomorrow: 'Imorgon',
    runningNow: (dayName, start, end) => `Kör nu · ${dayName} ${start}–${end}`,
    nextSession: (label, start, end) => `Nästa session — ${label} ${start}–${end}`,
    noUpcoming: 'Inga kommande sessioner denna vecka.',
    off: 'Av — tryck på Schema för att ställa in arbetstider.',
  },
}

export default sv
