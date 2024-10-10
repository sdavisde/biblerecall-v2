import ProfileIcon from '@components/icons/ProfileIcon'
import { auth } from '@lib/firebase'
import { Lodash } from '@util/lodash'

export default async function Profile() {
  if (!Lodash.isNil(auth.currentUser?.photoURL)) {
    return <ProfileIcon imageSrc={auth.currentUser!.photoURL} />
  } else {
    // if status is unathenticated, we don't want to show a loading text
    return <></>
  }
}
