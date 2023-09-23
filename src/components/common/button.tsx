import { PropsWithChildren } from 'react'

type ButtonProps = {}

const Button = ({ children }: PropsWithChildren<ButtonProps>) => {
  return <div className='rounded border border-black shadow-md hover:scale-110'>{children}</div>
}

export default Button
