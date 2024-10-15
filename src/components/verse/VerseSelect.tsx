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
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { Lodash } from '@util/lodash'
import { api } from '@lib/trpc/client'
import LoadingDots from '@components/loading/LoadingDots'
import { VerseBuilder } from 'service/verse'
import { Book, Verse, VerseReference } from 'service/verse/types'
import { cn } from '@components/lib/utils'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@components/ui/command'

type VerseSelectProps = PropsWithChildren<{
  submitVerse: (verse: Verse) => Promise<Result<unknown>>
}>

type VerseSelectorAccordions = 'none' | 'books' | 'chapters' | 'verses' | 'review'

export const VerseSelect = ({ submitVerse, children }: VerseSelectProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<VerseSelectorAccordions>('books')
  const [submitting, setSubmitting] = useState(false)
  const bookSearchRef = useRef<HTMLInputElement>(null)

  const [builder, setBuilder] = useState<VerseBuilder>(VerseBuilder.init())
  const reference = useMemo(() => {
    const newReference = VerseBuilder.toReference(builder)
    return newReference.hasValue ? newReference.value : null
  }, [builder])
  const referenceString = useMemo(() => Verses.stringifyPartialReference(builder as Partial<VerseReference>), [builder])
  const { chapters, isLoading: chaptersLoading } = useChapters(builder.book)
  const { verses, isLoading: versesLoading } = useVerses(builder.book, builder.chapter)
  const text = api.bible.getVerse.useQuery({ reference, version: builder.version })

  const resetState = () => setBuilder(VerseBuilder.init())
  const toggleAccordion = (accordion: VerseSelectorAccordions) => {
    if (activeAccordion === accordion) {
      setActiveAccordion('none')
    } else {
      setActiveAccordion(accordion)
    }
  }

  useEffect(() => {
    if (text.data && text.data.hasValue) {
      const verseText = text.data.value.verseText
      setBuilder((prev) => ({ ...prev, text: verseText }))
    }
  }, [text.data])

  useEffect(() => {
    if (activeAccordion === 'books') {
      bookSearchRef.current?.focus()
    }
  }, [activeAccordion])
  useEffect(() => {
    console.log('log focus', bookSearchRef)
    setTimeout(() => bookSearchRef.current?.focus(), 400)
  }, [drawerIsOpen])

  const onSave = async () => {
    setSubmitting(true)

    try {
      if (!text.data?.hasValue) {
        throw Error(text.data?.error.message ?? 'verse text not found')
      }

      const verse = VerseBuilder.toVerse(builder)
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
          value={activeAccordion}
          collapsible
        >
          <AccordionItem value='books'>
            <AccordionTrigger onClick={() => toggleAccordion('books')}>Book</AccordionTrigger>
            <AccordionContent className='flex-1'>
              <Command className='rounded-lg border shadow-md md:min-w-[450px]'>
                <CommandInput
                  placeholder='Type a book name to search...'
                  ref={bookSearchRef}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading='Books'>
                    {Bible.books.map((book) => (
                      <CommandItem
                        key={book.id}
                        onSelect={() => {
                          setBuilder((prev) => ({ ...prev, book }))
                          toggleAccordion('chapters')
                        }}
                      >
                        <span> {book.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value='chapters'
            disabled={Lodash.isNil(builder.book)}
          >
            <AccordionTrigger onClick={() => toggleAccordion('chapters')}>Chapter</AccordionTrigger>
            <AccordionContent className='flex-1 overflow-y-auto flex flex-wrap gap-2'>
              {chaptersLoading ? (
                <LoadingDots />
              ) : (
                chapters.map((chapter) => (
                  <Button
                    key={chapter}
                    variant='outline'
                    className='w-8 aspect-square'
                    onClick={() => {
                      setBuilder((prev) => ({ ...prev, chapter }))
                      toggleAccordion('verses')
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
            disabled={Lodash.isNil(builder.chapter)}
          >
            <AccordionTrigger onClick={() => toggleAccordion('verses')}>
              <span>Verse(s)</span>
              {!Lodash.isNil(builder.start) && Lodash.isNil(builder.end) && (
                <p className='!no-underline font-light'>
                  You can select an ending verse number to memorize a set of verses, or you can save now
                </p>
              )}
            </AccordionTrigger>
            <AccordionContent className='flex-1 overflow-y-auto flex flex-wrap gap-2'>
              {versesLoading ? (
                <LoadingDots />
              ) : (
                Lodash.times(verses, (index) => {
                  const verseNumber = index + 1
                  return (
                    <Button
                      key={verseNumber}
                      variant='outline'
                      className={cn('w-8 aspect-square', {
                        'bg-green hover:bg-green': verseNumber === builder.start,
                        'bg-red hover:bg-red': verseNumber === builder.end,
                        'bg-gray-300 hover:bg-gray-300':
                          !Lodash.isNil(builder.start) &&
                          !Lodash.isNil(builder.end) &&
                          verseNumber > builder.start &&
                          verseNumber < builder.end,
                      })}
                      onClick={() => {
                        if (!Lodash.isNil(builder.start) && Lodash.isNil(builder.end) && verseNumber > builder.start) {
                          // If we haven't selected an "end" verse, set that
                          setBuilder((prev) => ({ ...prev, end: verseNumber }))
                        } else {
                          // We're selecting a verse for the first time, or selecting a new range of verses
                          setBuilder((prev) => ({ ...prev, start: verseNumber, end: null }))
                        }
                      }}
                    >
                      {verseNumber}
                    </Button>
                  )
                })
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='flex-1 flex flex-col justify-start items-center overflow-y-auto'>
          <h3 className='pt-4 pb-1 text-sm font-medium w-full flex gap-2'>
            <span>Review</span>
            <span className='font-light'>{referenceString}</span>
          </h3>
          {!Lodash.isNil(reference) && (
            <>
              <p>&quot;{text.data?.hasValue ? text.data.value.verseText : ''}&quot;</p>
            </>
          )}
        </div>
        {!Lodash.isNil(reference) && (
          <Button
            onClick={onSave}
            loading={submitting}
            className='w-full mt-2'
          >
            Save Verse
          </Button>
        )}
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
