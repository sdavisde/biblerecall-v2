'use server'

import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'
import { Tables } from 'database.types'
import { revalidatePath } from 'next/cache'

type Color = Tables<'colors'>

/**
 * Color actions
 */

export async function updateColor(color: Color): Promise<Result<Color>> {
  const supabase = await createClient()
  const newColor = await supabase.from('colors').update({ hsl: color.hsl }).eq('id', color.id)
  if (newColor.error) {
    return Result.failure(newColor.error)
  }

  revalidatePath('/')
  return Result.success(color)
}
