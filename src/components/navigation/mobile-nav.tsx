'use client'

import { cn } from '@components/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { VerseSelector } from '@components/verse/VerseSelector'
import { ConditionalLink } from '@components/ui/conditional-link'
import { addVerse } from 'src/server/routers/verse'
import { navItems } from './common'

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 z-50 centered block md:hidden bg-gradient-to-b from-transparent to-30% to-background px-4 pb-4'>
        <nav className='bg-background border rounded-2xl shadow-lg relative overflow-hidden w-full max-w-screen-md'>
          <div className='flex justify-around items-center h-16'>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const isAddVerse = item.name === 'Add Verse'
              return (
                <ConditionalLink
                  key={item.name}
                  href={item.href}
                  className={cn('flex flex-col items-center justify-center py-1 px-2 relative transition-colors', {
                    'text-muted-foreground': isActive,
                    'text-muted-foreground hover:text-muted-foreground/50': !isActive,
                    'opacity-50 pointer-events-none': item.disabled,
                  })}
                >
                  {isActive && <div className='absolute -top-[6px] left-0 right-0 h-0.5 bg-primary' />}
                  <div className={cn({ 'bg-primary centered rounded-lg p-2 hover:bg-primary/70': isAddVerse })}>
                    {isAddVerse ? (
                      <VerseSelector
                        submitVerse={addVerse}
                        onSuccess={() => router.push('/home/verses')}
                      >
                        <item.icon className={cn('w-6 h-6', { 'text-primary-foreground': isAddVerse })} />
                      </VerseSelector>
                    ) : (
                      <item.icon className={cn('w-6 h-6')} />
                    )}
                  </div>
                  {!isAddVerse && <span className='text-xs mt-1'>{item.name}</span>}
                </ConditionalLink>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
