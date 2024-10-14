import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import { Toaster } from 'react-hot-toast'
import { api } from '@lib/trpc/server'
import VersesProvider from '@components/providers/VersesProvider'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const versesResult = await api.verse.allByUser()

  return (
    <VersesProvider verses={versesResult.hasValue ? versesResult.value : null}>
      <Navbar />
      <Toaster />
      <main className='w-full min-h-[calc(100vh-5rem)] overflow-x-hidden relative bg-lightGrey text-black dark:bg-black dark:text-white'>
        {children}
      </main>
      <Footer />
    </VersesProvider>
  )
}
