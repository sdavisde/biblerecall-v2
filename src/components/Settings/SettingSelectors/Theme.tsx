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
          <FormDescription>Choose light vs dark mode, or use your system preference.</FormDescription>
          <FormControl>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <input
                name={field.name}
                value={field.value}
                readOnly
                hidden
              />
              {Object.entries(Theme).map(([name, value]) => (
                <div
                  key={name}
                  onClick={() => field.onChange(value)}
                  className={cn(
                    'cursor-pointer flex-col centered group relative border-2 group-hover:border-muted rounded p-2',
                    {
                      'border-primary bg-primary': value === field.value,
                    }
                  )}
                >
                  <button
                    className={cn('w-full centered flex-col items-start gap-2 rounded p-2', {
                      'bg-[hsl(215_18%_95%)]': value === Theme.Light,
                      'bg-[hsl(215_18%_10%)] border': value === Theme.Dark,
                    })}
                    style={{
                      background:
                        value === Theme.System
                          ? 'linear-gradient(135deg, hsl(215,18%,95%) 50%, hsl(220,18%,10%) 50%)'
                          : undefined,
                    }}
                  >
                    <Skeleton className='w-8 h-8 rounded-full self-start' />
                    <Skeleton className='h-6 w-full' />
                  </button>
                  <p
                    className={cn(
                      'capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded',
                      {
                        'bg-background/50 text-foreground': value !== field.value,
                        'bg-primary/50 text-foreground': value === field.value,
                      }
                    )}
                  >
                    {value}
                  </p>
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
