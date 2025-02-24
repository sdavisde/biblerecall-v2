import { Card, CardTitle } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import { Book, Users, LogOut } from 'lucide-react'
import { SettingsForm } from '@components/Settings/settings-form'
import { getSettings } from 'src/server/routers/settings'
import { getUser } from 'src/server'
import { createClient } from '@lib/supabase/server'
import { Button } from '@components/ui/button'
import { logout } from '@lib/supabase/actions'
import { Result } from '@util/result'
import { notFound } from 'next/navigation'
import { ShareProfileQR } from '@components/friends/share-profile-qr'

async function fetchUser() {
  const userResult = await getUser()
  if (!userResult.hasValue) {
    return userResult
  }

  const user = userResult.value
  const supabase = await createClient()
  const { count: numVerses } = await supabase.from('verses').select('*', { count: 'exact' }).eq('user_id', user.id)

  const { count: numFriends } = await supabase
    .from('friends')
    .select('*', { count: 'exact' })
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)

  return Result.success({
    id: user.id,
    name: (user.user_metadata?.['full_name'] ??
      `${user.user_metadata?.['first_name'] ?? ''} ${user.user_metadata?.['last_name'] ?? ''}`) as string,
    email: user.user_metadata?.['email'] ?? null,
    avatar: user.user_metadata?.['picture'] ?? null,
    bio: null,
    joinDate: new Date(user.created_at).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    theme: 'Light',
    font: 'Serif',
    verseVisualization: 'Partial',
    versesMemorized: numVerses,
    currentStreak: 15,
    longestStreak: 30,
    topVerse: 'Philippians 4:13',
    recentActivity: [
      { action: 'Memorized', verse: 'John 3:16', date: '2023-06-10' },
      { action: 'Reviewed', verse: 'Psalm 23', date: '2023-06-09' },
      { action: 'Started', verse: 'Romans 8:28', date: '2023-06-08' },
    ],
    achievements: [
      // { name: 'Scripture Novice', description: 'Memorized first 10 verses' },
      // { name: 'Consistent Learner', description: '30-day streak' },
      // { name: 'Psalm Master', description: 'Memorized entire Psalm 23' },
    ],
    friends: numFriends,
    studyGroups: 0,
  })
}

export default async function ProfilePage() {
  const userResult = await fetchUser()
  const settings = await getSettings()

  if (!userResult.hasValue) {
    return notFound()
  }

  const user = userResult.value

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col gap-8'>
      <Card className='flex flex-col sm:flex-row items-start justify-between gap-4'>
        <div className='flex gap-4'>
          <Avatar className='w-24 h-24'>
            <AvatarImage
              src={user.avatar}
              alt={user.name ?? ''}
            />
            <AvatarFallback>
              {(user.name ?? '')
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='text-center sm:text-left w-full'>
            <CardTitle className='text-2xl font-bold'>{user.name}</CardTitle>
            <p className='text-muted-foreground'>{user.email}</p>
            <p className='mt-2'>{user.bio}</p>
            <div className='flex justify-center sm:justify-start gap-2 mt-2'>
              <Badge variant='secondary'>
                <Book className='w-4 h-4 mr-1' />
                {user.versesMemorized} Verses
              </Badge>
              <Badge variant='secondary'>
                <Users className='w-4 h-4 mr-1' />
                {user.friends} Friends
              </Badge>
              {/* <Badge variant='secondary'>
              <Award className='w-4 h-4 mr-1' />
              {user.achievements.length} Achievements
            </Badge> */}
            </div>
          </div>
        </div>
        <ShareProfileQR
          userId={user.id}
          userName={user.name}
        />
      </Card>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card>
            <h2 className='text-lg font-semibold mb-2'>Memorization Stats</h2>
            <p className='italic text-muted-foreground'>Under development</p>
            {/* <div className='space-y-2'>
              <div>
                <div className='flex justify-between text-sm'>
                  <span>Current Streak</span>
                  <span>{user.currentStreak} days</span>
                </div>
                <Progress
                  value={(user.currentStreak / user.longestStreak) * 100}
                  className='h-2'
                />
              </div>
              <p className='text-sm text-muted-foreground'>Longest Streak: {user.longestStreak} days</p>
              <p className='text-sm'>
                <Bookmark className='inline w-4 h-4 mr-1' />
                Top Verse: {user.topVerse}
              </p>
            </div> */}
          </Card>
          <Card>
            <CardTitle className='text-lg mb-2 flex items-center justify-between gap-2'>
              App Settings
              <SettingsForm settings={settings} />
            </CardTitle>
            <div className='space-y-1'>
              {Object.entries(settings ?? {})
                .filter(([key]) => ['theme', 'visibility', 'font'].includes(key))
                .map(([key, value]) => (
                  <p key={key}>
                    <span className='font-semibold me-1 capitalize'>{key}:</span>
                    <span className='italic'>{value}</span>
                  </p>
                ))}
            </div>
          </Card>
        </div>
        <Card className='mt-6'>
          <CardTitle className='text-lg mb-2'>Recent Activity</CardTitle>
          <p className='italic text-muted-foreground'>Under development</p>
          {/* <ul className='space-y-2'>
            {user.recentActivity.map((activity, index) => (
              <li
                key={index}
                className='text-sm'
              >
                {activity.action} <strong>{activity.verse}</strong> on {activity.date}
              </li>
            ))}
          </ul> */}
        </Card>
        <Card className='mt-6'>
          <CardTitle className='text-lg mb-2'>Achievements</CardTitle>
          <p className='italic text-muted-foreground'>Under development</p>
          {/* <div className='flex flex-wrap gap-2'>
            {user.achievements.map((achievement, index) => (
              <Badge
                key={index}
                variant='outline'
                className='py-1'
              >
                <Award className='w-4 h-4 mr-1' />
                {achievement.name} 
              </Badge>
            ))}
          </div> */}
        </Card>
        <Button
          variant='destructive'
          size='sm'
          onClick={logout}
          className='gap-2 mt-6'
        >
          <LogOut className='w-4 h-4' /> Log out
        </Button>
      </div>
    </div>
  )
}
