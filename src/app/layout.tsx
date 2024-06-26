import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Urbanist, Rock_Salt, Satisfy } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { TRPCReactProvider } from '@lib/trpc/client'
import { SpeedInsights } from '@vercel/speed-insights/next'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--urbanist',
})
const satisfy = Satisfy({
  weight: '400',
  subsets: ['latin'],
  variable: '--satisfy',
})
const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  variable: '--rock-salt',
})

const openDyslexic = localFont({
  src: [
    {
      path: '../../public/fonts/OpenDyslexic-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenDyslexic-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/OpenDyslexic-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenDyslexic-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--open-dyslexic',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: '#81957f',
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: 'Bible Recall',
  description: "Memorize, Meditate, Connect with God's Word",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={`bg-lightGrey dark:bg-black text-black dark:text-white ${urbanist.variable} ${openDyslexic.variable} ${satisfy.variable} ${rockSalt.variable} font-satisfy font-rockSalt font-openDyslexic font-urbanist`}
      suppressHydrationWarning
    >
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Analytics />
      <SpeedInsights />
    </html>
  )
}
