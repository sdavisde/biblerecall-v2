import { VerseDto } from '@app/api/verse/util'
import { database } from '@lib/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const fetchVerses = async (userId: string): Promise<VerseDto[]> => {
  const verses: VerseDto[] = []
  const versesRef = collection(database, 'Users', userId, 'verses')
  const snapshot = await getDocs(versesRef)

  snapshot.forEach((doc) => {
    const verseData = doc.data()
    verses.push({ ...(verseData as VerseDto), id: doc.id })
  })

  return verses
}
