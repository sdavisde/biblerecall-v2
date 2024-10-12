'use client'

import { useState } from 'react'
import Darkbox from '@components/common/Darkbox'
import Controlled from './util/Controlled'
import CloseIcon from './icons/CloseIcon'
import { signInWithGoogle } from '@lib/firebase'

type LoginboxProps = {}

const Loginbox = ({}: LoginboxProps) => {
  const [showBox, setShowBox] = useState(true)

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithGoogle()
      if (!response) {
        throw new Error('google signin failed')
      }

      location.reload()
    } catch (error) {
      console.error('Google login failed:', error)
    }
  }

  return (
    <Controlled shown={showBox}>
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
              onClick={handleGoogleLogin}
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
