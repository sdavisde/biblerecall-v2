import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import VersesProvider from '@components/providers/VersesProvider'
import { fetchVerses, getSettings } from '@lib/api'
import { Toaster } from 'react-hot-toast'
import { SettingsProvider } from '@components/Settings/Provider'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const verses = await fetchVerses()
  const { DATA: settings } = await getSettings()

  return (
    <SettingsProvider settings={settings}>
      <VersesProvider verses={verses}>
        <Navbar />
        <Toaster />
        <main className='w-full min-h-[calc(100vh-5rem)] relative bg-lightGrey text-black dark:bg-black dark:text-white'>
          {children}
        </main>
        <Footer />
      </VersesProvider>
    </SettingsProvider>
  )
}
