import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import VersesProvider from '@components/providers/VersesProvider'
import { fetchVerses, getAuthenticatedSettings } from '@lib/api'
import { Toaster } from 'react-hot-toast'
import { SettingsProvider } from '@components/Settings/Provider'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const verses = await fetchVerses()
  const { DATA: authenticatedUserSettings } = await getAuthenticatedSettings()

  return (
    <SettingsProvider authUserSettings={authenticatedUserSettings}>
      <VersesProvider verses={verses}>
        <Navbar />
        <Toaster />
        <main className='w-full min-h-[calc(100vh-5rem)] overflow-x-hidden relative bg-lightGrey text-black dark:bg-black dark:text-white'>
          {children}
        </main>
        <Footer />
      </VersesProvider>
    </SettingsProvider>
  )
}
