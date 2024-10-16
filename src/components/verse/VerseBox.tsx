'use client'

import { useVerses } from 'hooks/use-verses'
import { useSettings } from 'hooks/use-settings'
import { Visibility } from '@configuration/settings'
import { Verse } from 'service/verse/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Verses } from '@util/verses'
import { Lodash } from '@util/lodash'
import { VerseSelector } from './VerseSelector'
import { Button } from '@components/ui/button'
import { CircleArrowRight, Maximize2 } from 'lucide-react'
import Link from 'next/link'

type VerseBoxProps = {
  verse: Verse
}

export const VerseBox = ({ verse }: VerseBoxProps) => {
  const [, dispatchVerses] = useVerses()
  const [settings] = useSettings()

  const onUpdate = async (newVerse: Verse) => {
    return await dispatchVerses(newVerse, 'update')
  }

  return (
    <Card className='cursor-pointer text-start w-full'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{Verses.stringifyReference(verse)}</span>
          <div className='flex items-center gap-2'>
            <VerseSelector
              submitVerse={onUpdate}
              initialVerse={verse}
            >
              <Button
                variant='outline'
                size='icon'
                asDiv
              >
                <Maximize2 />
              </Button>
            </VerseSelector>
            <Link href={`/home/verses/${verse.id}`}>
              <Button size='icon'>
                <CircleArrowRight />
              </Button>
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <VerseText
          text={verse.text}
          visibility={settings?.visibility}
        />
      </CardContent>
    </Card>
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
