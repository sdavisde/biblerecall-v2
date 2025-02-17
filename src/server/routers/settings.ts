'use server'

import { Font, Settings, Theme, Version, Visibility } from '@configuration/settings'
import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'
import { from_settings, SETTINGS_CACHE_TAG, to_settings } from '../adapter'
import { getUser } from '..'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Settings Actions
 */

export async function getSettings(): Promise<Settings | null> {
  const supabase = await createClient()
  const settings = await supabase.from('settings').select().single()
  if (settings.error) {
    return null
  }

  return from_settings(settings.data)
}

export async function submitSettingsForm(formData: FormData) {
  const id = (formData.get('id')?.toString() as string) ?? null
  const font = (formData.get('font')?.toString() as Font) ?? null
  const theme = (formData.get('theme')?.toString() as Theme) ?? null
  const visibility = (formData.get('visibility')?.toString() as Visibility) ?? null

  if (!id) {
    return Result.failure({ code: 'id-missing' })
  }

  const settings: Settings = {
    id,
    theme,
    visibility,
    font,
    // todo: add to configuration
    defaultVersion: Version.ESV,
    verseDueDatesEnabled: false,
    verseOfTheDayEnabled: false,
  }
  const newSettings = await upsertSettings(settings)
  if (!newSettings.hasValue) {
    return Result.failure(newSettings.error)
  }

  revalidatePath('/')
}

export async function upsertSettings(settings: Settings): Promise<Result<Settings>> {
  const supabase = await createClient()
  const userResult = await getUser()
  if (!userResult.hasValue) {
    return userResult
  }
  const newSettings = await supabase.from('settings').upsert(to_settings(settings, userResult.value)).select().single()
  if (newSettings.error) {
    return Result.failure(newSettings.error)
  }

  revalidateTag(SETTINGS_CACHE_TAG)
  return Result.success(from_settings(newSettings.data))
}
