import { getServerSession } from 'next-auth'
import Navbar from '@components/Navbar'
import VersesProvider from '@components/VersesProvider'
import { DB_User, authOptions } from '@lib/auth'
import { fetchVerses } from '@lib/verses'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const verses = await fetchVerses((session?.user as DB_User)?.id)

  return (
    <VersesProvider verses={verses}>
      <main className='w-full h-screen'>
        <Navbar />
        {children}
      </main>
    </VersesProvider>
  )
}
