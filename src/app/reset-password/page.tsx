import Link from 'next/link'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { ResetPasswordForm } from './form'
import { Button } from '@components/ui/button'

export default function ResetPasswordPage() {
  return (
    <div className='w-screen h-screen centered flex-col gap-4 p-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Forgot your password?</CardTitle>
          <CardDescription>Please enter the email you use to sign into Bible Recall</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
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
