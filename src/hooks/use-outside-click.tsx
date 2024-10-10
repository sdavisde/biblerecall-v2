import { useEffect, useRef } from 'react'

export default function useOutsideClick(onOutsideClick: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref }
}
