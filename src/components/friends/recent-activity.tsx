import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

const activities = [
  {
    id: 1,
    user: 'Emma Watson',
    action: 'added you as a friend',
    time: '2 hours ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    user: 'David Lee',
    action: 'liked your post',
    time: '4 hours ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    user: 'Sophie Turner',
    action: 'commented on your photo',
    time: '1 day ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>Currently in development</p>

        {/* <ul className='space-y-4'>
          {activities.map((activity) => (
            <li
              key={activity.id}
              className='flex items-start space-x-4'
            >
              <Avatar>
                <AvatarImage
                  src={activity.avatar}
                  alt={activity.user}
                />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div>
                  <span className='font-semibold'>{activity.user}</span> {activity.action}
                </div>
                <div className='text-sm text-muted-foreground'>{activity.time}</div>
              </div>
            </li>
          ))}
        </ul> */}
      </CardContent>
    </Card>
  )
}
