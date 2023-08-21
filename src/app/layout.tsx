import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Provider from '@components/Provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import Theme from '@components/ThemeProvider'

const urbanist = Urbanist({ subsets: ['latin'], weight: ['200', '300', '400'] })

export const metadata: Metadata = {
  title: 'Bible Recall',
  description: "Memorize, Meditate, Connect with God's Word",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={urbanist.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}
