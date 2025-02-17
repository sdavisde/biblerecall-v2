'use client'

import { Tables } from 'database.types'
import * as ColorUtils from '@components/lib/color-utils'
import { ColorPicker } from '@components/ui/color-picker'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'
import { Lodash } from '@util/lodash'
import { updateColor } from 'src/server/routers/colors'

type Props = {
  colors: Array<Tables<'colors'>>
}
export function ColorGrid({ colors }: Props) {
  const { resolvedTheme } = useTheme()
  const filteredColors = colors.filter((it) => it.theme === resolvedTheme)

  const handleChange = Lodash.debounce(async (color: Tables<'colors'>, newVal: ColorUtils.HSL | null) => {
    if (!newVal) {
      toast.error(`${color.name} failed to update`)
      return
    }

    const newColor = { ...color, hsl: `${newVal.h} ${newVal.s}% ${newVal.l}%` }
    const result = await updateColor(newColor)
    if (!result.hasValue) {
      toast.error(`${color.name} failed to update`)
      return
    }
  }, 1000)

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
              color={hsl}
              onChange={(val) => handleChange(color, val)}
            />
          </div>
        )
      })}
    </div>
  )
}
