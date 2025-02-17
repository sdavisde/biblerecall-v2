'use server'

import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'
import { Tables } from 'database.types'

type Color = Tables<'colors'>

/**
 * Color actions
 */

export async function updateColor(color: Color): Promise<Result<Color>> {
  const supabase = await createClient()
  const newColor = await supabase.from('colors').update(color).eq('id', color.id)
  if (newColor.error) {
    return Result.failure(newColor.error)
  }
  return Result.success(color)
}
