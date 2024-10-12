export const dynamic = 'auto'

import { GoogleLogin } from '@components/auth/google'
import { api } from '@lib/trpc/server'

export default async function Settings() {
  const settings = await api.settings.get()
  const user = await api.user.get()

  return (
    <div className='w-full centered'>
      <div className='w-full max-w-4xl flex flex-col justify-start'>
        {!user ? (
          <div className='centered flex-col'>
            <h3 className='py-4'>Hmm, doesn't look like you are logged in. Please login to save settings</h3>
            {/* <span className='max-w-xs'> */}
            <GoogleLogin />
            {/* </span> */}
          </div>
        ) : (
          <>
            <h1>Settings</h1>
            <p></p>
          </>
        )}
      </div>
    </div>
  )
}
