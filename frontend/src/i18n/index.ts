import sv from './sv'
import en from './en'
import type { Translations } from './types'

export type { Translations }
export type Locale = 'sv' | 'en'

const locales: Record<Locale, Translations> = { sv, en }

export const locale: Locale = 'sv'
export const t: Translations = locales[locale]
