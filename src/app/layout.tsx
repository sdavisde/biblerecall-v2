import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Theme from '@components/verse/ThemeProvider'

const urbanist = Urbanist({ subsets: ['latin'], weight: ['200', '300', '400'] })

export const metadata: Metadata = {
  title: 'Bible Recall',
  description: "Memorize, Meditate, Connect with God's Word",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={urbanist.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}
