'use client'

import { useSettings } from 'hooks/settings'
import LottieImage from './Lottie'
import whiteBook from './book/white.json'
import blackBook from './book/black.json'

type BookIconProps = {
  className?: string
}

export default function BookIcon({ className }: BookIconProps) {
  const [settings] = useSettings()

  if (
    settings?.theme === 'dark' ||
    (settings?.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return <LottieImage data={whiteBook} />
  } else {
    return <LottieImage data={blackBook} />
  }
}
