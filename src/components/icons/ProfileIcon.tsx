'use client'

import { logout } from '@lib/firebase'
import Image from 'next/image'

interface ProfileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
}

export default function ProfileIcon(props: ProfileIconProps) {
  const { imageSrc, ...rest } = props

  return (
    <div
      className='centered cursor-pointer'
      onClick={logout}
      {...rest}
    >
      <Image
        src={imageSrc}
        width={30}
        height={30}
        alt='Profile Pic'
        className='rounded-[25px] self-center mr-2'
      />
    </div>
  )
}
