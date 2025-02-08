'use client'

import LoadingDots from '@components/loading/LoadingDots'
import { api } from '@lib/trpc/client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { VerseBuilder } from 'src/service/verse'
import { VerseReference } from 'src/service/verse/types'

type DynamicVerseTextProps = {
  reference: VerseReference
  builder: VerseBuilder
  updateBuilder: Dispatch<SetStateAction<VerseBuilder>>
}
export const DynamicVerseText = ({ reference, builder, updateBuilder }: DynamicVerseTextProps) => {
  const text = api.bible.getVerse.useQuery({ reference, version: builder.version })

  useEffect(() => {
    if (text.data && text.data.hasValue) {
      const verseText = text.data.value.verseText
      updateBuilder((prev) => ({ ...prev, text: verseText }))
    }
  }, [text.data])

  if (text.isLoading || !text.data) {
    return (
      <div className='w-full flex justify-start p-4'>
        <LoadingDots />
      </div>
    )
  }

  if (!text.data.hasValue) {
    return <p className='text-destructive'>Something went wrong fetching verse text.</p>
  }

  return <p>&quot;{text.data.value.verseText}&quot;</p>
}
