'use client'

import toast from 'react-hot-toast'
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

type VerseSelectProps = PropsWithChildren<{
  submitVerse: (verse: Verse) => Promise<Result<unknown>>
  initialVerse?: Verse
}>

type VerseSelectorTabs = (typeof verseSelectorTabs)[number]
const verseSelectorTabs = ['Books', 'Chapters', 'Verses', 'Review'] as const

export const VerseSelector = ({ submitVerse, initialVerse, children }: VerseSelectProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<VerseSelectorTabs>('Review')
  const [submitting, setSubmitting] = useState(false)
  const bookSearchRef = useRef<HTMLInputElement>(null)

  const [builder, setBuilder] = useState<VerseBuilder>(VerseBuilder.init(initialVerse ?? null))
  const reference = useMemo(() => {
    const newReference = VerseBuilder.toReference(builder)
    return newReference.hasValue ? newReference.value : null
  }, [builder])
  const referenceString = useMemo(() => Verses.stringifyPartialReference(builder as Partial<VerseReference>), [builder])
  const { chapters, isLoading: chaptersLoading } = useChapters(builder.book)
  const { verses, isLoading: versesLoading } = useVerses(builder.book, builder.chapter)
  const text = api.bible.getVerse.useQuery({ reference, version: builder.version })

  const resetState = () => {
    setBuilder(VerseBuilder.init(initialVerse ?? null))
    setActiveTab('Review')
  }

  useEffect(() => {
    if (text.data && text.data.hasValue) {
      const verseText = text.data.value.verseText
      setBuilder((prev) => ({ ...prev, text: verseText }))
    }
  }, [text.data])

  useEffect(() => {
    if (activeTab === 'Books') {
      bookSearchRef.current?.focus()
    }
  }, [activeTab])

  useEffect(() => {
    resetState()
    if (drawerIsOpen && Lodash.isNil(initialVerse)) {
      setActiveTab('Books')
      setTimeout(() => bookSearchRef.current?.focus(), 400)
    }
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
      <DrawerContent className='h-[90dvh] max-h-[90dvh] p-4 '>
        <DrawerClose className='absolute top-4 left-4'>Close</DrawerClose>
        <DrawerHeader>
          <DrawerTitle>New Verse</DrawerTitle>
          <DrawerDescription>{referenceString}</DrawerDescription>
        </DrawerHeader>
        <Tabs
          value={activeTab}
          className='flex-1 max-h-[calc(90dvh-8rem)] flex flex-col relative'
        >
          <TabsList className='w-full'>
            <TabsTrigger
              value='Books'
              onClick={() => setActiveTab('Books')}
              className='flex-1'
            >
              Book
            </TabsTrigger>
            <TabsTrigger
              value='Chapters'
              onClick={() => setActiveTab('Chapters')}
              disabled={Lodash.isNil(builder.book)}
              className='flex-1'
            >
              Chapters
            </TabsTrigger>
            <TabsTrigger
              value='Verses'
              onClick={() => setActiveTab('Verses')}
              disabled={Lodash.isNil(builder.chapter)}
              className='flex-1'
            >
              Verses
            </TabsTrigger>
            <TabsTrigger
              value='Review'
              onClick={() => setActiveTab('Review')}
              disabled={Lodash.isNil(reference)}
              className='flex-1'
            >
              Review
            </TabsTrigger>
          </TabsList>
          <div className='flex-1 px-2 pt-2 flex flex-col max-h-[calc(100%-2rem)]'>
            <TabsContent
              value='Books'
              className='max-h-full overflow-y-auto'
            >
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
                          setBuilder((prev) => ({ ...prev, book, chapter: null, start: null, end: null }))
                          setActiveTab('Chapters')
                        }}
                      >
                        <span> {book.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </TabsContent>
            <TabsContent
              value='Chapters'
              className='grid grid-cols-5 gap-3 max-h-full overflow-y-auto'
            >
              {chaptersLoading ? (
                <LoadingDots />
              ) : (
                chapters.map((chapter) => (
                  <Button
                    key={chapter}
                    variant='outline'
                    className='w-full h-full aspect-square'
                    onClick={() => {
                      setBuilder((prev) => ({ ...prev, chapter, start: null, end: null }))
                      setActiveTab('Verses')
                    }}
                  >
                    {chapter}
                  </Button>
                ))
              )}
            </TabsContent>
            <TabsContent
              value='Verses'
              className={cn('flex flex-col justify-between gap-4', {
                'flex-1 max-h-[calc(100%-1.5rem)]': activeTab === 'Verses',
              })}
            >
              <div className='grid grid-cols-5 gap-3 max-h-full overflow-y-auto'>
                {versesLoading ? (
                  <LoadingDots />
                ) : (
                  Lodash.times(verses, (index) => {
                    const verseNumber = index + 1
                    return (
                      <Button
                        key={verseNumber}
                        variant='outline'
                        className={cn('w-full h-full aspect-square', {
                          'bg-green hover:bg-green': verseNumber === builder.start,
                          'bg-red hover:bg-red': verseNumber === builder.end,
                          'bg-gray-300 hover:bg-gray-300':
                            !Lodash.isNil(builder.start) &&
                            !Lodash.isNil(builder.end) &&
                            verseNumber > builder.start &&
                            verseNumber < builder.end,
                        })}
                        onClick={() => {
                          if (
                            !Lodash.isNil(builder.start) &&
                            Lodash.isNil(builder.end) &&
                            verseNumber > builder.start
                          ) {
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
              </div>
              <Button
                className='w-full'
                disabled={Lodash.isNil(reference)}
                onClick={() => setActiveTab('Review')}
              >
                Continue
              </Button>
            </TabsContent>
            <TabsContent
              value='Review'
              className={cn('flex flex-col justify-between gap-4 mt-2', {
                'flex-1 max-h-[calc(100%-1.5rem)]': activeTab === 'Review',
              })}
            >
              <div className='flex flex-col max-h-full overflow-y-auto'>
                <h3 className='pb-1 text-sm font-medium w-full flex gap-2'>
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
                  className='w-full'
                >
                  Save Verse
                </Button>
              )}
            </TabsContent>
          </div>
        </Tabs>
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
