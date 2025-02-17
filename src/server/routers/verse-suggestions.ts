import { publicProcedure, router } from 'src/server/trpc'
import { Verse } from 'src/service/verse/types'
import { Result } from '@util/result'
import { verseSuggestionSchema } from '@components/discover/actions'
import { VerseBuilder } from 'src/service/verse'
import { Verses } from '@util/verses'
import { revalidatePath } from 'next/cache'
import { addVerse } from './verse'

/**
 * Verse Suggestions API Routes
 */
export const verseSuggestionsRouter = router({
  add: publicProcedure
    .input(verseSuggestionSchema)
    .mutation(async ({ input: verseSuggestion, ctx }): Promise<Result<Verse>> => {
      const verseReferenceResult = Verses.parseReference(verseSuggestion.reference)
      if (!verseReferenceResult.hasValue) {
        return Result.failure({ code: 'verse-suggestion:invalid-reference', message: 'Something went wrong' })
      }

      const builder = VerseBuilder.init(null)
      builder.book = verseReferenceResult.value.book
      builder.chapter = verseReferenceResult.value.chapter
      builder.start = verseReferenceResult.value.start
      builder.end = verseReferenceResult.value.end
      builder.text = verseSuggestion.text
      const newVerse = VerseBuilder.toVerse(builder)

      if (!newVerse.hasValue) {
        return newVerse
      }

      const addedVerse = await addVerse(newVerse.value)

      if (addedVerse.hasValue) {
        revalidatePath('/home/verses')
      }

      return addedVerse
    }),
})
