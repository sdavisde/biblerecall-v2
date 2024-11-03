'use client'

import { useEffect } from 'react'

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}
export default function DiscoverPageError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{JSON.stringify(error)}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
