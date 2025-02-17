'use client'

import { Font } from '@configuration/settings'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'

export function FontSelect() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='font'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Font</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              {...field}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Font' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fonts</SelectLabel>
                  {Object.entries(Font).map(([key, value]) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>Choose the font that makes it easiest for you to read the word.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
