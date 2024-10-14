'use client'

import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
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
import { PropsWithChildren, useMemo, useState } from 'react'
import { Lodash } from '@util/lodash'
import { api } from '@lib/trpc/client'
import LoadingDots from '@components/loading/LoadingDots'
import { VerseBuilder } from 'service/verse'
import { Book, Verse } from 'service/verse/types'

type VerseSelectProps = PropsWithChildren<{
  submitVerse: (verse: Verse) => Promise<Result<unknown>>
}>

type VerseSelectorAccordions = 'books' | 'chapters' | 'verses' | 'review'

export const VerseSelect = ({ submitVerse, children }: VerseSelectProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<VerseSelectorAccordions>('books')
  const [submitting, setSubmitting] = useState(false)

  const [verseBuilder, setVerseBuilder] = useState<VerseBuilder>(new VerseBuilder())
  const reference = useMemo(() => {
    const newReference = verseBuilder.toReference()
    return newReference.hasValue ? newReference.value : null
  }, [verseBuilder.toString()])
  const referenceString = useMemo(() => Verses.stringifyPartialReference(reference ?? {}), [reference])
  const { chapters, isLoading: chaptersLoading } = useChapters(verseBuilder.book)
  const { verses, isLoading: versesLoading } = useVerses(verseBuilder.book, verseBuilder.chapter)
  const text = api.bible.getVerse.useQuery({ reference, version: verseBuilder.version })

  const resetState = () => setVerseBuilder(new VerseBuilder())

  const onSave = async () => {
    setSubmitting(true)

    try {
      if (!text.data?.hasValue) {
        throw Error(text.data?.error.message ?? 'verse text not found')
      }

      const randomId = uuidv4()
      verseBuilder.withText(text.data.value.verseText).withId(uuidv4())
      const verse = verseBuilder.toVerse()
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
          <DrawerDescription>{referenceString}</DrawerDescription>
        </DrawerHeader>
        <Accordion
          type='single'
          collapsible
          value={activeAccordion}
        >
          <AccordionItem value='books'>
            <AccordionTrigger onClick={() => setActiveAccordion('books')}>Book</AccordionTrigger>
            <AccordionContent className='max-h-52 overflow-y-auto bg-gray-50'>
              {Bible.books.map((book) => (
                <Button
                  key={book.id}
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => {
                    setVerseBuilder((prev) => prev.withBook(book))
                    setActiveAccordion('chapters')
                  }}
                >
                  {book.name}
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='chapters'
            disabled={Lodash.isNil(verseBuilder.book)}
          >
            <AccordionTrigger onClick={() => setActiveAccordion('chapters')}>Chapter</AccordionTrigger>
            <AccordionContent className='max-h-52 overflow-y-auto grid grid-cols-6 gap-2'>
              {chaptersLoading ? (
                <LoadingDots />
              ) : (
                chapters.map((chapter) => (
                  <Button
                    key={chapter}
                    variant='outline'
                    onClick={() => {
                      setVerseBuilder((prev) => prev.withChapter(chapter))
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
            disabled={Lodash.isNil(verseBuilder.chapter)}
          >
            <AccordionTrigger onClick={() => setActiveAccordion('verses')}>Verse(s)</AccordionTrigger>
            <AccordionContent className='max-h-52 overflow-y-auto grid grid-cols-6 gap-2'>
              {versesLoading ? (
                <LoadingDots />
              ) : (
                Lodash.times(verses, (index) => (
                  <Button
                    key={index}
                    variant='outline'
                    onClick={() => {
                      setVerseBuilder((prev) => prev.withStart(index + 1))
                      setActiveAccordion('review')
                    }}
                  >
                    {index + 1}
                  </Button>
                ))
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='review'>
            <AccordionTrigger>Review</AccordionTrigger>
            <AccordionContent>
              <h4>{referenceString}</h4>
              <p>{text.data?.hasValue ? text.data.value.verseText : ''}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='flex-1 flex justify-center items-end'>
          <Button
            onClick={onSave}
            loading={submitting}
            disabled={Lodash.isNil(reference)}
            className='w-full'
          >
            Save Verse
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const useChapters = (book: Book | null): { chapters: Array<number>; isLoading: boolean } => {
  const { data, isLoading } = api.bible.getSkeleton.useQuery()

  if (Lodash.isNil(book) || Lodash.isNil(data)) {
    return { chapters: [], isLoading }
  }
  const chaptersRecord = data[book.name].chapters
  return { chapters: Object.keys(chaptersRecord).map((id) => parseInt(id)), isLoading }
}

const useVerses = (book: Book | null, chapter: number | null): { verses: number; isLoading: boolean } => {
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
