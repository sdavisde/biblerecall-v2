import { Theme } from '@configuration/settings'
import { Lodash } from '@util/lodash'

export type SelectorOption<Value extends string = string> = {
  label: string
  value: Value
}

/**
 * Setting a new theme value into the document
 */
export const setThemeInDocument = (theme: Theme) => {
  if (!theme || Lodash.isNil(document)) {
    return
  }

  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark')
    }
  } else {
    document.documentElement.classList.remove('dark')
  }
}
