'use client'

import { useState } from 'react'
import { useVerses } from 'hooks/use-verses'
import { useSettings } from 'hooks/use-settings'
import { Visibility } from '@configuration/settings'
import { Verse } from 'service/verse/types'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Verses } from '@util/verses'
import { Lodash } from '@util/lodash'
import { VerseSelector } from './VerseSelector'

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
    <VerseSelector
      submitVerse={onUpdate}
      initialVerse={verse}
    >
      <Card className='cursor-pointer text-start'>
        <CardHeader>
          <CardTitle>{Verses.stringifyReference(verse)}</CardTitle>
        </CardHeader>
        <CardContent>
          <VerseText
            text={verse.text}
            visibility={settings?.visibility}
          />
        </CardContent>
      </Card>
    </VerseSelector>
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
