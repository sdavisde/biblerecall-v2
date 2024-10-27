import Link from 'next/link'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { ChangePasswordForm } from './form'
import { Button } from '@components/ui/button'
import { ParsedUrlQuery } from 'querystring'
import { verifyPasswordResetCode } from '@lib/firebase'
import { notFound } from 'next/navigation'

type ChangePasswordPageProps = {
  searchParams: Promise<ParsedUrlQuery>
}

export default async function ChangePasswordPage(props: ChangePasswordPageProps) {
  const searchParams = await props.searchParams
  // middlware checks that this path contains this code, so this is safe
  const code = searchParams['oobCode'] as string
  const verifyCode = async () => {
    const result = await verifyPasswordResetCode(code)
    if (!result.hasValue) {
      return notFound()
    }
  }
  verifyCode()

  return (
    <div className='w-screen h-screen centered flex-col gap-4 p-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Change your password</CardTitle>
          <CardDescription>Please enter a new password for your bible recall account</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm code={code} />
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
