import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { LoginForm } from './form'
import Image from 'next/image'
import Logo from '@app/apple-icon.png'
import { LinkButton } from '@components/ui/link-button'

export default function LoginPage() {
  return (
    <div className='w-screen h-screen centered flex-col gap-4 p-4'>
      <Card className='mx-auto max-w-sm relative'>
        <Image
          src={Logo}
          alt='Bible Recall'
          className='rounded-xl w-20 aspect-square absolute left-1/2 -translate-x-1/2'
          style={{
            top: '-100px',
          }}
        />
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Logging in ensures your verses are never lost</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <div className='absolute -bottom-10 left-0 right-0 flex justify-between'>
          <LinkButton
            variant='link'
            href='/register'
          >
            Sign Up
          </LinkButton>
        </div>
      </Card>
    </div>
  )
}
