'use client'

import { Button } from '@components/ui/button'
import { handleGoogleLogin } from './actions'
import GoogleIcon from 'public/icons/google-icon.png'
import Image from 'next/image'
import { createClient } from '@lib/supabase/client'
import { getBaseUrl } from '@components/lib/utils'
import toast from 'react-hot-toast'

export const GoogleLogin = () => {
  return (
    <Button
      variant='contrast'
      className='w-full flex items-center gap-2'
      onClick={async () => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${getBaseUrl()}/auth/callback`,
          },
        })

        if (error) {
          toast.error('Failed to sign in using google')
          return
        }

        window.location.assign(data.url)
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
