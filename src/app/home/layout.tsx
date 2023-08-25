import { VerseDto } from '@app/api/verse/util'
import Navbar from '@components/Navbar'
import VersesProvider from '@components/VersesProvider'
import { DB_User, authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'
import { database } from '@lib/firebase'
import { getDocs, collection } from 'firebase/firestore'

const fetchVerses = async (userId: string): Promise<VerseDto[]> => {
  console.log('userId', userId)
  const verses: VerseDto[] = []
  const versesRef = collection(database, 'Users', userId, 'verses')
  const snapshot = await getDocs(versesRef)

  snapshot.forEach((doc) => {
    const verseData = doc.data()
    verses.push({ ...(verseData as VerseDto), id: doc.id })
  })

  return verses
}

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
