import { Lodash } from '@util/lodash'
import React from 'react'
import { ThemeSelect } from './SettingSelectors/Theme'
import { VisibilitySelect } from './SettingSelectors/Visibility'
import { FontSelect } from './SettingSelectors/Font'

export default function Settings({}) {
  return (
    <div className='flex'>
      <FontSelect />
      <VisibilitySelect />
      <ThemeSelect />
    </div>
  )
}

// Does this get run?
export const setThemeInDocument = (theme: string | undefined) => {
  console.log('set theme in document', theme)
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
