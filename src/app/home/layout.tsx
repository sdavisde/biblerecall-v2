import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import { Toaster } from 'react-hot-toast'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Toaster />
      <main className='w-full min-h-[calc(100vh-5rem)] overflow-x-hidden relative bg-lightGrey text-black dark:bg-black dark:text-white'>
        {children}
      </main>
      <Footer />
    </>
  )
}
