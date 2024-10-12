'use client'

import { handleLoginWithAccessToken } from '@lib/firebase'
import { CredentialResponse, GoogleLogin as GoogleSignInButton, useGoogleOneTapLogin } from '@react-oauth/google'

const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
  const accessToken = credentialResponse.credential
  handleLoginWithAccessToken(accessToken)
}

export const GoogleLogin = () => {
  return (
    <GoogleSignInButton
      onSuccess={handleGoogleLogin}
      onError={() => console.error('Login Failed')}
    />
  )
}

export const useOneTapLogin = () => {
  useGoogleOneTapLogin({
    onSuccess: handleGoogleLogin,
    onError: () => {
      console.error('Google One Tap Login failed')
    },
    auto_select: true,
  })
}
