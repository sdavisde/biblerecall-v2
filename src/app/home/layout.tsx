import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import VersesProvider from '@components/providers/VersesProvider'
import { Toaster } from 'react-hot-toast'
import { SettingsProvider } from '@components/Settings/Provider'
import { trpcServer } from '@lib/trpc/server'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const versesResult = await trpcServer.verse.allByUser()
  const settingsResult = await trpcServer.settings.get()

  return (
    <SettingsProvider authUserSettings={settingsResult.hasValue ? settingsResult.value : null}>
      <VersesProvider verses={versesResult.hasValue ? versesResult.value : null}>
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
