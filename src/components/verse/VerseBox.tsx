'use client'

import { useSwipeable } from 'react-swipeable'
import { CircleArrowRight, Maximize2, Pencil, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useVerses } from 'src/hooks/use-verses'
import { useSettings } from 'src/hooks/use-settings'
import { Visibility } from '@configuration/settings'
import { Verse } from 'src/service/verse/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Verses } from '@util/verses'
import { Lodash } from '@util/lodash'
import { VerseSelector } from './VerseSelector'
import { Button } from '@components/ui/button'
import { useState } from 'react'
import { cn } from '@components/lib/utils'
import { DeleteVerseDialog } from './DeleteVerseDialog'

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
  const [, dispatchVerses] = useVerses()
  const [settings] = useSettings()

  const onUpdate = async (newVerse: Verse) => {
    return await dispatchVerses(newVerse, 'update')
  }

  return (
    <div className='h-fit w-full relative'>
      <Card
        className={cn(
          'cursor-pointer text-start w-full relative flex gap-4 duration-300 transition-all z-20 group',
          '!outline-0 !ring-0 focus:!ring-0',
          {
            '-translate-x-16': showDelete(editingState),
            'translate-x-16': showEdit(editingState),
          }
        )}
        {...handlers}
      >
        <div className='w-full h-fit'>
          <CardHeader className='!pb-0'>
            <CardTitle className='flex items-center justify-between'>
              <span>{Verses.stringifyReference(verse)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VerseText
              text={verse.text}
              visibility={settings?.visibility}
            />
          </CardContent>
        </div>
        <div
          className='flex items-center h-fit gap-2 md:flex-row-reverse'
          onClick={(e) => e.stopPropagation()}
        >
          <VerseSelector
            submitVerse={onUpdate}
            initialVerse={verse}
          >
            <Button
              size='icon'
              className='aspect-square hidden md:flex opacity-0 group-hover:opacity-100 duration-300 transition-opacity'
              asDiv
            >
              <Pencil />
            </Button>
          </VerseSelector>

          <DeleteVerseDialog verse={verse}>
            <Button
              size='icon'
              variant='destructive'
              className='aspect-square hidden md:flex opacity-0 group-hover:opacity-100 duration-300 transition-opacity'
              asDiv
            >
              <Trash2 />
            </Button>
          </DeleteVerseDialog>
        </div>
      </Card>
      <VerseSelector
        submitVerse={onUpdate}
        initialVerse={verse}
      >
        <Button
          variant='secondary'
          className='absolute left-[1px] top-[1px] centered z-10 transition-all duration-300 rounded-xl md:hidden flex'
          asDiv
          style={{ height: 'calc(86% - 2px)' }}
        >
          <Pencil className='text-foreground' />
        </Button>
      </VerseSelector>
      <DeleteVerseDialog verse={verse}>
        <Button
          variant='destructive'
          className='absolute right-[1px] top-[1px] centered z-10 transition-all duration-300 rounded-xl md:hidden flex'
          asDiv
          style={{ height: 'calc(86% - 2px)' }}
        >
          <X className='text-destructive-foreground' />
        </Button>
      </DeleteVerseDialog>
    </div>
  )
}

const VerseText = ({ text, visibility }: { text: string; visibility: Visibility | undefined }) => {
  if (Lodash.isNil(visibility) || visibility === 'full') {
    return text
  } else if (visibility === 'partial') {
    return text.split(' ').slice(0, 5).join(' ') + '...'
  } else {
    return ''
  }
}
