'use client'

import cn from 'clsx'
import { Theme } from '@configuration/settings'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { useFormContext } from 'react-hook-form'
import { Skeleton } from '@components/ui/skeleton'

export function ThemeSelect() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='theme'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Theme</FormLabel>
          <FormControl>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {Object.entries(Theme).map(([name, value]) => (
                <div
                  key={name}
                  onClick={() => field.onChange(value)}
                  className='flex-col centered group'
                >
                  <button
                    className={cn(
                      'w-full centered flex-col items-start gap-2 border-2 group-hover:border-muted rounded p-2',
                      {
                        'border-primary': value === field.value,
                        'bg-[hsl(215_18%_95%)]': value === Theme.Light,
                      }
                    )}
                    style={{
                      background:
                        value === Theme.System
                          ? 'linear-gradient(135deg, hsl(215,18%,95%) 50%, hsl(220,18%,10%) 50%)'
                          : undefined,
                    }}
                  >
                    <Skeleton className='w-8 h-8 rounded-full self-start' />
                    <Skeleton className='h-6 w-full' />
                    <Skeleton className='h-6 w-full' />
                  </button>
                  <p className='capitalize'>{value}</p>
                </div>
              ))}
            </div>
          </FormControl>
          <FormDescription>Choose light vs dark mode, or use your system preference.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
