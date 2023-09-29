'use client'

import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Close, Tune } from '@mui/icons-material'
import Theme from './Theme'
import Study from './Study'
import { useSettings } from 'hooks/settings'
import useOutsideClick from 'hooks/click'

export default function Settings() {
  const [panelOpen, setPanelOpen] = useState(false)
  const { ref } = useOutsideClick(() => setPanelOpen(false))
  const [settings] = useSettings()

  useEffect(() => {
    setThemeInDocument(settings?.theme)
  }, [])

  return (
    <>
      <Tune
        className='h-full w-8 hover:cursor-pointer'
        onClick={() => setPanelOpen((prev) => !prev)}
      />
      <Transition
        as={Fragment}
        show={panelOpen}
        enter='transition ease-in-out duration-300 transform'
        enterFrom='translate-x-full'
        enterTo=' translate-x-0'
        leave='transition ease-in-out duration-300 transform'
        leaveFrom='translate-x-0'
        leaveTo='translate-x-full'
      >
        <div
          className='w-[300px] h-[calc(100vh-2.5rem)] absolute z-10 right-0 top-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-lightGrey text-black dark:bg-black dark:text-white'
          ref={ref}
        >
          <div className='w-full p-4 flex flex-col'>
            <div className='flex justify-between pb-4'>
              <h1 className='text-lg font-bold'>Settings</h1>
              <Close
                className='scale-150 centered hover:cursor-pointer'
                onClick={() => setPanelOpen(false)}
              />
            </div>
            <hr className='w-full bg-darkGrey h-[2px]' />
            <Theme />
            <Study />
          </div>
        </div>
      </Transition>
    </>
  )
}

export const setThemeInDocument = (theme: string | undefined) => {
  if (!theme) {
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