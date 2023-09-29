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
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        ></meta>
        <main className='w-full h-screen relative bg-lightGrey text-black dark:bg-black dark:text-white'>
          <Toaster />
          <Navbar />
          <div className='w-full h-[88%] overflow-y-scroll'>{children}</div>
          <Footer />
        </main>
      </VersesProvider>
    </SettingsProvider>
  )
}
