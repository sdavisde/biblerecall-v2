'use client'

import toast from 'react-hot-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer'
import { Bible, Verses } from '@util/verses'
import { Result } from '@util/result'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Book, Verse, VerseReference } from 'types/verse'
import { Lodash } from '@util/lodash'
import { api } from '@lib/trpc/client'
import LoadingDots from '@components/loading/LoadingDots'

type VerseSelectProps = PropsWithChildren<{
  submitVerse: (verse: Verse) => Promise<Result<unknown>>
}>

export const VerseSelect = ({ submitVerse, children }: VerseSelectProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<'books' | 'chapters' | 'verses'>('books')
  const [submitting, setSubmitting] = useState(false)

  const [book, setBook] = useState<Book | undefined>(undefined)
  const [chapter, setChapter] = useState<number | undefined>(undefined)
  const [verseStart, setVerseStart] = useState<number | undefined>(undefined)
  const [verseEnd, setVerseEnd] = useState<number | undefined>(undefined)
  const reference = useMemo<Partial<VerseReference>>(
    () => ({ book, chapter, start: verseStart, end: verseEnd ?? verseStart }),
    [book, chapter, verseStart, verseEnd]
  )
  const referenceIsComplete = useMemo(
    () => Verses.parseReference(Verses.stringifyPartialReference(reference)).hasValue,
    [reference]
  )
  const { chapters, isLoading: chaptersLoading } = useChapters(book)
  const { verses, isLoading: versesLoading } = useVerses(book, chapter)

  const resetState = () => {
    setBook(undefined)
    setChapter(undefined)
    setVerseStart(undefined)
    setVerseEnd(undefined)
  }

  const onSave = async () => {
    setSubmitting(true)

    try {
      if (!referenceIsComplete) {
        throw Error('Verse is malformed')
      }
      const verse = Verses.createVerse(reference as VerseReference)
      if (!verse.hasValue) {
        throw Error(verse.error.message)
      }
      const result = await submitVerse(verse.value)
      if (!result.hasValue) {
        throw Error(result.error.message)
      }
      resetState()
      setDrawerIsOpen(false)
    } catch (e) {
      console.error(e)
      toast.error('Verse could not be saved. Please reload the page and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Drawer
      open={drawerIsOpen}
      onOpenChange={setDrawerIsOpen}
    >
      <DrawerTrigger className='w-full'>{children}</DrawerTrigger>
      <DrawerContent className='h-[90dvh] p-4'>
        <DrawerClose className='absolute top-4 left-4'>Close</DrawerClose>
        <DrawerHeader>
          <DrawerTitle>New Verse</DrawerTitle>
          <DrawerDescription>{Verses.stringifyPartialReference(reference)}</DrawerDescription>
        </DrawerHeader>
        <Accordion
          type='single'
          collapsible
          value={activeAccordion}
        >
          <AccordionItem value='books'>
            <AccordionTrigger onClick={() => setActiveAccordion('books')}>Book</AccordionTrigger>
            <AccordionContent className='max-h-52'>
              {Bible.books.map((book) => (
                <Button
                  key={book.id}
                  onClick={() => {
                    setBook(book)
                    setActiveAccordion('chapters')
                  }}
                  variant='outline'
                >
                  {book.name}
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='chapters'
            disabled={Lodash.isNil(book)}
          >
            <AccordionTrigger onClick={() => setActiveAccordion('chapters')}>Chapter</AccordionTrigger>
            <AccordionContent>
              {chaptersLoading ? (
                <LoadingDots />
              ) : (
                chapters.map((chapter) => (
                  <Button
                    key={chapter}
                    variant='outline'
                    onClick={() => {
                      setChapter(chapter)
                      setActiveAccordion('verses')
                    }}
                  >
                    {chapter}
                  </Button>
                ))
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='verses'
            disabled={Lodash.isNil(chapter)}
          >
            <AccordionTrigger onClick={() => setActiveAccordion('verses')}>Verse(s)</AccordionTrigger>
            <AccordionContent>
              {versesLoading ? (
                <LoadingDots />
              ) : (
                Lodash.times(verses, (index) => (
                  <Button
                    key={index}
                    variant='outline'
                    onClick={() => setVerseStart(index)}
                  >
                    {index}
                  </Button>
                ))
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button
          onClick={onSave}
          loading={submitting}
          disabled={!referenceIsComplete}
        >
          Save Verse
        </Button>
      </DrawerContent>
    </Drawer>
  )
}

const useChapters = (book: Book | undefined): { chapters: Array<number>; isLoading: boolean } => {
  const { data, isLoading } = api.bible.getSkeleton.useQuery()

  if (Lodash.isNil(book) || Lodash.isNil(data)) {
    return { chapters: [], isLoading }
  }
  const chaptersRecord = data[book.name].chapters
  return { chapters: Object.keys(chaptersRecord).map((id) => parseInt(id)), isLoading }
}

const useVerses = (book: Book | undefined, chapter: number | undefined): { verses: number; isLoading: boolean } => {
  const { data, isLoading } = api.bible.getSkeleton.useQuery()

  if (Lodash.isNil(book) || Lodash.isNil(chapter) || Lodash.isNil(data)) {
    return { verses: 0, isLoading }
  }
  const chaptersRecord = data[book.name].chapters
  const numVerses = chaptersRecord[chapter]
  if (!numVerses) {
    return { verses: 0, isLoading: true }
  }
  return { verses: numVerses, isLoading }
}
