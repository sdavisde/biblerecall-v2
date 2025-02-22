import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { createClient } from '@lib/supabase/server'
import { getUser } from 'src/server'
import { Check, Trash2 } from 'lucide-react'
import { cache } from 'react'

const getFriendRequests = cache(async () => {
  const supabase = await createClient()
  const userResult = await getUser()
  if (!userResult.hasValue) {
    return []
  }
  const { data, error } = await supabase
    .from('friend_requests')
    .select(
      'id, created_at, from_profile, to_profile, status, profiles!friend_requests_from_profile_fkey (first_name, last_name)'
    )
    .eq('to_profile', userResult.value.id)
  return data ?? []
})

export async function FriendRequests() {
  const friendRequests = await getFriendRequests()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          {friendRequests.map((request) => (
            <li
              key={request.id}
              className='flex flex-col xl:flex-row items-start xl:items-center justify-between'
            >
              <div className='flex items-center space-x-4'>
                {/* <Avatar>
                  <AvatarImage
                    src={request.avatar}
                    alt={request.name}
                  />
                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                <span>
                  {request.profiles?.first_name} {request.profiles?.last_name}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Button
                  size='sm'
                  variant='ghost'
                >
                  <Check
                    color='green'
                    className='w-5 h-5'
                  />
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                >
                  <Trash2 className='w-5 h-5' />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
