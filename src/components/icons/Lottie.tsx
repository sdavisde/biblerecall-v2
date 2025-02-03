'use client'

import dynamic from 'next/dynamic'

type LottieProps = {
  data: any
  loop?: boolean
  autoplay?: boolean
  className?: string
}
export default function LottieImage({ data, loop, autoplay, className }: LottieProps) {
  const Lottie = dynamic(() => import('react-lottie'), { ssr: false })
  const options = {
    loop: loop ?? false,
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
        speed={0.5}
      />
    </div>
  )
}
