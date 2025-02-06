'use client'

import { useState } from 'react'
import { Verse } from 'src/service/verse/types'

/**
 * If return value is positive, b switches with a.
 *
 * If return value is negative or 0, then a stays left of b
 */
export type SortFn = (a: Verse, b: Verse) => number

export function chronological(a: Verse, b: Verse) {
  if (!a || !b) {
    return 0
  }

  if (a.book.id < b.book.id) {
    return -1
  } else if (b.book.id < a.book.id) {
    return 1
  } else if (a.chapter < b.chapter) {
    return -1
  } else if (b.chapter < a.chapter) {
    return 1
  } else if (a.start < b.start) {
    return -1
  } else if (b.start < a.start) {
    return 1
  } else {
    if (b.end && !a.end) {
      return -1
    } else if (a.end && !b.end) {
      return 1
    }
    return 0
  }
}

export function favorites(a: Verse, b: Verse) {
  if (a.favorite && !b.favorite) {
    return -1
  } else if (b.favorite && !a.favorite) {
    return 1
  } else {
    return chronological(a, b)
  }
}

export const useSort = () => {
  const [sortFn, setSortFn] = useState<SortFn>(() => favorites)

  return [sortFn, setSortFn] as const
}
