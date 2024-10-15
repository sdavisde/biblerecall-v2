import { Lodash } from '@util/lodash'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

type ConditionalLinkProps = PropsWithChildren<Omit<LinkProps, 'href'>> & {
  href: string | null
  className?: string
}
export const ConditionalLink = ({ href, className, children, ...props }: ConditionalLinkProps) => {
  if (Lodash.isNil(href)) {
    return <div className={className}>{children}</div>
  }
  return (
    <Link
      {...props}
      href={href}
      className={className}
    >
      {children}
    </Link>
  )
}
