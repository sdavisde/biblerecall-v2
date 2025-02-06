import { Font, Settings, Theme, Version, Visibility } from '@configuration/settings'

export const getSettingsFromLocalStorage = (): Settings | null => {
  try {
    return {
      id: '',
      theme: fetchTheme(),
      visibility: fetchVisibility(),
      font: fetchFont(),
      defaultVersion: fetchDefaultVersion(),
      verseDueDatesEnabled: fetchVerseDueDatesEnabled(),
      verseOfTheDayEnabled: fetchVerseOfTheDayEnabled(),
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

const fetchTheme = (): Theme => {
  if (!localStorage) {
    throw new Error('Local storage is not available')
  }

  const theme = localStorage.getItem('theme')
  if (!theme || !Object.values(Theme).includes(theme as any)) {
    throw new Error(`Invalid theme: ${theme}`)
  }

  return theme as Theme
}

const fetchVisibility = (): Visibility => {
  if (!localStorage) {
    throw new Error('Local storage is not available')
  }

  const visibility = localStorage.getItem('visibility')
  if (!visibility || !Object.values(Visibility).includes(visibility as any)) {
    throw new Error(`Invalid visibility: ${visibility}`)
  }

  return visibility as Visibility
}

const fetchFont = (): Font => {
  if (!localStorage) {
    throw new Error('Local storage is not available')
  }

  const font = localStorage.getItem('font')
  if (!font || !Object.values(Font).includes(font as any)) {
    throw new Error(`Invalid font: ${font}`)
  }

  return font as Font
}

const fetchDefaultVersion = (): Version => {
  if (!localStorage) {
    throw new Error('Local storage is not available')
  }

  const defaultVersion = localStorage.getItem('defaultVersion')
  if (!defaultVersion || !Object.values(Version).includes(defaultVersion as any)) {
    throw new Error(`Invalid defaultVersion: ${defaultVersion}`)
  }

  return defaultVersion as Version
}

const fetchVerseDueDatesEnabled = (): boolean => {
  if (!localStorage) {
    throw new Error('Local storage is not available')
  }

  const verseDueDatesEnabled = localStorage.getItem('verseDueDatesEnabled')
  if (!verseDueDatesEnabled) {
    throw new Error(`Invalid verseDueDatesEnabled: ${verseDueDatesEnabled}`)
  }

  return verseDueDatesEnabled === 'true'
}

const fetchVerseOfTheDayEnabled = (): boolean => {
  if (!localStorage) {
    throw new Error('Local storage is not available')
  }

  const verseOfTheDayEnabled = localStorage.getItem('verseOfTheDayEnabled')
  if (!verseOfTheDayEnabled) {
    throw new Error(`Invalid verseOfTheDayEnabled: ${verseOfTheDayEnabled}`)
  }

  return verseOfTheDayEnabled === 'true'
}

export const setSettingsIntoLocalStorage = (settings: Settings) => {
  localStorage.setItem('theme', settings.theme)
  localStorage.setItem('visibility', settings.visibility)
  localStorage.setItem('font', settings.font)
  localStorage.setItem('defaultVersion', settings.defaultVersion)
  localStorage.setItem('verseDueDatesEnabled', settings.verseDueDatesEnabled.toString())
  localStorage.setItem('verseOfTheDayEnabled', settings.verseOfTheDayEnabled.toString())
}
