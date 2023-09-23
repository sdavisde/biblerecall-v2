'use server'

import { NextRequest, NextResponse } from 'next/server'

export type API_Version = {
  id: number
  table: string
  language: string
  abbreviation: string
  version: string
  infoUrl: string
}

export const GET = async (request: NextRequest) => {
  const data = await fetch('https://bible-go-api.rkeplin.com/v1/translations', {})

  const versions = (await data.json()) as API_Version[]

  const sortingArr = ['ESV', 'NIV', 'NLT', 'KJV']

  versions.sort((a, b) => {
    const a_index = sortingArr.indexOf(a.abbreviation)
    const b_index = sortingArr.indexOf(b.abbreviation)

    if (a_index === -1 && b_index >= 0) {
      return 1
    }
    if (a_index >= 0 && b_index === -1) {
      return -1
    }
    if (a_index === -1 && b_index === -1) {
      return 0
    }
    return a_index - b_index
  })

  return NextResponse.json({ versions })
}
