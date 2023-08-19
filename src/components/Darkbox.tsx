import { PropsWithChildren } from 'react'

type DarkboxProps = {
  className?: string
}
export default function Darkbox({
  className,
  children,
}: PropsWithChildren<DarkboxProps>) {
  return (
    <div
      className={
        'w-full h-16 bg-lightGrey text-base centered drop-shadow' +
        (className ?? '')
      }
    >
      {children}
    </div>
  )
}
