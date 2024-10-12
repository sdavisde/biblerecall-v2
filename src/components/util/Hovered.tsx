'use client'

import { Lodash } from '@util/lodash'
import { LucideProps, LucideIcon } from 'lucide-react'
import { useState } from 'react'

type HoveredProps = React.HTMLAttributes<HTMLDivElement> & {
  DefaultComp: LucideIcon
  HoveredComp?: LucideIcon
  defaultProps?: LucideProps
  hoveredProps?: LucideProps
}

export function Hovered({ HoveredComp, DefaultComp, defaultProps, hoveredProps, ...props }: HoveredProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Component = Lodash.defaults(isHovered ? HoveredComp : DefaultComp, DefaultComp)

  return (
    <span
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      {...props}
    >
      <Component {...(isHovered ? hoveredProps : defaultProps)} />
    </span>
  )
}
