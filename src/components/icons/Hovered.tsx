'use client'

import { useState } from 'react'

interface HoveredProps extends React.HTMLAttributes<HTMLDivElement> {
  default: any
  hovered: any
}

export default function Hovered(props: HoveredProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      {...props}
    >
      {hovered ? <props.hovered /> : <props.default />}
    </div>
  )
}
