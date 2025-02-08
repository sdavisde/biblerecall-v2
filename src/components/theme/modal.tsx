import { ThemeToggle } from './toggle'
import { createClient } from '@lib/supabase/server'
import { ColorGrid } from './color-grid'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { PropsWithChildren } from 'react'

export default async function ThemeModal({ children }: PropsWithChildren<{}>) {
  const supabase = await createClient()
  const colorsResult = await supabase.from('colors').select()

  if (colorsResult.error) {
    throw colorsResult.error
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        id='colorSettings'
        className='w-[80vw] !max-w-none'
      >
        <DialogHeader className='flex flex-row items-center gap-8'>
          <DialogTitle>Theme settings</DialogTitle>
          <ThemeToggle />
        </DialogHeader>
        <ColorGrid colors={colorsResult.data} />
      </DialogContent>
    </Dialog>
  )
}
