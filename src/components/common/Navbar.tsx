import Profile from '@components/Profile'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className='w-full h-[6%] bg-green flex justify-between'>
      <div className='flex flex-row'>
        <Image
          src='/icons/menu.svg'
          alt='menu icon'
          width={20}
          height={20}
          className='m-4'
        />
        <h1 className='centered text-base font-light'>Bible Recall</h1>
      </div>
      <Profile />
    </div>
  )
}
