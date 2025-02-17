import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Urbanist, Rock_Salt, Satisfy } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SettingsProvider } from '@components/Settings/Provider'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import ThemeModal from '@components/theme/modal'
import { GearIcon } from '@radix-ui/react-icons'
import { ColorStyle } from '@components/theme/color-style'
import { createClient } from '@lib/supabase/server'
import { cache } from 'react'
import { getSettings } from 'src/server/routers/settings'
import { QueryProvider } from '@components/common/QueryClientProvider'

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
  themeColor: 'var(--primary)',
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: 'Bible Recall',
  description: "Memorize, Meditate, Connect with God's Word",
}

const getColors = cache(async () => {
  const supabase = await createClient()
  const colorsResult = await supabase.from('colors').select()
  const normalizedColors = colorsResult.data ?? []
  const rootColors = normalizedColors.filter((it) => it.theme !== 'dark')
  const darkColors = normalizedColors.filter((it) => it.theme === 'dark')
  return { rootColors, darkColors }
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const { rootColors, darkColors } = await getColors()

  return (
    <html
      lang='en'
      className={`bg-background text-foreground ${urbanist.variable} ${openDyslexic.variable} ${satisfy.variable} ${rockSalt.variable} font-satisfy font-rockSalt font-openDyslexic font-urbanist`}
      suppressHydrationWarning
    >
      <Head>
        <meta
          name='apple-mobile-web-app-title'
          content='Bible Recall'
        />
      </Head>
      <ColorStyle
        rootColors={rootColors}
        darkColors={darkColors}
      />
      {/* IMPORTANT: This body tag gets swapped out in `SettingsProvider`, but needs to be here so the server doesn't throw hydration errors */}
      <body suppressHydrationWarning>
        <ThemeProvider
          defaultTheme={settings?.theme}
          attribute='class'
        >
          <SettingsProvider authUserSettings={settings}>
            <QueryProvider>
              {!process.env.VERCEL_PROJECT_PRODUCTION_URL && (
                <ThemeModal>
                  <GearIcon
                    className='fixed bottom-4 right-4'
                    style={{ zIndex: 999 }}
                  />
                </ThemeModal>
              )}
              {children}
            </QueryProvider>
            <Analytics />
            <SpeedInsights />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
