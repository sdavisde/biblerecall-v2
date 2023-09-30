import { PropsWithChildren } from 'react'

type LightboxProps = {
  className?: string
}
export default function Lightbox({ className, children }: PropsWithChildren<LightboxProps>) {
  return (
    <div className={'w-full h-12 bg-white dark:bg-darkerGrey text-base centered drop-shadow ' + (className ?? '')}>
      {children}
    </div>
  )
}
