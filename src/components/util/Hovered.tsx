'use client'

import { useState } from 'react'
import { IconType } from 'react-icons'

interface HoveredProps extends React.HTMLAttributes<HTMLDivElement> {
  DefaultComp: IconType
  HoveredComp: IconType
  type?: 'primary' | 'warning'
  override?: boolean
}

export default function Hovered({ HoveredComp, DefaultComp, type, override, ...props }: HoveredProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      {...props}
    >
      {isHovered ? <HoveredComp color={type ?? 'primary'} /> : <DefaultComp color={override ? type : 'inherit'} />}
    </div>
  )
}
