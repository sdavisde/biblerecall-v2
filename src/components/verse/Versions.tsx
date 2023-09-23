'use client'

import { API_Version } from '@app/api/bible/versions/route'
import { MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Versions() {
  const [versions, setVersions] = useState<API_Version[]>([])
  useEffect(() => {
    const fetchVersions = async () => {
      const { versions } = await fetch('/api/bible/versions').then((res) => res.json())
      setVersions(versions)
    }

    fetchVersions()
  })
  return (
    <>
      {versions?.map((version: API_Version) => (
        <MenuItem
          key={version.abbreviation}
          value={version.abbreviation}
        >
          {version.abbreviation}
        </MenuItem>
      ))}
    </>
  )
}
