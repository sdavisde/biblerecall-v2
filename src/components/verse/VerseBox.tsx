'use client'

import { useSwipeable } from 'react-swipeable'
import { CircleArrowRight, Maximize2, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useVerses } from 'hooks/use-verses'
import { useSettings } from 'hooks/use-settings'
import { Visibility } from '@configuration/settings'
import { Verse } from 'service/verse/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Verses } from '@util/verses'
import { Lodash } from '@util/lodash'
import { VerseSelector } from './VerseSelector'
import { Button } from '@components/ui/button'
import { useState } from 'react'
import { cn } from '@components/lib/utils'
import { DeleteVerseDialog } from './DeleteVerseDialog'

type VerseBoxProps = {
  verse: Verse
}

export const VerseBox = ({ verse }: VerseBoxProps) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const handlers = useSwipeable({
    onSwipedLeft: () => setShowDeleteButton(true),
    onSwipedRight: () => setShowDeleteButton(false),
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
      <VerseSelector
        submitVerse={onUpdate}
        initialVerse={verse}
      >
        <Card
          className={cn(
            'cursor-pointer text-start w-full relative flex gap-4 duration-300 transition-all z-20 group',
            '!outline-0 !ring-0 focus:!ring-0',
            {
              '-translate-x-16': showDeleteButton,
            }
          )}
          {...handlers}
        >
          <div className='w-full h-full'>
            <CardHeader>
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
            className={cn('flex items-center h-fit gap-2', {
              'md:flex-row-reverse': settings?.visibility !== Visibility.None,
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={`/home/verses/${verse.id}`}>
              <Button
                size='icon'
                asDiv
              >
                <CircleArrowRight />
              </Button>
            </Link>

            <DeleteVerseDialog verse={verse}>
              <Button
                size='icon'
                variant='destructive'
                className='opacity-0 group-hover:opacity-100 duration-300 transition-opacity'
                asDiv
              >
                <Trash2 />
              </Button>
            </DeleteVerseDialog>
          </div>
        </Card>
      </VerseSelector>
      <DeleteVerseDialog verse={verse}>
        <Button
          variant='destructive'
          className='absolute right-[1px] top-[1px] h-[calc(100%-2px)] centered z-10 transition-all duration-300 rounded-xl'
          asDiv
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
