'use client'

import { SelectorOption } from '.'
import { PropsWithChildren } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'

type SettingSlotProps<Value extends string> = PropsWithChildren & {
  options: Array<SelectorOption<Value>>
  selectedValue: Value
  setter: (value: Value) => void
}

export function SettingSlot<Value extends string = string>({
  children,
  options,
  selectedValue,
  setter,
}: SettingSlotProps<Value>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-full aspect-square flex items-center justify-center'>{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValue === option.value}
            onCheckedChange={(checked) => setter(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
