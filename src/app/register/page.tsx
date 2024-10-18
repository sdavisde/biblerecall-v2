import Link from 'next/link'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { SignUpForm } from './form'
import { Button } from '@components/ui/button'

export default function RegisterPage() {
  return (
    <div className='w-screen h-screen centered flex-col gap-4 p-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Join Bible Recall</CardTitle>
          <CardDescription>Enter your email and password below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <Link href='/login'>
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
