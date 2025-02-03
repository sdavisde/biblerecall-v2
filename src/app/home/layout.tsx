import Navbar from '@components/common/Navbar'
import { Toaster } from 'react-hot-toast'
import MobileNav from '@components/common/mobile-nav'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Toaster />
      <main className='w-full min-h-[calc(100vh-5rem)] overflow-x-hidden relative bg-background text-foreground'>
        <div
          id='panel'
          className='w-full min-h-[calc(100vh-5rem)] flex flex-col items-center'
        >
          <div className='w-[95%] md:w-[70%] lg:w-[55%] flex-1 flex flex-col items-center gap-6 my-6'>{children}</div>
        </div>
        <MobileNav />
      </main>
    </>
  )
}
