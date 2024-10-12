import { googleLogout } from '@react-oauth/google'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithCredential, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { clientConfig } from 'firebase-config'

// Initialize Firebase
const app = initializeApp(clientConfig)
const auth = getAuth(app)
const database = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    await setDoc(doc(database, 'Users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      authProvider: 'google',
    })

    // After signing in the user, tell the backend that the user is logged in
    const idToken = await user.getIdToken()
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })

    return user
  } catch (err: any) {
    console.error(err)
    alert(err.message)
    return null
  }
}

const handleLoginWithAccessToken = async (accessToken: string | undefined) => {
  try {
    // Now use the Google access token with Firebase Authentication
    const credential = GoogleAuthProvider.credential(accessToken)
    const { user } = await signInWithCredential(auth, credential)

    await setDoc(doc(database, 'Users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      authProvider: 'google',
    })

    // After signing in the user, tell the backend that the user is logged in
    const idToken = await user.getIdToken()
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })

    location.reload()
  } catch (err: any) {
    console.error(err)
    alert(err.message)
    return null
  }
}

const logout = async () => {
  const signedOutPromise = signOut(auth)
  const serverLogoutPromise = fetch('/api/logout')
  const responses = await Promise.all([signedOutPromise, serverLogoutPromise])
  console.log(responses)
  googleLogout()

  location.reload()
}

export { auth, database, signInWithGoogle, handleLoginWithAccessToken, logout }
