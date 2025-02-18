import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { createClient } from '@lib/supabase/server'
import { getUser } from 'src/server'

async function getFriendRequests() {
  const supabase = await createClient()
  const userResult = await getUser()
  if (!userResult.hasValue) {
    return []
  }
  const { data } = await supabase.from('friend_requests').select().eq('to_user', userResult.value.id)
  // todo: join on users table to get profile pic - will have to add profile pic to public.profiles
  return data ?? []
}

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
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-4'>
                {/* <Avatar>
                  <AvatarImage
                    src={request.avatar}
                    alt={request.name}
                  />
                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                <span>{request.id}</span>
              </div>
              <div className='space-x-2'>
                <Button
                  size='sm'
                  variant='outline'
                >
                  Accept
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                >
                  Decline
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
