import { ReactNode } from 'react'

type ControlledProps = {
  shown: boolean
  children: ReactNode
}

const Controlled = ({ children, shown }: ControlledProps) => {
  if (shown) {
    return <>{children}</>
  } else {
    return <></>
  }
}

export default Controlled
