import { Profile } from '@components/Profile'
import Link from 'next/link'

export default async function Navbar() {
  return (
    <nav className='w-full h-10 bg-green flex justify-between'>
      <div className='flex flex-row ml-4'>
        <h1 className='centered text-base font-light'>
          <Link href='/home'>Bible Recall</Link>
        </h1>
      </div>
      <div className='flex flex-row mr-4 h-full'>
        <Profile />
      </div>
    </nav>
  )
}
