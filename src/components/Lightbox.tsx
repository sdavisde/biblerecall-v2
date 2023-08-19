type LightboxProps = {
  title: string
  className?: string
}
export default function Lightbox({ title, className }: LightboxProps) {
  return (
    <div
      className={
        'w-full h-12 bg-white text-base centered drop-shadow' +
        (className ?? '')
      }
    >
      <h5 className='centered'>{title}</h5>
    </div>
  )
}
