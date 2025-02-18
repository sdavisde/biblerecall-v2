import { Toaster } from 'react-hot-toast'
import { MobileNav } from '@components/navigation/mobile-nav'
import { GlobalBanner } from '@components/meditations/global-banner'
import { DesktopNav } from '@components/navigation/desktop-nav'

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalBanner />
      <Toaster />
      <main className='w-full min-h-[calc(100vh-5rem)] pb-20 overflow-x-hidden relative bg-background text-foreground'>
        <div
          id='panel'
          className='w-full min-h-[calc(100vh-5rem)] flex flex-col items-center'
        >
          <DesktopNav />
          <div className='w-[95%] md:w-[70%] lg:w-[55%] flex-1 flex flex-col items-center gap-6 my-6'>{children}</div>
        </div>
        <MobileNav />
      </main>
    </>
  )
}
