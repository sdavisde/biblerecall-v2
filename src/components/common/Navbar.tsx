import { Profile } from '@components/Profile'
import { VersionSelect } from '@components/Settings/SettingSelectors/Version-Select'
import Link from 'next/link'

export default async function Navbar() {
  return (
    <nav className='w-full h-10 bg-green flex justify-between'>
      <div className='flex flex-row ml-4'>
        <h1 className='centered text-base font-light'>
          <Link href='/home'>Bible Recall</Link>
        </h1>
      </div>
      <div className='flex flex-row items-center gap-2 mr-4 h-full'>
        <VersionSelect />
        <Profile />
      </div>
    </nav>
  )
}
