import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

const friends = [
  { id: 1, name: 'Emma Watson', avatar: '/placeholder.svg?height=40&width=40', status: 'Online' },
  { id: 2, name: 'David Lee', avatar: '/placeholder.svg?height=40&width=40', status: 'Offline' },
  { id: 3, name: 'Sophie Turner', avatar: '/placeholder.svg?height=40&width=40', status: 'Away' },
  { id: 4, name: 'Michael Johnson', avatar: '/placeholder.svg?height=40&width=40', status: 'Online' },
  { id: 5, name: 'Olivia Martinez', avatar: '/placeholder.svg?height=40&width=40', status: 'Offline' },
]

export function FriendsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className='flex items-center space-x-4'
            >
              <Avatar>
                <AvatarImage
                  src={friend.avatar}
                  alt={friend.name}
                />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div>{friend.name}</div>
                <div className='text-sm text-muted-foreground'>{friend.status}</div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
