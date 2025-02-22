import { FriendRequests } from '@components/friends/friend-requests'
import { FriendsList } from '@components/friends/friends-list'
import { RecentActivity } from '@components/friends/recent-activity'
import { SendRequest } from './send-request'

export default async function SocialPage({ searchParams }: { searchParams: Promise<{ uid?: string }> }) {
  const { uid } = await searchParams
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Community</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2 md:order-1 order-2'>
          <FriendsList />
          <div className='mt-8'>
            <RecentActivity />
          </div>
        </div>
        <div className='md:order-2 order-1 mb-8 md:mb-0'>
          <FriendRequests />
        </div>
      </div>
      {/* TODO: instead of sending a request here, if a UID exists I should just auto-friend them */}
      <SendRequest potentialFriendId={uid ?? null} />
    </div>
  )
}
