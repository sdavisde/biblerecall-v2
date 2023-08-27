import { getServerSession } from 'next-auth'
import ProfileIcon from '@components/icons/ProfileIcon'

export default async function Profile() {
  const session = await getServerSession()

  if (session?.user?.image) {
    return <ProfileIcon imageSrc={session?.user.image} />
  } else {
    // if status is unathenticated, we don't want to show a loading text
    return <></>
  }
}
