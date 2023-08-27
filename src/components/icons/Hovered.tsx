'use client'

import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { useState } from 'react'

interface HoveredProps extends React.HTMLAttributes<HTMLDivElement> {
  DefaultComp: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string }
  HoveredComp: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string }
  type?: 'primary' | 'warning'
  override?: boolean
}

export default function Hovered({
  HoveredComp,
  DefaultComp,
  type,
  override,
  ...props
}: HoveredProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      {...props}
    >
      {isHovered ? (
        <HoveredComp color={type ?? 'primary'} />
      ) : (
        <DefaultComp color={override ? type : 'inherit'} />
      )}
    </div>
  )
}
