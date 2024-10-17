'use client'

import { SelectorOption } from '.'
import { cn } from '@components/lib/utils'
import { PropsWithChildren } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card'
import { Lodash } from '@util/lodash'

type SettingSlotProps<Value extends string> = PropsWithChildren & {
  title: string
  description: string
  options: Array<SelectorOption<Value>>
  selectedValue: Value
  setter: (value: Value) => void
}

export function SettingSlot<Value extends string = string>({
  title,
  description,
  options,
  selectedValue,
  setter,
}: SettingSlotProps<Value>) {
  const numOptions = options.length
  const selectedOptionIndex = Math.max(
    options.findIndex((it) => it.value === selectedValue),
    0
  )
  const transitionClassname = 'transition-all duration-300 ease-in-out'
  const size = Lodash.round(100 / numOptions)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {!Lodash.isEmpty(description) && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className='rounded-full w-full relative border border-gray-800 centered'>
          {options.map((option, i) => (
            <button
              key={option.value}
              className={cn('centered cursor-pointer flex-1 bg-transparent rounded-full z-10', transitionClassname, {
                'text-background': option.value === selectedValue,
                'text-foreground': option.value !== selectedValue,
              })}
              onClick={() => setter(option.value)}
            >
              {option.label}
            </button>
          ))}
          <span
            className={cn(
              'rounded-full centered cursor-pointer flex-1 bg-foreground text-background h-6 z-[5]',
              transitionClassname
            )}
            style={{
              position: 'absolute',
              left: `${size * selectedOptionIndex}%`,
              width: `${size}%`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
