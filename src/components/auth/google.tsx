'use client'

import { Button } from '@components/ui/button'
import { handleGoogleLogin } from './actions'
import GoogleIcon from 'public/icons/google-icon.png'
import Image from 'next/image'

export const GoogleLogin = () => {
  return (
    <Button
      variant='contrast'
      className='w-full flex items-center gap-2'
      onClick={async () => {
        try {
          const redirectUrl = await handleGoogleLogin()
          if (redirectUrl?.hasValue) {
            window.location.assign(redirectUrl.value)
          }
        } catch (e) {
          console.error(e)
        }
      }}
    >
      <Image
        src={GoogleIcon}
        alt='Google icon'
        width={25}
        height={25}
      />
      Login with Google
    </Button>
  )
}
