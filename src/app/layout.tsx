import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Urbanist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const urbanist = Urbanist({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500'] })

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
      className='bg-lightGrey dark:bg-black text-black dark:text-white'
      suppressHydrationWarning
    >
      <body className={urbanist.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
