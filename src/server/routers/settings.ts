import { Font, Settings, settingsSchema, Theme, Version, Visibility } from '@configuration/settings'
import { createClient } from '@lib/supabase/server'
import { User } from '@supabase/supabase-js'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { Tables } from 'database.types'
import { publicProcedure, router } from 'src/server/trpc'

/**
 * Settings API Routes
 *
 * Each query handles input validation and error handling.
 */

export const settingsRouter = router({
  get: publicProcedure.query(async ({ ctx }): Promise<Result<Settings>> => {
    const { user } = ctx

    if (Lodash.isNil(user)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }

    const supabase = await createClient()
    const settings = await supabase.from('settings').select().eq('user_id', user.id).single()
    if (settings.error) {
      return Result.failure(settings.error)
    }
    return Result.success(fromMe(settings.data))
  }),
  set: publicProcedure.input(settingsSchema).mutation(async ({ input: settings, ctx }) => {
    const { user } = ctx

    if (Lodash.isNil(user)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }

    const supabase = await createClient()
    const newSettings = await supabase.from('settings').upsert(toMe(settings, user)).select().single()
    if (newSettings.error) {
      return Result.failure(newSettings.error)
    }
    return Result.success(fromMe(newSettings.data))
  }),
})

function fromMe(rawSettings: Tables<'settings'>): Settings {
  return {
    id: rawSettings.id,
    theme: (rawSettings.theme as Theme) ?? Theme.System,
    visibility: (rawSettings.visibility as Visibility) ?? Visibility.Full,
    font: (rawSettings.font as Font) ?? Font.Urbanist,
    defaultVersion: (rawSettings.version as Version) ?? Version.ESV,
    verseOfTheDayEnabled: rawSettings.votd_enabled ?? true,
    verseDueDatesEnabled: rawSettings.vdd_enabled ?? true,
  }
}

function toMe(settings: Settings, user: User): Omit<Tables<'settings'>, 'created_at'> {
  return {
    id: settings.id,
    user_id: user.id,
    theme: settings.theme,
    visibility: settings.visibility,
    font: settings.font,
    version: settings.defaultVersion,
    votd_enabled: settings.verseOfTheDayEnabled,
    vdd_enabled: settings.verseDueDatesEnabled,
  }
}
