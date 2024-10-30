import { useEffect, useState } from 'react'

/**
 * Applies a media query for the current browser
 * @param query The media query to use (i.e. "(min-width: 768px)")
 * @returns boolean for whether the media query is met
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}
