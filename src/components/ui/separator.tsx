'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@components/lib/utils'
import { Lodash } from '@util/lodash'

const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { label?: string }
>(({ className, orientation = 'horizontal', label, decorative = true, ...props }, ref) => {
  if (Lodash.isNil(label)) {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...props}
      >
        {label}
      </SeparatorPrimitive.Root>
    )
  }

  return (
    <div className='w-full flex items-center'>
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] flex-1' : 'h-1/2 w-[1px]',
          className
        )}
        {...props}
      />
      <span className='px-3'>{label}</span>
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] flex-1' : 'h-1/2 w-[1px]',
          className
        )}
        {...props}
      />
    </div>
  )
})
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
