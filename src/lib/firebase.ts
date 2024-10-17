import { googleLogout } from '@react-oauth/google'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  User,
  signInAnonymously,
} from 'firebase/auth'
import { clientConfig } from 'firebase-config'
import { Result } from '@util/result'
import { Lodash } from '@util/lodash'

// Initialize Firebase
const app = initializeApp(clientConfig)
const auth = getAuth(app)
const database = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

async function giveJwtToTrpc(user: User) {
  const idToken = await user.getIdToken()
  // After signing in the user, tell the backend that the user is logged in
  const res = await fetch('/api/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  if (res.ok) {
    return Result.success(null)
  } else {
    return Result.failure(await res.json())
  }
}

async function signInWithGoogle(): Promise<Result<User>> {
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

    const apiResponse = await giveJwtToTrpc(user)
    if (!apiResponse.hasValue) {
      return apiResponse
    }

    return Result.success(user)
  } catch (err: any) {
    console.error(err)
    return Result.failure({ code: err.code, message: err.message })
  }
}

async function signInWithCredentials(email: string, password: string): Promise<Result<User>> {
  try {
    if (Lodash.isNil(email) || typeof email !== 'string') {
      return Result.failure({ code: 'email:missing', message: 'Please enter an email address' })
    }

    if (Lodash.isNil(password) || typeof password !== 'string') {
      return Result.failure({ code: 'password:missing', message: 'Please enter a password' })
    }

    // create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const apiResponse = await giveJwtToTrpc(userCredential.user)
    if (!apiResponse.hasValue) {
      return apiResponse
    }

    // Pull out user's data from the userCredential property
    return Result.success(userCredential.user)
  } catch (err: any) {
    // Handle errors here
    const errorMessage = err.message
    const errorCode = err.code

    switch (errorCode) {
      case 'auth/weak-password':
        return Result.failure({ code: 'weak-password', message: 'The password is too weak.' })
      case 'auth/email-already-in-use':
        return Result.failure({
          code: 'email-already-in-use',
          message: 'This email address is already in use by another account.',
        })
      case 'auth/invalid-email':
        return Result.failure({ code: 'invalid-email', message: 'This email address is invalid.' })
      case 'auth/operation-not-allowed':
        return Result.failure({ code: 'operation-not-allowed', message: 'Email/password accounts are not enabled.' })
      default:
        return Result.failure({ code: 'login:failure', message: errorMessage })
    }
  }
}

async function signInAsGuest(): Promise<Result<User>> {
  const userCredential = await signInAnonymously(auth)
  const apiResponse = await giveJwtToTrpc(userCredential.user)
  if (!apiResponse.hasValue) {
    return apiResponse
  }

  return Result.success(userCredential.user)
}

const logout = async () => {
  const signedOutPromise = signOut(auth)
  const serverLogoutPromise = fetch('/api/logout')
  const responses = await Promise.all([signedOutPromise, serverLogoutPromise])
  console.log(responses)
  googleLogout()

  location.reload()
}

export { auth, database, signInWithGoogle, signInWithCredentials, signInAsGuest, logout }
