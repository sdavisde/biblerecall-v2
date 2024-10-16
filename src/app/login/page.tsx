import Link from 'next/link'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { LoginForm } from './form'
import { Button } from '@components/ui/button'

export default function LoginPage() {
  return (
    <div className='w-screen h-screen centered flex-col gap-4 p-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?
            <Link
              href='/register'
              className='underline ms-2'
            >
              Sign up
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <Link href='/'>
            <Button
              variant='link'
              className='text-gray-400 !p-0'
              asDiv
            >
              Go back
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
