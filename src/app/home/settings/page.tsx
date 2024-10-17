export const dynamic = 'auto'

import { api } from '@lib/trpc/server'
import { GoogleLogin } from '@components/auth/google'
import { ThemeSelect } from '@components/Settings/SettingSelectors/Theme'
import { VisibilitySelect } from '@components/Settings/SettingSelectors/Visibility'
import { FontSelect } from '@components/Settings/SettingSelectors/Font'

export default async function Settings() {
  const user = await api.user.get()

  return (
    <div className='w-full centered'>
      <div className='w-full max-w-4xl flex flex-col justify-start'>
        {!user ? (
          <div className='centered flex-col'>
            <h3 className='py-4'>Hmm, doesn&apos;t look like you are logged in. Please login to save settings</h3>
            <GoogleLogin />
          </div>
        ) : (
          <>
            <h1>Settings</h1>
            <div className='grid gap-6 py-4'>
              <FontSelect />
              <VisibilitySelect />
              <ThemeSelect />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
