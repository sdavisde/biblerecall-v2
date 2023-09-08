'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'

interface ProfileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
}

export default function ProfileIcon(props: ProfileIconProps) {
  const { imageSrc, ...rest } = props

  return (
    <div
      className='centered cursor-pointer'
      onClick={() => signOut()}
      {...rest}
    >
      <Image
        src={imageSrc}
        width={40}
        height={40}
        alt='Profile Pic'
        className='rounded-[25px] self-center mr-2'
      />
    </div>
  )
}
