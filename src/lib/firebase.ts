// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, query, getDocs, collection, doc, where, setDoc } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAeo7eyiNmmMinLiwgLDXqLUoolWVeT5Wg',
  authDomain: 'biblerecall-48cea.firebaseapp.com',
  projectId: 'biblerecall-48cea',
  storageBucket: 'biblerecall-48cea.appspot.com',
  messagingSenderId: '807175798071',
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(database, 'Users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    console.log(res, user, q, docs)
    await setDoc(doc(database, 'Users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      authProvider: 'google',
    })
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, database, signInWithGoogle, logout }
