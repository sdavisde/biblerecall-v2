import { VerseSuggestion } from '@components/verse/VerseSuggestion'
import { ParsedUrlQuery } from 'querystring'
import { cache } from 'react'
import { generateTextFromQuery } from './actions'
import { CardDescription, CardTitle } from '@components/ui/card'

type DiscoverPageProps = {
  searchParams: ParsedUrlQuery
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const query = searchParams.query as string
  const text = await cachedGenerateText(query)

  return (
    <div className='w-full flex-1'>
      {text.hasValue ? (
        <div className='w-full flex flex-col gap-4'>
          <CardTitle>Discover</CardTitle>
          <CardDescription>Here are some verses that might relate to &quot;{query}&quot;</CardDescription>
          <div className='w-full flex flex-col gap-2'>
            {text.value.map((verse) => (
              <VerseSuggestion
                key={verse.reference}
                verse={verse}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>{text.error.message}</p>
      )}
    </div>
  )
}

const cachedGenerateText = cache(generateTextFromQuery)
