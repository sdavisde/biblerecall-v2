'use client'

import LottieImage from './Lottie'
import whiteBook from './book/white.json'
import blackBook from './book/black.json'
import { useTheme } from 'next-themes'
import { Theme } from '@configuration/settings'

type BookIconProps = {
  className?: string
}

export default function BookIcon({ className }: BookIconProps) {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === Theme.Dark) {
    return <LottieImage data={whiteBook} />
  } else {
    return <LottieImage data={blackBook} />
  }
}
