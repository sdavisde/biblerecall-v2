'use client'

import { useSwipeable } from 'react-swipeable'
import { Pencil, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useSettings } from 'src/hooks/use-settings'
import { Visibility } from '@configuration/settings'
import { Verse } from 'src/service/verse/types'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Verses } from '@util/verses'
import { Lodash } from '@util/lodash'
import { VerseSelector } from './VerseSelector'
import { Button } from '@components/ui/button'
import { useState } from 'react'
import { cn } from '@components/lib/utils'
import { DeleteVerseDialog } from './DeleteVerseDialog'
import { updateVerse } from 'src/server/routers/verse'
import { Separator } from '@components/ui/separator'

/**
 * -1 === edit
 * 0 === none
 * 1 === delete
 */
type EditingState = number
const showDelete = (editingState: EditingState) => editingState === 1
const showEdit = (editingState: EditingState) => editingState === -1

type VerseBoxProps = {
  verse: Verse
}

export const VerseBox = ({ verse }: VerseBoxProps) => {
  const [editingState, setEditingState] = useState<EditingState>(0)
  const handlers = useSwipeable({
    onSwipedLeft: () => setEditingState((prev) => Math.min(prev + 1, 1)),
    onSwipedRight: () => setEditingState((prev) => Math.max(prev - 1, -1)),
    swipeDuration: 400,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })
  const [settings] = useSettings()

  return (
    <div className='h-fit w-full relative'>
      <Card
        className={cn(
          'cursor-pointer text-start w-full relative flex gap-4 duration-300 transition-all z-20 group',
          '!outline-0 !ring-0 focus:!ring-0 !p-0',
          {
            '-translate-x-16': showDelete(editingState),
            'translate-x-16': showEdit(editingState),
          }
        )}
        {...handlers}
      >
        <Link
          href={`/x/verses/${verse.id}`}
          className='w-full p-6'
        >
          <div className='w-full h-fit'>
            <CardHeader className='!pb-0'>
              <h4 className='tracking-tight font-semibold'>{Verses.stringifyReference(verse)}</h4>
            </CardHeader>
            <CardContent>
              <VerseText
                text={verse.text}
                visibility={settings?.visibility}
              />
            </CardContent>
            {!Lodash.isEmpty(verse.notes) && (
              <>
                <Separator className='my-2 bg-muted' />
                <span className='pe-1'>Note:</span>
                <span className='text-muted-foreground text-sm'>{verse.notes}</span>
              </>
            )}
          </div>
        </Link>
        <div
          className={cn(
            'hidden md:flex items-center gap-2 p-2 rounded-lg',
            'opacity-0 group-hover:opacity-100 duration-300 transition-opacity',
            'absolute right-0 top-0'
          )}
        >
          <VerseSelector
            submitVerse={updateVerse}
            initialVerse={verse}
          >
            <Button
              size='icon'
              className='w-6 h-6 p-[2px]'
              variant='secondary'
              asDiv
            >
              <Pencil />
            </Button>
          </VerseSelector>

          <DeleteVerseDialog verse={verse}>
            <Button
              size='icon'
              variant='destructive'
              className='w-6 h-6 p-[2px]'
              asDiv
            >
              <Trash2 />
            </Button>
          </DeleteVerseDialog>
        </div>
      </Card>
      <div className='absolute inset-0 flex items-center justify-between'>
        <VerseSelector
          submitVerse={updateVerse}
          initialVerse={verse}
        >
          <Button
            variant='ghost'
            size='icon'
            className='text-accent-foreground bg-accent h-full !w-12 !rounded-xl'
            asDiv
          >
            <Pencil className='text-foreground' />
          </Button>
        </VerseSelector>
        <DeleteVerseDialog verse={verse}>
          <Button
            variant='ghost'
            size='icon'
            className='text-destructive-foreground bg-destructive h-full !w-12 !rounded-xl'
          >
            <X className='text-destructive-foreground' />
          </Button>
        </DeleteVerseDialog>
      </div>
    </div>
  )
}

export const VerseText = ({ text, visibility }: { text: string; visibility: Visibility | undefined }) => {
  if (Lodash.isNil(visibility) || visibility === 'full') {
    return text
  } else if (visibility === 'partial') {
    return text.split(' ').slice(0, 5).join(' ') + '...'
  } else {
    return ''
  }
}
