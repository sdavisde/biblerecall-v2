'use server'

import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'
import { Tables } from 'database.types'
import { getUser } from 'src/server'

export async function sendFriendRequest(friendId: string): Promise<Result<null>> {
  const supabase = await createClient()
  const userResult = await getUser()
  if (!userResult.hasValue) {
    return userResult
  }

  const userId = userResult.value.id
  // if they are friends already, don't bother sending a request
  const matchingFriendRequest = await supabase
    .from('friend_requests')
    .select()
    .or(`and(from_user.eq.${userId},to_user.eq.${friendId}),and(from_user.eq.${friendId},to_user.eq.${userId})`)
    .single()
  const areFriends = !!matchingFriendRequest.data
  if (areFriends) {
    return Result.success(null)
  }

  const friend = await supabase.from('profiles').select().eq('id', friendId).single()
  if (friend.error) {
    return Result.failure(friend.error)
  }

  const newRequest: Omit<Tables<'friend_requests'>, 'id' | 'created_at'> = {
    from_user: userId,
    to_user: friendId,
    status: 'sent',
  }
  console.log(newRequest)
  const { error } = await supabase.from('friend_requests').insert(newRequest).select()
  if (error) {
    return Result.failure(error)
  }
  return Result.success(null)
}
