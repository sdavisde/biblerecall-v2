import { Testament, Verse } from 'types/verse'

export namespace Verses {
  export function isValidVerse(verse: Verse): boolean {
    // verse must have a book and chapter
    if (!verse || !verse.book?.name || !verse.chapter) {
      return false
    }

    // start must exist and be valid
    if (!verse.start || verse.start <= 0) {
      return false
    }

    // verse end should either not exist or be >= start
    if (verse.end && verse.end < verse.start) {
      return false
    }

    return true
  }

  export function isValidReference(reference: string): boolean {
    if (!reference || !reference.includes(':')) {
      return false
    }

    const [book, chapter, start, end] = parseReference(reference)

    if (!start) {
      return false
    }

    if (reference.includes('-')) {
      if (!end || start > end) {
        return false
      }
    }

    if (!book || !chapter || !start) {
      return false
    }

    return true
  }

  export function makeReference(verse: Verse): string | null {
    if (!isValidVerse) {
      return null
    }

    return `${verse.book.name} ${verse.chapter}:${verse.start}${verse.end ? '-' + verse.end : ''}`
  }

  export function parseReference(reference: string) {
    const [first, last] = reference.split(':')
    const chapterIndex = first.lastIndexOf(' ')
    const book = first.slice(0, chapterIndex)
    const chapter = first.slice(chapterIndex)
    const [startString, endString] = last.split('-')

    const start = startString ? parseInt(startString) : undefined
    const end = endString ? parseInt(endString) : undefined

    return [book, chapter, start, end] as const
  }

  /**
   * Parses a verse reference into its different attributes
   * @param verseReference verse in the format: Book C:V or 1 Book C:V-V2
   */
  export function createVerse(
    verseReference: string,
    overrides?: { id?: string; text?: string; version?: string }
  ): Verse | null {
    if (!verseReference.includes(' ') || !verseReference.includes(':')) {
      return null
    }

    const [book, chapter, start, end] = parseReference(verseReference)

    if (!start) {
      return null
    }

    if (verseReference.includes('-')) {
      if (!end || start > end) {
        return null
      }
    }

    return {
      id: overrides?.id ?? '',
      book: Bible.books.find((b) => b.name.toLowerCase() === book.toLowerCase()) ?? Bible.books[0],
      chapter: parseInt(chapter),
      start,
      end: end ?? null,
      text: overrides?.text ?? '',
      version: overrides?.version ?? '',
      favorite: false,
    }
  }
}

export namespace Bible {
  export const books = [
    { id: 1, name: 'Genesis', testament: Testament.OLD },
    { id: 2, name: 'Exodus', testament: Testament.OLD },
    { id: 3, name: 'Leviticus', testament: Testament.OLD },
    { id: 4, name: 'Numbers', testament: Testament.OLD },
    { id: 5, name: 'Deuteronomy', testament: Testament.OLD },
    { id: 6, name: 'Joshua', testament: Testament.OLD },
    { id: 7, name: 'Judges', testament: Testament.OLD },
    { id: 8, name: 'Ruth', testament: Testament.OLD },
    { id: 9, name: '1 Samuel', testament: Testament.OLD },
    { id: 10, name: '2 Samuel', testament: Testament.OLD },
    { id: 11, name: '1 Kings', testament: Testament.OLD },
    { id: 12, name: '2 Kings', testament: Testament.OLD },
    { id: 13, name: '1 Chronicles', testament: Testament.OLD },
    { id: 14, name: '2 Chronicles', testament: Testament.OLD },
    { id: 15, name: 'Ezra', testament: Testament.OLD },
    { id: 16, name: 'Nehemiah', testament: Testament.OLD },
    { id: 17, name: 'Esther', testament: Testament.OLD },
    { id: 18, name: 'Job', testament: Testament.OLD },
    { id: 19, name: 'Psalms', testament: Testament.OLD },
    { id: 20, name: 'Proverbs', testament: Testament.OLD },
    { id: 21, name: 'Ecclesiastes', testament: Testament.OLD },
    { id: 22, name: 'Song of Solomon', testament: Testament.OLD },
    { id: 23, name: 'Isaiah', testament: Testament.OLD },
    { id: 24, name: 'Jeremiah', testament: Testament.OLD },
    { id: 25, name: 'Lamentations', testament: Testament.OLD },
    { id: 26, name: 'Ezekiel', testament: Testament.OLD },
    { id: 27, name: 'Daniel', testament: Testament.OLD },
    { id: 28, name: 'Hosea', testament: Testament.OLD },
    { id: 29, name: 'Joel', testament: Testament.OLD },
    { id: 30, name: 'Amos', testament: Testament.OLD },
    { id: 31, name: 'Obadiah', testament: Testament.OLD },
    { id: 32, name: 'Jonah', testament: Testament.OLD },
    { id: 33, name: 'Micah', testament: Testament.OLD },
    { id: 34, name: 'Nahum', testament: Testament.OLD },
    { id: 35, name: 'Habakkuk', testament: Testament.OLD },
    { id: 36, name: 'Zephaniah', testament: Testament.OLD },
    { id: 37, name: 'Haggai', testament: Testament.OLD },
    { id: 38, name: 'Zechariah', testament: Testament.OLD },
    { id: 39, name: 'Malachi', testament: Testament.OLD },
    { id: 40, name: 'Matthew', testament: Testament.NEW },
    { id: 41, name: 'Mark', testament: Testament.NEW },
    { id: 42, name: 'Luke', testament: Testament.NEW },
    { id: 43, name: 'John', testament: Testament.NEW },
    { id: 44, name: 'Acts', testament: Testament.NEW },
    { id: 45, name: 'Romans', testament: Testament.NEW },
    { id: 46, name: '1 Corinthians', testament: Testament.NEW },
    { id: 47, name: '2 Corinthians', testament: Testament.NEW },
    { id: 48, name: 'Galatians', testament: Testament.NEW },
    { id: 49, name: 'Ephesians', testament: Testament.NEW },
    { id: 50, name: 'Philippians', testament: Testament.NEW },
    { id: 51, name: 'Colossians', testament: Testament.NEW },
    { id: 52, name: '1 Thessalonians', testament: Testament.NEW },
    { id: 53, name: '2 Thessalonians', testament: Testament.NEW },
    { id: 54, name: '1 Timothy', testament: Testament.NEW },
    { id: 55, name: '2 Timothy', testament: Testament.NEW },
    { id: 56, name: 'Titus', testament: Testament.NEW },
    { id: 57, name: 'Philemon', testament: Testament.NEW },
    { id: 58, name: 'Hebrews', testament: Testament.NEW },
    { id: 59, name: 'James', testament: Testament.NEW },
    { id: 60, name: '1 Peter', testament: Testament.NEW },
    { id: 61, name: '2 Peter', testament: Testament.NEW },
    { id: 62, name: '1 John', testament: Testament.NEW },
    { id: 63, name: '2 John', testament: Testament.NEW },
    { id: 64, name: '3 John', testament: Testament.NEW },
    { id: 65, name: 'Jude', testament: Testament.NEW },
    { id: 66, name: 'Revelation', testament: Testament.NEW },
  ]
}
