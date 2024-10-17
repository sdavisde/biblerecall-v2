'use client'

import { Button } from '@components/ui/button'
import { signInWithGoogle } from '@lib/firebase'

export const GoogleLogin = () => {
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
    <Button
      variant='secondary'
      className='w-full'
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  )
}
