import { publicProcedure, router } from 'server/trpc'
import { z } from 'zod'
import { Cookies } from '@lib/providers/cookies'
import { Database } from '@lib/providers/database'
import { RequestType } from 'server/context'
import { verseSchema } from 'types/verse'

/**
 * Verses API Routes
 *
 * Each query handles input validation and error handling.
 * The implementation is abstracted away in the database and cookies modules.
 */

export const versesRouter = router({
  byId: publicProcedure.input(z.string()).query(async ({ input: verseId, ctx }) => {
    const { type, userId } = ctx

    switch (type) {
      case RequestType.Cookie:
        return await Cookies.getVerse(verseId)
      case RequestType.Database:
        return await Database.getVerse({ userId, verseId })
    }
  }),
  allByUser: publicProcedure.query(async ({ ctx }) => {
    const { type, userId } = ctx

    switch (type) {
      case RequestType.Cookie:
        return await Cookies.fetchVerses()
      case RequestType.Database:
        return await Database.getVerses({ userId })
    }
  }),
  add: publicProcedure.input(verseSchema).mutation(async ({ input: verse, ctx }) => {
    const { type, userId } = ctx

    switch (type) {
      case RequestType.Cookie:
        return await Cookies.addVerse(verse)
      case RequestType.Database:
        return await Database.addVerse({ userId, verse })
    }
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input: verseId, ctx }) => {
    const { type, userId } = ctx

    switch (type) {
      case RequestType.Cookie:
        return await Cookies.deleteVerse(verseId)
      case RequestType.Database:
        return await Database.deleteVerse({ userId, verseId })
    }
  }),
  update: publicProcedure.input(verseSchema).mutation(async ({ input: verse, ctx }) => {
    const { type, userId } = ctx

    switch (type) {
      case RequestType.Cookie:
        return await Cookies.updateVerse(verse)
      case RequestType.Database:
        return await Database.updateVerse({ userId, verse })
    }
  }),
})
