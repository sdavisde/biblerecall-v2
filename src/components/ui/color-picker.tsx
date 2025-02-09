'use client'

import * as React from 'react'

import { HexColorInput, HslColorPicker } from 'react-colorful'
import * as ColorUtils from '@components/lib/color-utils'
import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useEffect, useRef } from 'react'

interface ColorPickerProps {
  color?: ColorUtils.HSL
  onChange?: (val: ColorUtils.HSL | null) => void
}

const HSL_BLACK = { h: 0, s: 0, l: 0 }

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = React.useState<ColorUtils.HSL>(color ?? HSL_BLACK)
  const hex = ColorUtils.rgbToHex(ColorUtils.hslToRgb(currentColor))
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [inputRef])

  const handleColorChange = (newVal: ColorUtils.HSL) => {
    console.log('setting ', newVal)
    setCurrentColor(newVal)
    onChange?.(newVal)
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-[240px] justify-start text-left font-normal !p-0 overflow-hidden'
        >
          <div className='w-full h-full flex items-center gap-2'>
            <div
              className='h-full aspect-square !bg-center !bg-cover transition-all border-r'
              style={{ backgroundColor: ColorUtils.formatHsl(currentColor) }}
            />
            <div className='truncate flex-1'>{ColorUtils.formatHsl(currentColor)}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-80'
        onOpenAutoFocus={(e) => e.preventDefault()}
        autoFocus={false}
        forceMount
      >
        <HslColorPicker
          color={currentColor}
          onChange={handleColorChange}
        />
        <HexColorInput
          className='p-2'
          color={hex}
          onChange={(newHex) => {
            const newRgb = ColorUtils.hexToRgb(newHex)
            if (newRgb) handleColorChange(ColorUtils.rgbToHsl(newRgb))
          }}
          prefixed
        />
      </PopoverContent>
    </Popover>
  )
}
