import { database } from '@lib/firebase'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, Timestamp, updateDoc } from 'firebase/firestore'
import { Verse } from 'service/verse/types'

// Firebase stores data a little differently - here's a type to signify that
type FirebaseVerse = Omit<Verse, 'createdDate'> & {
  createdDate: Timestamp
}

export namespace Database {
  type GetVerseRequest = {
    userId: string
    verseId: string
  }
  export const getVerse = async (request: GetVerseRequest): Promise<Result<Verse>> => {
    if (Lodash.isEmpty(request.userId)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }

    if (Lodash.isEmpty(request.verseId)) {
      return Result.failure({ code: ErrorCode.VERSE_ID_NOT_PROVIDED, message: 'Verse id not provided' })
    }

    const verseRef = doc(database, 'Users', request.userId, 'verses', request.verseId)

    try {
      const snapshot = await getDoc(verseRef)
      const firebaseVerse = snapshot.data() as FirebaseVerse
      return normalizeFirebaseVerse(firebaseVerse, snapshot.id)
    } catch (e) {
      return Result.failure({ code: ErrorCode.VERSE_NOT_FOUND, message: 'Verse not found' })
    }
  }

  type GetVersesRequest = {
    userId: string
  }
  export const getVerses = async (request: GetVersesRequest): Promise<Result<Verse[]>> => {
    const { userId } = request

    if (Lodash.isNil(userId)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }

    const verses: Verse[] = []
    const versesRef = collection(database, 'Users', userId, 'verses')

    if (Lodash.isNil(versesRef)) {
      return Result.failure({ code: ErrorCode.VERSE_NOT_FOUND, message: 'Verse collection not found' })
    }

    const snapshot = await getDocs(versesRef)

    snapshot.forEach((doc) => {
      const firebaseVerse = doc.data() as FirebaseVerse
      const verse = normalizeFirebaseVerse(firebaseVerse, doc.id)
      if (verse.hasValue) {
        verses.push(verse.value)
      }
    })

    return Result.success(verses)
  }

  type AddVerseRequest = {
    userId: string
    verse: Verse
  }
  export const addVerse = async (request: AddVerseRequest): Promise<Result<Verse>> => {
    const { userId, verse } = request

    if (Lodash.isNil(userId)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }
    if (Lodash.isNil(verse)) {
      return Result.failure({
        code: ErrorCode.VERSE_INFORMATION_NOT_PROVIDED,
        message: 'Verse information not provided',
      })
    }

    const versesRef = collection(database, 'Users', userId, 'verses')
    const newVerseRef = await addDoc(versesRef, verse)
    const newVerse = { ...verse, id: newVerseRef.id }

    return Result.success(newVerse)
  }

  type DeleteVerseRequest = {
    userId: string
    verseId: string
  }
  export const deleteVerse = async (request: DeleteVerseRequest): Promise<Result<null>> => {
    const { userId, verseId } = request

    if (Lodash.isNil(userId) || Lodash.isEmpty(userId)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }
    if (Lodash.isNil(verseId) || Lodash.isEmpty(verseId)) {
      return Result.failure({ code: ErrorCode.VERSE_ID_NOT_PROVIDED, message: 'Verse id not provided' })
    }

    const verseRef = doc(database, 'Users', userId, 'verses', verseId)

    try {
      await deleteDoc(verseRef)
      return Result.success(null)
    } catch (e: any) {
      return Result.failure({ code: ErrorCode.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }

  type UpdateVerseRequest = {
    userId: string
    verse: Verse
  }
  export const updateVerse = async (request: UpdateVerseRequest): Promise<Result<Verse>> => {
    const { userId, verse } = request

    if (Lodash.isNil(userId) || Lodash.isEmpty(userId)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }
    if (Lodash.isNil(verse)) {
      return Result.failure({
        code: ErrorCode.VERSE_INFORMATION_NOT_PROVIDED,
        message: 'Verse information not provided',
      })
    }

    const verseRef = doc(database, 'Users', userId, 'verses', verse.id)
    try {
      await updateDoc(verseRef, verse)
      return Result.success(verse)
    } catch (e: any) {
      return Result.failure({ code: ErrorCode.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }
}

function normalizeFirebaseVerse(firebaseVerse: FirebaseVerse, id: string): Result<Verse> {
  if (Lodash.isNil(firebaseVerse.book)) {
    return Result.failure({ code: 'verse:missing-book' })
  }
  if (Lodash.isNil(firebaseVerse.chapter)) {
    return Result.failure({ code: 'verse:missing-chapter' })
  }
  if (Lodash.isNil(firebaseVerse.start)) {
    return Result.failure({ code: 'verse:missing-start' })
  }
  if (Lodash.isNil(firebaseVerse.text)) {
    return Result.failure({ code: 'verse:missing-text' })
  }
  return Result.success({
    ...firebaseVerse,
    id,
    createdDate: firebaseVerse.createdDate.toDate(),
    completions: firebaseVerse.completions ?? 0,
    favorite: firebaseVerse.favorite ?? false,
    version: firebaseVerse.version ?? 'ESV',
  })
}
