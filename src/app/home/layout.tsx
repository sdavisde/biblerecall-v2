import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import VersesProvider from '@components/providers/VersesProvider'
import { fetchVerses } from '@lib/api'
import { Toaster } from 'react-hot-toast'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const verses = await fetchVerses()

  return (
    <VersesProvider verses={verses}>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      ></meta>
      <main className='w-full h-screen'>
        <Toaster />
        <Navbar />
        <div className='w-full h-[88%] overflow-y-scroll'>{children}</div>
        <Footer />
      </main>
    </VersesProvider>
  )
}
