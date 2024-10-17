'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { GoogleLogin } from '@components/auth/google'
import { Separator } from '@components/ui/separator'
import { loginWithCredentials } from '@lib/firebase'

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>('')
  const router = useRouter()

  const handleLogin = async () => {
    const userCredential = await loginWithCredentials(email, password)
    console.log(userCredential)
    if (!userCredential.hasValue) {
      setError(userCredential.error.message)
    }
    // router.push('/home')
  }

  return (
    <form className='grid gap-4'>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='m@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='grid gap-2'>
        <div className='flex items-center'>
          <Label htmlFor='password'>Password</Label>
          <Link
            href='#'
            className='ml-auto inline-block text-sm underline'
          >
            Forgot your password?
          </Link>
        </div>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className='text-red'>{error}</p>}
      <Button
        type='submit'
        className='w-full'
        onClick={handleLogin}
      >
        Login
      </Button>
      <Separator label='or' />
      <GoogleLogin />
    </form>
  )
}
