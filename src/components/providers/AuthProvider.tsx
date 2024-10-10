'use client'
import { createContext, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@lib/firebase'
import Cookies from 'js-cookie'

const AuthContext = createContext<string | null>(null)

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        Cookies.set('userId', user.uid)
      } else {
        Cookies.remove('userId')
      }
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={Cookies.get('userId') ?? null}>{children}</AuthContext.Provider>
}

export const useUserId = () => {
  return useContext(AuthContext)
}
