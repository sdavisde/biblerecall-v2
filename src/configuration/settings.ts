import { z } from 'zod'

export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}
export enum Visibility {
  Full = 'full',
  Partial = 'partial',
  None = 'none',
}
export enum Font {
  Urbanist = 'urbanist',
  OpenDyslexic = 'openDyslexic',
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

export type Settings = z.infer<typeof settingsSchema>
export const settingsSchema = z.object({
  id: z.string(),
  theme: z.nativeEnum(Theme),
  visibility: z.nativeEnum(Visibility),
  font: z.nativeEnum(Font),
  defaultVersion: z.nativeEnum(Version),
  verseOfTheDayEnabled: z.boolean(),
  verseDueDatesEnabled: z.boolean(),
})

export const DEFAULT_SETTINGS: Settings = {
  id: '',
  theme: Theme.System,
  visibility: Visibility.Full,
  font: Font.Urbanist,
  defaultVersion: Version.ESV,
  verseDueDatesEnabled: false,
  verseOfTheDayEnabled: false,
}
