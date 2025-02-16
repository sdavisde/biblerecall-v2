import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@components/ui/credenza'
import { createClient } from '@lib/supabase/server'
import { cache } from 'react'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { addMeditation } from './actions'

const getMostRecentMeditation = cache(async () => {
  const supabase = await createClient()
  const migration = await supabase
    .from('user_meditations')
    .select()
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return migration.data
})

export async function GlobalBanner() {
  const migration = await getMostRecentMeditation()

  return (
    <Credenza>
      <CredenzaTrigger className='w-full h-10 bg-accent text-accent-foreground'>
        {migration?.text ?? 'Click here to add a meditation'}
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaClose>Close</CredenzaClose>
        <CredenzaHeader>
          <CredenzaTitle>Add Meditation</CredenzaTitle>
          <CredenzaDescription>
            God speaks to us every day. Adding it here could help to remember what He says and put it into practice.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form
            action={addMeditation}
            className='flex flex-col gap-4 justify-end'
          >
            <Input name='meditation' />
            <Button type='submit'>Submit</Button>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
