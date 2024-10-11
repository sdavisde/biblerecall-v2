import { Settings, settingsSchema } from '@configuration/settings'
import { database } from '@lib/firebase'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { RequestType } from 'server/context'
import { publicProcedure, router } from 'server/trpc'

/**
 * Settings API Routes
 *
 * Each query handles input validation and error handling.
 */

export const settingsRouter = router({
  get: publicProcedure.query(async ({ ctx }): Promise<Result<Settings>> => {
    const { type, user } = ctx

    switch (type) {
      case RequestType.Cookie:
        return Result.failure({ code: ErrorCode.NOT_LOGGED_IN, message: 'Not logged in' })
      case RequestType.Database:
        if (Lodash.isNil(user)) {
          return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
        }

        const userDocRef = doc(database, 'Users', user.uid)
        const snapshot = await getDoc(userDocRef)
        const settings = snapshot.data() as Settings

        if (
          settings.theme === undefined ||
          settings.visibility === undefined ||
          settings.defaultVersion === undefined ||
          settings.font === undefined ||
          settings.verseDueDatesEnabled === undefined ||
          settings.verseOfTheDayEnabled === undefined
        ) {
          return Result.failure({ code: ErrorCode.MALFORMED_SETTINGS, message: 'Malformed settings, returning null' })
        }

        return Result.success(settings)
    }
  }),
  set: publicProcedure.input(settingsSchema).mutation(async ({ input: settings, ctx }) => {
    const { type, user } = ctx

    switch (type) {
      case RequestType.Cookie:
        return Result.failure({ code: ErrorCode.NOT_LOGGED_IN, message: 'Not logged in' })
      case RequestType.Database:
        if (Lodash.isNil(user)) {
          return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
        }

        try {
          const userDocRef = doc(database, `Users/${user.uid}`)
          await setDoc(userDocRef, settings)
          return Result.success(settings)
        } catch (e) {
          return Result.failure({
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while setting user settings',
          })
        }
    }
  }),
})
