'use client'

import cn from 'clsx'
import { Visibility } from '@configuration/settings'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { useFormContext } from 'react-hook-form'
import { Skeleton } from '@components/ui/skeleton'
import { VerseText } from '@components/verse/VerseBox'
import { CardTitle } from '@components/ui/card'

export function VisibilitySelect() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='visibility'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Visibility</FormLabel>
          <FormDescription>
            Visibility impacts how much verse text preview you will see on the verse page.
          </FormDescription>
          <FormControl>
            <div className='grid grid-cols-1 md:grid-cols-3 auto-rows-[1fr] gap-4'>
              <input
                name={field.name}
                value={field.value}
                readOnly
                hidden
              />
              {Object.entries(Visibility).map(([name, value]) => (
                <div
                  key={name}
                  onClick={() => field.onChange(value)}
                  className='flex-col centered justify-start group'
                >
                  <button className='w-full centered flex-col items-start justify-start gap-2 border-2 group-hover:border-muted rounded p-2'>
                    <CardTitle className='flex items-center justify-between'>
                      <span>John 3:16</span>
                    </CardTitle>
                    <VerseText
                      text='For God so loved the world that He gave his only son'
                      visibility={value}
                    />
                  </button>
                  <p className='capitalize'>{value}</p>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
