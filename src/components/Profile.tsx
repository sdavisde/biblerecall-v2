'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { logout } from '@lib/firebase'
import { api } from '@lib/trpc/client'
import { User } from 'types/api'

export function Profile() {
  const user = api.user.get.useQuery<User>()

  if (user.isLoading || !user.data) {
    return <></>
  }

  return (
    <div
      className='centered cursor-pointer scale-75'
      onClick={logout}
    >
      <Avatar>
        <AvatarImage src={user.data.picture} />
        <AvatarFallback>BR</AvatarFallback>
      </Avatar>
    </div>
  )
}
