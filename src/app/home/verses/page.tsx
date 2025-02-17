import VerseList from '@components/verse/VerseList'
import BookIcon from '@components/icons/BookIcon'
import { VisibilityMenu } from '@components/Settings/SettingSelectors/Visibility-Menu'
import { createClient } from '@lib/supabase/server'
import { from_verse } from 'src/server/adapter'
import { getUser } from 'src/server'

// todo: add filters here
async function getVerses() {
  const supabase = await createClient()
  const userResult = await getUser()
  if (!userResult.hasValue) {
    throw new Error(userResult.error.message)
  }
  const versesResult = await supabase.from('verses').select().eq('user_id', userResult.value.id)
  if (versesResult.error) {
    throw new Error(versesResult.error.message)
  }
  return versesResult.data.map(from_verse)
}

export default async function Verses() {
  const verses = await getVerses()
  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <h1 className='flex items-center gap-4'>
          <BookIcon className='w-10 fill-white' />
          My Verses
        </h1>
        <VisibilityMenu />
      </div>
      <hr className='w-full bg-foreground/80 h-[2px]' />
      <VerseList verses={verses} />
    </>
  )
}
