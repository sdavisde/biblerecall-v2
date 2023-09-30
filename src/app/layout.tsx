import type { Metadata } from 'next'
import './globals.css'
import { Urbanist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const urbanist = Urbanist({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500'] })

export const metadata: Metadata = {
  title: 'Bible Recall',
  description: "Memorize, Meditate, Connect with God's Word",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={urbanist.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
