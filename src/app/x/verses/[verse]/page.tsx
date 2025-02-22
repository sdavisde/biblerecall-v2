import { Button } from '@components/ui/button'
import { ConditionalLink } from '@components/ui/conditional-link'
import { Verses } from '@util/verses'
import { AudioLines, ChevronLeft, Keyboard, Puzzle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVerseById, updateVerse } from 'src/server/routers/verse'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from 'database.types'
import { Textarea } from '@components/ui/textarea'
import { Verse, verseSchema } from 'src/service/verse/types'
import { FormButton } from '@components/form/form-button'
import { Label } from '@components/ui/label'

type VersePageProps = {
  params: Promise<{
    verse: string
  }>
}
export async function generateStaticParams() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const verses = await supabase.from('verses').select()

  return (
    verses.data?.map((verse) => ({
      verse: verse.id,
    })) ?? []
  )
}

async function saveNotes(verse: Verse, formData: FormData) {
  'use server'
  const result = verseSchema.safeParse({
    ...verse,
    notes: formData.get('notes'),
  })
  console.log(result)
  if (result.error) {
    return result.error.message
  }

  const verseResult = await updateVerse(result.data)
  if (!verseResult.hasValue) {
    return verseResult.error
  }
}

export default async function VersePage(props: VersePageProps) {
  const params = await props.params

  const { verse: id } = params

  const verse = await getVerseById(id)

  if (!verse.hasValue) {
    return notFound()
  }
  const completions = verse.value.completions
  const submitNotes = saveNotes.bind(null, verse.value)

  return (
    <>
      <h1 className='relative'>{Verses.stringifyReference(verse.value)}</h1>
      <form
        className='relative w-full'
        action={submitNotes}
      >
        <Label>Notes</Label>
        <Textarea
          defaultValue={verse.value.notes ?? undefined}
          placeholder='I want to memorize this verse because...'
          name='notes'
          className='text-sm pe-24'
        />
        <FormButton
          variant='outline'
          className='absolute bottom-4 right-4'
        >
          Save
        </FormButton>
      </form>
      <h3>Practiced {completions} times</h3>
      <div className='flex flex-col lg:grid w-full gap-2'>
        <Link
          href={`/x/verses/${id}/read`}
          className='flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 outline-none'
        >
          <AudioLines className='h-6 w-6' />
          <div className='mb-2 mt-4 text-lg font-medium'>Spoken Word</div>
          <span className='text-sm leading-tight text-muted-foreground'>
            Read portions of this verse bit-by-bit, to increase retention and understanding. Focus on moving slowly, and
            thinking about what this verse tells you about the character of God.
          </span>
        </Link>
        <Link
          href={`/x/verses/${id}/type-it-out`}
          className='flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 outline-none'
        >
          <Keyboard className='h-6 w-6' />
          <div className='mb-2 mt-4 text-lg font-medium'>Type it out</div>
          <span className='text-sm leading-tight text-muted-foreground'>
            Type out the <b>first letter</b> of each word to this verse, as a way to help you fast-track your
            memorization process!
          </span>
          <span className='text-sm leading-tight text-muted-foreground'>
            Must score above a 90%, then the levels get harder.
          </span>
        </Link>
        <ConditionalLink
          href={null}
          className='flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 outline-none opacity-50 pointer-events-none'
        >
          <Puzzle className='h-6 w-6' />
          <div className='mb-2 mt-4 text-lg font-medium'>Puzzle Pieces (coming soon)</div>
          <span className='text-sm leading-tight text-muted-foreground'>
            Can you rearrange the scrambled-up words of this verse back into the correct order?
          </span>
          <span className='text-sm leading-tight text-muted-foreground'>
            Try to say the verse aloud as you drag the pieces into place.
          </span>
        </ConditionalLink>
      </div>
      <div className='centered w-full gap-2 mt-4'>
        <Link
          href='/x/verses'
          className='w-1/2 centered'
        >
          <Button
            variant='ghost'
            className='flex gap-2'
          >
            <ChevronLeft />
            Go back
          </Button>
        </Link>
        {/* <Button
          variant='outline'
          className='w-1/2'
        >
          Delete
        </Button> */}
      </div>
    </>
  )
}
