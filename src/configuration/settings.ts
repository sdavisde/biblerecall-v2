import { z } from 'zod'

export enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}
export enum Visibility {
  FULL = 'full',
  PARTIAL = 'partial',
  NONE = 'none',
}
export enum Font {
  URBANIST = 'urbanist',
  OPEN_DYSLEXIC = 'openDyslexic',
}
export enum Version {
  ESV = 'ESV',
  NIV = 'NIV',
  NLT = 'NLT',
  KJV = 'KJV',
  ASV = 'ASV',
  BBE = 'BBE',
  DARBY = 'DARBY',
  WEB = 'WEB',
  YLT = 'YLT',
}

export type Settings = {
  theme: Theme
  visibility: Visibility
  font: Font
  defaultVersion: Version
  verseOfTheDayEnabled: boolean
  verseDueDatesEnabled: boolean
}
export const settingsSchema = z.object({
  theme: z.nativeEnum(Theme),
  visibility: z.nativeEnum(Visibility),
  font: z.nativeEnum(Font),
  defaultVersion: z.nativeEnum(Version),
  verseOfTheDayEnabled: z.boolean(),
  verseDueDatesEnabled: z.boolean(),
})

export const DEFAULT_SETTINGS: Settings = {
  theme: Theme.SYSTEM,
  visibility: Visibility.FULL,
  font: Font.URBANIST,
  defaultVersion: Version.ESV,
  verseDueDatesEnabled: false,
  verseOfTheDayEnabled: false,
}
