import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Provider from '@components/Provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'

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
  const session = getServerSession(authOptions)
  console.log(session)

  return (
    <html lang='en'>
      <body className={urbanist.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  )
}
