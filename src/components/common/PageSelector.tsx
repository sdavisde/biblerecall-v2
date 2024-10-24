import { Button, ButtonProps } from '@components/ui/button'
import { ConditionalLink } from '@components/util/ConditionalLink'
import { LucideIcon } from 'lucide-react'

type PageSelectorProps = ButtonProps & {
  text: string
  /** If null, this page selector will effectively be disabled */
  href: string | null
  Icon: LucideIcon
}

export const PageSelector = ({ text, Icon, href, ...buttonProps }: PageSelectorProps) => {
  return (
    <ConditionalLink
      href={href}
      className='w-full max-w-lg group'
    >
      <Button
        className='w-full gap-2 py-5'
        {...buttonProps}
      >
        <span className='relative'>
          <Icon className='absolute -left-9 -top-[3px]' />
          {text}
        </span>
      </Button>
    </ConditionalLink>
  )
}
