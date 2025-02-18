'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { sendFriendRequest } from './actions'

interface Props {
  potentialFriendId: string | null
}
export function SendRequest({ potentialFriendId }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    const attemptFriendRequest = async () => {
      if (!potentialFriendId) {
        return
      }
      // Try to send a request
      const result = await sendFriendRequest(potentialFriendId)
      // Toast for the user to know if it was successful or not
      if (result.hasValue) {
        toast.success('✅ Successfully sent friend request')
      } else {
        toast.error(result.error.message)
      }
      // remove query params
      const nextSearchParams = new URLSearchParams(searchParams.toString())
      nextSearchParams.delete('uid')
      router.replace(`${pathname}?${nextSearchParams}`)
    }

    attemptFriendRequest()
  })

  return <></>
}
