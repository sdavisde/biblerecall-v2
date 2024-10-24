import { ParsedUrlQuery } from 'querystring'
import { CardDescription, CardTitle } from '@components/ui/card'
import { Suggestions } from '@components/discover/suggestions'
import { Suspense } from 'react'
import { Skeleton } from '@components/ui/skeleton'

type DiscoverPageProps = {
  searchParams: ParsedUrlQuery
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
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
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
                <Skeleton className='w-full h-20' />
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
