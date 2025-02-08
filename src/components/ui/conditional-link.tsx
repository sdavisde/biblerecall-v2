import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

export type ConditionalLinkProps = Omit<LinkProps, 'href'> &
  PropsWithChildren<{
    href: string | null
    className?: string
  }>
export function ConditionalLink({ href, children, ...props }: ConditionalLinkProps) {
  if (href !== null) {
    return (
      <Link
        {...props}
        href={href}
      >
        {children}
      </Link>
    )
  }
  return <span>{children}</span>
}
