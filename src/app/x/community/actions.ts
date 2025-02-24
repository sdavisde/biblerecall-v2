'use server'

import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'
import { Tables } from 'database.types'
import { getUser } from 'src/server'

type FriendRequestStatus = Tables<'friend_requests'>['status']

export async function sendFriendRequest(friendId: string, status: FriendRequestStatus = 'sent'): Promise<Result<null>> {
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
    .or(
      `and(from_profile.eq.${userId},to_profile.eq.${friendId}),and(from_profile.eq.${friendId},to_profile.eq.${userId})`
    )
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
    from_profile: userId,
    to_profile: friendId,
    status,
  }
  console.log(newRequest)
  const { error } = await supabase.from('friend_requests').insert(newRequest).select()
  if (error) {
    return Result.failure(error)
  }
  return Result.success(null)
}
