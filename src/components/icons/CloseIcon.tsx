type CloseIconProps = {
  className: string
  onClick: () => void
}

export default function CloseIcon({ className, onClick }: CloseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26.811'
      height='26.811'
      viewBox='0 0 26.811 26.811'
      className={className}
      onClick={onClick}
    >
      <path
        id='Path_46'
        data-name='Path 46'
        d='M401.811,78.7l-2.7-2.7L388.406,86.705,377.7,76,375,78.7l10.706,10.705L375,100.111l2.7,2.7,10.706-10.705,10.706,10.705,2.7-2.7L391.105,89.406Z'
        transform='translate(-375 -76)'
      />
    </svg>
  )
}