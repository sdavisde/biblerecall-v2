'use client'

import Image from 'next/image'
import { useState } from 'react'
import Darkbox from '@components/common/Darkbox'
import { signIn } from 'next-auth/react'
import Controlled from './util/Controlled'
import { useSettings } from 'hooks/settings'
import CloseIcon from './icons/CloseIcon'

type LoginboxProps = {
  loggedIn: boolean
}

const Loginbox = ({ loggedIn }: LoginboxProps) => {
  const [showBox, setShowBox] = useState(true)
  const [settings] = useSettings()

  return (
    <Controlled shown={showBox && !loggedIn}>
      <Darkbox className='rounded'>
        <div className='w-full relative centered'>
          <CloseIcon
            className='w-3 h-3 absolute right-2 top-0 fill-black dark:fill-white hover:cursor-pointer'
            onClick={() => setShowBox((prev) => !prev)}
          />
          <p className='text-sm text-center w-[81%]'>
            Verses will be saved automatically to your device. <br />
            To view your verses on any device:
            <br />
            <button
              onClick={() =>
                signIn('google', {
                  callbackUrl: `${window.location.origin}/home`,
                })
              }
              className='underline'
            >
              Log In Here
            </button>
          </p>
        </div>
      </Darkbox>
    </Controlled>
  )
}

export default Loginbox
