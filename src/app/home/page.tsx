export const dynamic = 'auto'

import { api } from '@lib/trpc/server'
import { PageSelector } from '@components/common/PageSelector'

export default async function Home() {
  const user = await api.user.get()

  // if (Lodash.isNil(user)) {
  //   redirect('/')
  // }

  return (
    <div
      id='panel'
      className='w-full p-4 min-h-[92%] flex flex-col items-center gap-4'
    >
      <PageSelector
        title='My Verses'
        subtitle='Memorize your saved verses'
        imageSrc='/blurry-bible.jpg'
        href='/home/verses'
      />
      <PageSelector
        title='Discover'
        subtitle='Find new verses'
        imageSrc='/mag-glass-bible.jpg'
        href={null}
      />
    </div>
  )
}
