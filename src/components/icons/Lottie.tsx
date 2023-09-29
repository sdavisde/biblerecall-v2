'use client'

import Lottie from 'react-lottie'

type LottieProps = {
  data: any
  loop?: boolean
  autoplay?: boolean
  className?: string
}
export default function LottieImage({ data, loop, autoplay, className }: LottieProps) {
  const options = {
    loop: loop ?? true,
    autoplay: autoplay ?? true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className={className + ' relative dark:text-white'}>
      <Lottie
        options={options}
        height={51}
        width={51}
      />
    </div>
  )
}
