'use client'

import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Close } from '@mui/icons-material'
import Theme from './SettingSelectors/Theme'
import Visibility from './SettingSelectors/Visibility'
import useOutsideClick from 'hooks/click'
import SettingsIcon from '@components/icons/SettingsIcon'
import Font from './SettingSelectors/Font'
import { Lodash } from '@util/lodash'

export default function Settings() {
  const [panelOpen, setPanelOpen] = useState(false)
  const { ref } = useOutsideClick(() => setPanelOpen(false))

  return (
    <>
      <div className='centered py-1'>
        <SettingsIcon
          className='h-full w-10 centered cursor-pointer'
          onClick={() => setPanelOpen((prev) => !prev)}
        />
      </div>
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
          <div className='w-full flex flex-col divide-y divide:black dark:divide-white'>
            <div className='flex justify-between p-4'>
              <h1 className='text-lg font-bold'>Settings</h1>
              <Close
                className='scale-150 centered hover:cursor-pointer'
                onClick={() => setPanelOpen(false)}
              />
            </div>
            <Theme />
            <Visibility />
            <Font />
            {/* Render a section to allow people to leave feedback and log out */}
            <p className='text-sm centered text-center flex-col gap-2 p-2'>
              This app was made to help everyone memorize scripture. I would love to hear your feedback on what would
              help you!
              <br />
              <a
                className='underline cursor-pointer'
                href='https://forms.gle/9sSaHCQJnMYAMw1w6'
              >
                Leave Feedback
              </a>
            </p>
          </div>
        </div>
      </Transition>
    </>
  )
}

export const setThemeInDocument = (theme: string | undefined) => {
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
