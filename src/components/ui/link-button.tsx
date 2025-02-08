import { ConditionalLink } from '@components/ui/conditional-link'
import { Button, ButtonProps } from '@components/ui/button'

export type LinkButtonProps = ButtonProps & {
  href: string | null
}
export function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <ConditionalLink href={href}>
      <Button
        {...props}
        asDiv
      />
    </ConditionalLink>
  )
}
