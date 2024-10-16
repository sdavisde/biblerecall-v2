import { Result } from '@util/result'
import { Verse, VerseReference } from './types'
import { Lodash } from '@util/lodash'
import { v4 as uuidv4 } from 'uuid'

export type VerseBuilder = { [F in keyof Verse]: Verse[F] | null } & {
  favorite: boolean
  version: string
  createdDate: Date
}

export namespace VerseBuilder {
  export function init(verse: Verse | null): VerseBuilder {
    if (!Lodash.isNil(verse)) {
      return verse
    }

    return {
      id: uuidv4(),
      text: null,
      // Todo: use user preferred version here
      version: 'ESV',
      favorite: false,
      book: null,
      chapter: null,
      start: null,
      end: null,
      createdDate: new Date(),
    }
  }

  export function toVerse(builder: VerseBuilder): Result<Verse> {
    if (Lodash.isNil(builder.id)) {
      return Result.failure({ code: 'verse-builder:missing-id' })
    }
    if (Lodash.isNil(builder.text)) {
      return Result.failure({ code: 'verse-builder:missing-text' })
    }
    if (Lodash.isNil(builder.version)) {
      return Result.failure({ code: 'verse-builder:missing-version' })
    }
    if (Lodash.isNil(builder.favorite)) {
      return Result.failure({ code: 'verse-builder:missing-favorite' })
    }
    const reference = VerseBuilder.toReference(builder)
    if (!reference.hasValue) {
      return reference
    }

    return Result.success({
      id: builder.id,
      text: builder.text,
      version: builder.version,
      favorite: builder.favorite,
      createdDate: builder.createdDate,
      ...reference.value,
    })
  }

  export function toReference(builder: VerseBuilder): Result<VerseReference> {
    if (Lodash.isNil(builder.book)) {
      return Result.failure({ code: 'verse-builder:missing-book' })
    }
    if (Lodash.isNil(builder.chapter)) {
      return Result.failure({ code: 'verse-builder:missing-chapter' })
    }
    if (Lodash.isNil(builder.start)) {
      return Result.failure({ code: 'verse-builder:missing-start' })
    }

    return Result.success({
      book: builder.book,
      chapter: builder.chapter,
      start: builder.start,
      end: builder.end,
    })
  }

  export function toString(builder: VerseBuilder) {
    return `VerseBuilder[id=${builder.id},book=${builder.book?.name},chapter=${builder.chapter},start=${builder.start},end=${builder.end},text=${builder.text},favorite=${builder.favorite}]`
  }
}
