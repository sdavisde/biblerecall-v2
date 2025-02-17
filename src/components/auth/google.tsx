'use client'

import { Button } from '@components/ui/button'
import GoogleIcon from 'public/icons/google-icon.png'
import Image from 'next/image'
import { createClient } from '@lib/supabase/client'
import { getBaseUrl } from '@components/lib/utils'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const GoogleLogin = () => {
  const [pending, setPending] = useState(false)
  return (
    <Button
      variant='contrast'
      className='w-full flex items-center gap-2'
      onClick={async () => {
        const supabase = createClient()
        setPending(true)
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

        setPending(false)
        window.location.assign(data.url)
      }}
      loading={pending}
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
