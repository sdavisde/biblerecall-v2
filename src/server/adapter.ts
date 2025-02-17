import { Theme, Visibility, Font, Version, Settings } from '@configuration/settings'
import { User } from '@supabase/supabase-js'
import { Bible } from '@util/verses'
import { Tables } from 'database.types'
import { Verse } from 'src/service/verse/types'

export function to_verse(verse: Verse, userId: string): Tables<'verses'> {
  return {
    id: verse.id,
    book_id: verse.book.id,
    chapter: verse.chapter,
    start_verse: verse.start,
    end_verse: verse.end === verse.start ? null : verse.end,
    text: verse.text,
    version: verse.version,
    favorite: verse.favorite,
    completions: verse.completions,
    created_at: verse.createdDate as unknown as string,
    group_id: null,
    user_id: userId,
  }
}

export function from_verse(rawVerse: Tables<'verses'>): Verse {
  return {
    ...rawVerse,
    book: Bible.books.find((it) => it.id === rawVerse.book_id)!,
    start: rawVerse.start_verse,
    end: rawVerse.end_verse ?? rawVerse.start_verse,
    createdDate: new Date(rawVerse.created_at),
    notes: null,
  }
}

export const SETTINGS_CACHE_TAG = 'user_settings'

export function from_settings(rawSettings: Tables<'settings'>): Settings {
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

export function to_settings(settings: Settings, user: User): Omit<Tables<'settings'>, 'created_at'> {
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
