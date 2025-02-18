import { ParsedUrlQuery } from 'querystring'
import { CardDescription, CardTitle } from '@components/ui/card'
import { Suggestions } from '@components/discover/suggestions'
import { Suspense } from 'react'
import { Skeleton } from '@components/ui/skeleton'
import { Lodash } from '@util/lodash'

type DiscoverPageProps = {
  searchParams: Promise<ParsedUrlQuery>
}

export default async function DiscoverPage(props: DiscoverPageProps) {
  const searchParams = await props.searchParams
  const query = searchParams.query as string

  return (
    <div className='w-full flex-1'>
      <div className='w-full flex flex-col gap-4'>
        <CardTitle>Discover</CardTitle>
        <CardDescription>Here are some verses that might relate to &quot;{query}&quot;</CardDescription>
        <div className='w-full flex flex-col gap-2'>
          <Suspense
            fallback={
              <>
                {Lodash.range(1, 10).map((i) => (
                  <Skeleton
                    key={i}
                    className='w-full h-20'
                  />
                ))}
              </>
            }
          >
            <Suggestions query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
