'use client'

import { Tables } from 'database.types'
import Head from 'next/head'

type Props = {
  rootColors: Array<Tables<'colors'>>
  darkColors: Array<Tables<'colors'>>
}
export function ColorStyle({ rootColors, darkColors }: Props) {
  return (
    <style
      id='dynamicColors'
      jsx
      global
    >
      {`
        :root {
          ${rootColors.map((color) => `--${color.name}: ${color.hsl};`).join('\n')}
        }
        .dark {
          ${darkColors.map((color) => `--${color.name}: ${color.hsl};`).join('\n')}
        }
      `}
    </style>
  )
}
