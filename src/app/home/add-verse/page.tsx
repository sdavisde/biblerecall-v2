import { ParsedUrlQuery } from 'querystring'
import { CardTitle } from '@components/ui/card'
import AddVerse from '@components/verse/AddVerse'

type DiscoverPageProps = {
  searchParams: Promise<ParsedUrlQuery>
}

export default async function AddVersePage(props: DiscoverPageProps) {
  const searchParams = await props.searchParams
  const query = searchParams.query as string

  return (
    <div className='w-full flex-1'>
      <div className='w-full flex flex-col gap-4'>
        <CardTitle>Add Verse</CardTitle>
        <AddVerse />
      </div>
    </div>
  )
}
