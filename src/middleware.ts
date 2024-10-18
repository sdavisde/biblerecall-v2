import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, redirectToLogin, redirectToPath } from 'next-firebase-auth-edge'
import { clientConfig, serverConfig } from './firebase-config'

const PUBLIC_PATHS = ['/', '/register', '/login', '/reset-password', '/change-password']

export async function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  // Check if the requested path is '/change-password' and 'oobCode' is present in the query parameters
  if (request.nextUrl.pathname === '/change-password') {
    if (!searchParams.has('oobCode')) {
      // If 'oobCode' is not present, redirect to an error page or another page
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToPath(request, '/home')
      }

      return NextResponse.next({
        request: {
          headers,
        },
      })
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
  })
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
}
