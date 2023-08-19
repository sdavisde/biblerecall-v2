'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Darkbox from '@components/Darkbox'
import { signIn } from 'next-auth/react'

type LoginboxProps = {
  loggedIn?: boolean
}

const Loginbox = ({ loggedIn }: LoginboxProps) => {
  const [showBox, setShowBox] = useState(true)

  if (!showBox || loggedIn) {
    return <></>
  }
  return (
    <Darkbox>
      <div className='w-full relative centered'>
        <Image
          src='/icons/close.svg'
          alt='close'
          width={12}
          height={12}
          style={{ color: '#bababa' }}
          className='absolute right-2 top-0 hover:bg-black'
          onClick={() => setShowBox((prev) => !prev)}
        />
        <p className='text-sm text-center w-[81%]'>
          Verses will be saved automatically to your device. To view your verses
          on any device, <br />
          <button
            onClick={() =>
              signIn('google', {
                callbackUrl: `${window.location.origin}/home`,
              })
            }
            className='underline'
          >
            Log In Here
          </button>
        </p>
      </div>
    </Darkbox>
  )
}

export default Loginbox

const popupCenter = (url: string, title: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX
  const dualScreenTop = window.screenTop ?? window.screenY
  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width

  const height =
    window.innerHeight ?? document.documentElement.clientHeight ?? screen.height

  const systemZoom = width / window.screen.availWidth

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft
  const top = (height - 550) / 2 / systemZoom + dualScreenTop

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${
      550 / systemZoom
    },top=${top},left=${left}`
  )

  console.log(newWindow)

  newWindow?.focus()
}
