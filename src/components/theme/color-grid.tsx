'use client'

import { Tables } from 'database.types'
import * as ColorUtils from '@components/lib/color-utils'
import { ColorPicker } from '@components/ui/color-picker'
import { useTheme } from 'next-themes'
import { createClient } from '@lib/supabase/client'
import toast from 'react-hot-toast'

type Props = {
  colors: Array<Tables<'colors'>>
}
export function ColorGrid({ colors }: Props) {
  const { resolvedTheme } = useTheme()
  const filteredColors = colors.filter((it) => it.theme === resolvedTheme)

  const handleChange = async (color: Tables<'colors'>, newVal: ColorUtils.HSL | null) => {
    if (!newVal) {
      toast.error(`${color.name} failed to update`)
      return
    }

    const newColor = { ...color, hsl: `${newVal.h} ${newVal.s}% ${newVal.l}%` }
    const supabase = createClient()
    const result = await supabase.from('colors').update(newColor).eq('id', color.id)
    if (result.error) {
      toast.error(`${color.name} failed to update`)
      return
    }

    const appliedColors = [...filteredColors.filter((it) => it.id !== newColor.id), newColor]
    applyTheme(appliedColors)
  }

  return (
    <div className='grid grid-cols-3 gap-8'>
      {filteredColors.map((color) => {
        const hsl = ColorUtils.parseHslString(`hsl(${color.hsl})`)
        if (!hsl) {
          return <p key={color.id}>Error parsing {`hsl(${color.hsl})`}</p>
        }
        return (
          <div key={color.id}>
            <p className='capitalize'>{color.name}</p>
            <ColorPicker
              color={ColorUtils.formatHsl(hsl)}
              onChange={(val) => handleChange(color, val)}
            />
          </div>
        )
      })}
    </div>
  )
}

const applyTheme = (colors: Array<Tables<'colors'>>) => {
  const root = document.documentElement

  colors.forEach((color) => {
    root.style.setProperty(`--${color.name}`, color.hsl)
  })
}
