'use client'

import { SelectorOption } from '.'
import { capitalize } from 'util/string'
import DropDownArrow from '@components/icons/DropDownArrow'
import { useState } from 'react'
import cn from 'clsx'
import { Transition } from '@headlessui/react'

type SettingSlotProps = {
  label: string
  options: Array<SelectorOption>
  selectedValue: string
  setter: (value: string) => void
}

export const SettingSlot = ({ label, options, selectedValue, setter }: SettingSlotProps) => {
  const [open, setOpen] = useState(false)

  return (
    <form
      className='cursor-pointer'
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className='label h-16 p-4 centered justify-between z-0'>
        <label className='text-md font-semibold'>{label}</label>
        <div className='flex gap-3'>
          {capitalize(selectedValue)}
          <DropDownArrow className='w-4 fill-black dark:fill-white' />
        </div>
      </div>
      <div
        className={cn(
          'max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out divide-y divide-gray-200',
          {
            'max-h-screen': open,
          }
        )}
      >
        {options.map((option) => (
          <SettingsSlotOption
            key={option.value}
            setter={setter}
            {...option}
          />
        ))}
      </div>
    </form>
  )
}

type SettingsSlotOptionProps = {
  label: string
  value: string
  setter: (value: string) => void
}
const SettingsSlotOption = ({ label, value, setter }: SettingsSlotOptionProps) => {
  return (
    <option
      key={value}
      value={value}
      className='p-4 pl-8 text-md font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blackHover cursor-pointer'
      onClick={(e) => setter(e.currentTarget.value)}
    >
      {label}
    </option>
  )
}
