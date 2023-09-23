'use client'

import { API_Version } from '@app/api/bible/versions/route'
import { useEffect, useState } from 'react'

export default function useVersions() {
  const [versions, setVersions] = useState<API_Version[]>([])
  useEffect(() => {
    const fetchVersions = async () => {
      const { versions } = await fetch('/api/bible/versions').then((res) => res.json())
      setVersions(versions)
    }

    fetchVersions()
  })
  return versions
}
