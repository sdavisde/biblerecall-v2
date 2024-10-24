'use client'

import { Button } from '@components/ui/button'
import { Label } from '@components/ui/label'
import { Switch } from '@components/ui/switch'
import { api } from '@lib/trpc/client'
import { Result } from '@util/result'
import { Verses } from '@util/verses'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Verse } from 'service/verse/types'

type TapToReadProps = {
  verse: Verse
  direction?: Direction
}

enum Direction {
  Forward = 'Forward',
  Reverse = 'Reverse',
}

export const TapToRead = ({ verse }: TapToReadProps) => {
  const [direction, setDirection] = useState<Direction>(Direction.Forward)
  // The current part of the verse the user is viewing
  const [currIndex, setCurrIndex] = useState(direction === Direction.Forward ? 0 : verse.text.length)
  const [finished, setFinished] = useState(false)
  const shownSection =
    direction === Direction.Forward ? verse.text.substring(0, currIndex) : verse.text.substring(currIndex)
  const updateMutation = api.verse.update.useMutation()
  const router = useRouter()

  const resetCursor = () => setCurrIndex(direction === Direction.Forward ? 0 : verse.text.length - 1)
  const setCursorToEnd = () => setCurrIndex(direction === Direction.Reverse ? 0 : verse.text.length - 1)

  useEffect(() => {
    resetCursor()
    setFinished(false)
  }, [direction])

  function onTap() {
    // const activeIndex = direction === Direction.Forward ? currIndex : currIndex - 1
    const punctuationIndex = findNextPunctuation(verse.text, currIndex, direction)
    if (!punctuationIndex.hasValue) {
      setCursorToEnd()
      setFinished(true)
      return
    }

    setCurrIndex(punctuationIndex.value + 1)
  }

  async function onContinue() {
    try {
      const response = await updateMutation.mutateAsync({ ...verse, completions: verse.completions + 1 })
      if (!response.hasValue) {
        throw new Error(response.error.message)
      }
      router.push(`/home/verses/${verse.id}`)
    } catch (e) {
      toast.error(`An error occurred while updating ${Verses.stringifyReference(verse)}`)
    }
  }

  return (
    <div
      onClick={onTap}
      className='w-full flex-1 relative flex flex-col justify-between'
    >
      <div>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-muted-foreground'>Tap to reveal more of the verse</p>
          <div className='centered gap-2'>
            <Label>{direction}</Label>
            <Switch
              checked={direction === Direction.Forward}
              onClick={(e) => {
                setDirection((prev) => (prev === Direction.Forward ? Direction.Reverse : Direction.Forward))
                e.preventDefault()
              }}
            />
          </div>
        </div>
        <p>
          {direction === Direction.Forward && (
            <>
              <span>{shownSection}</span>
              <span className='text-background'>{verse.text.substring(currIndex)}</span>
            </>
          )}
          {direction === Direction.Reverse && (
            <>
              <span className='text-background'>{verse.text.substring(0, currIndex)}</span>
              <span className='text-foreground'>{shownSection}</span>
            </>
          )}
          <span className='w-full centered flex-col'>{finished && Verses.stringifyReference(verse)}</span>
        </p>
      </div>
      {finished && (
        <Button
          className='w-full'
          onClick={onContinue}
          loading={updateMutation.isPending}
        >
          Continue
        </Button>
      )}
    </div>
  )
}

const findNextPunctuation = (text: string, startIndex: number, direction: Direction): Result<number> => {
  // Define the regex pattern for valid punctuation
  const punctuationRegex = /[.,!?]/

  // Check direction and perform the search accordingly
  if (direction === Direction.Forward) {
    // Loop through the string starting from the given index
    for (let i = startIndex; i < text.length; i++) {
      if (punctuationRegex.test(text[i])) {
        return Result.success(i) // Return the index if punctuation is found
      }
    }
  } else if (direction === Direction.Reverse) {
    // Loop through the string in reverse starting from the given index
    for (let i = startIndex - 2; i >= 0; i--) {
      if (punctuationRegex.test(text[i])) {
        return Result.success(i) // Return the index if punctuation is found
      }
    }
  }

  return Result.failure({ code: 'no-punctuation-found' })
}
