import { getServerSession } from 'next-auth'
import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import VersesProvider from '@components/providers/VersesProvider'
import { DB_User, authOptions } from '@lib/auth'
import { fetchVerses } from '@lib/api'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const verses = await fetchVerses((session?.user as DB_User)?.id)

  return (
    <VersesProvider verses={verses}>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      ></meta>
      <main className='w-full h-screen'>
        <Navbar />
        <div className='w-full h-[88%] overflow-y-scroll'>{children}</div>
        <Footer />
      </main>
    </VersesProvider>
  )
}
