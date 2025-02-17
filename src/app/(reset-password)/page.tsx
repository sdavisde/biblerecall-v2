import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { ResetPasswordForm } from './form'
import { LinkButton } from '@components/ui/link-button'

export default function ResetPasswordPage() {
  return (
    <div className='w-screen h-screen centered flex-col gap-4 p-4'>
      <Card className='mx-auto max-w-sm relative'>
        <CardHeader>
          <CardTitle className='text-2xl'>Forgot your password?</CardTitle>
          <CardDescription>Please enter the email you use to sign into Bible Recall</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
        <div className='absolute -bottom-10 left-0 right-0 flex justify-between underline'>
          <LinkButton
            variant='link'
            href='/register'
          >
            Sign Up
          </LinkButton>
          <LinkButton
            variant='link'
            href='/reset-password'
          >
            Forgot Password
          </LinkButton>
        </div>
      </Card>
    </div>
  )
}
