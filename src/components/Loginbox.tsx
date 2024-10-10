'use client'

import { useState } from 'react'
import Darkbox from '@components/common/Darkbox'
import Controlled from './util/Controlled'
import CloseIcon from './icons/CloseIcon'
import { signInWithGoogle } from '@lib/firebase'
import { useUserId } from './providers/AuthProvider'
import { Lodash } from '@util/lodash'

type LoginboxProps = {}

const Loginbox = ({}: LoginboxProps) => {
  const [showBox, setShowBox] = useState(true)
  const userId = useUserId()
  const loggedIn = !Lodash.isEmpty(userId)

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithGoogle()
      console.log(response)
      // Redirect or handle post-login actions here
    } catch (error) {
      console.error('Google login failed:', error)
    }
  }

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
