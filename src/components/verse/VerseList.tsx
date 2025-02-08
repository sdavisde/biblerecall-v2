'use client'

import { useSort } from 'src/hooks/use-sort'
import { VerseBox } from '@components/verse/VerseBox'
import { api } from '@lib/trpc/client'
import { Skeleton } from '@components/ui/skeleton'
import { Lodash } from '@util/lodash'

const VerseList = () => {
  const { data: verses, isFetching } = api.verse.allByUser.useQuery()
  const [sortFn] = useSort()

  return (
    <div className='h-full w-full overflow-x-hidden centered flex-col gap-4'>
      {isFetching || !verses?.hasValue
        ? Lodash.times(5, (i) => (
            <Skeleton
              key={i}
              className='rounded-lg h-28 w-full'
            />
          ))
        : verses.value.sort(sortFn).map((verse) => (
            <VerseBox
              verse={verse}
              key={verse.id}
            />
          ))}
    </div>
  )
}

export default VerseList
