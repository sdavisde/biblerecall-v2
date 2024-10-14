import { Result } from '@util/result'
import { Book, Verse, VerseReference } from './types'
import { Lodash } from '@util/lodash'

export class VerseBuilder {
  id: string | null
  text: string | null
  version: string
  favorite: boolean
  book: Book | null
  chapter: number | null
  start: number | null
  end: number | null

  constructor() {
    this.id = null
    this.text = null
    this.version = 'ESV'
    // Todo: use user preferred version here
    this.favorite = false
    this.book = null
    this.chapter = null
    this.start = null
    this.end = null
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withText(text: string) {
    this.text = text
    return this
  }

  withVersion(version: string) {
    this.version = version
    return this
  }

  withFavorite(favorite: boolean) {
    this.favorite = favorite
    return this
  }

  withBook(book: Book) {
    this.book = book
    return this
  }

  withChapter(chapter: number) {
    this.chapter = chapter
    return this
  }

  withStart(start: number) {
    this.start = start
    return this
  }

  withEnd(end: number) {
    this.end = end
    return this
  }

  toVerse(): Result<Verse> {
    if (Lodash.isNil(this.id)) {
      return Result.failure({ code: 'verse-builder:missing-id' })
    }
    if (Lodash.isNil(this.text)) {
      return Result.failure({ code: 'verse-builder:missing-text' })
    }
    if (Lodash.isNil(this.version)) {
      return Result.failure({ code: 'verse-builder:missing-version' })
    }
    if (Lodash.isNil(this.favorite)) {
      return Result.failure({ code: 'verse-builder:missing-favorite' })
    }
    const reference = this.toReference()
    if (!reference.hasValue) {
      return reference
    }

    return Result.success({
      id: this.id,
      text: this.text,
      version: this.version,
      favorite: this.favorite,
      ...reference.value,
    })
  }

  toReference(): Result<VerseReference> {
    if (Lodash.isNil(this.book)) {
      return Result.failure({ code: 'verse-builder:missing-book' })
    }
    if (Lodash.isNil(this.chapter)) {
      return Result.failure({ code: 'verse-builder:missing-chapter' })
    }
    if (Lodash.isNil(this.start)) {
      return Result.failure({ code: 'verse-builder:missing-start' })
    }

    return Result.success({
      book: this.book,
      chapter: this.chapter,
      start: this.start,
      end: this.end,
    })
  }

  toString() {
    return `VerseBuilder[id=${this.id},book=${this.book?.name},chapter=${this.chapter},start=${this.start},end=${this.end},text=${this.text},favorite=${this.favorite}]`
  }
}
