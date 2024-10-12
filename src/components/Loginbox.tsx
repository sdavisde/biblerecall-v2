'use client'

import Darkbox from '@components/common/Darkbox'
import { GoogleLogin, useOneTapLogin } from './auth/google'

type LoginboxProps = {}

const Loginbox = ({}: LoginboxProps) => {
  useOneTapLogin()

  return (
    <Darkbox className='rounded h-24'>
      <div className='w-full relative centered flex-col gap-2'>
        <p className='text-sm text-center w-[81%]'>
          Verses will be saved automatically to your device. <br />
          To view your verses on any device, please sign in with google.
        </p>
        <GoogleLogin />
      </div>
    </Darkbox>
  )
}

export default Loginbox
