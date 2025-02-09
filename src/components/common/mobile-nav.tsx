'use client'

import cn from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { Users, Book, Plus, User, Search } from 'lucide-react'
import { VerseSelector } from '@components/verse/VerseSelector'
import { api } from '@lib/trpc/client'
import { ConditionalLink } from '@components/ui/conditional-link'

const navItems = [
  { name: 'Community', href: '/community', icon: Users, disabled: true },
  { name: 'Verses', href: '/home/verses', icon: Book },
  { name: 'Add Verse', href: null, icon: Plus },
  { name: 'Search', href: '/home', icon: Search },
  { name: 'Profile', href: '/home/settings', icon: User },
]

export default function MobileNav() {
  const pathname = usePathname()
  const addMutation = api.verse.add.useMutation()
  const router = useRouter()

  return (
    <>
      <div className='fixed bottom-4 left-4 right-4 z-50 centered'>
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
                  {isActive && <div className='absolute -top-[6px] left-0 right-0 h-0.5 bg-accent-foreground' />}
                  <div className={cn({ 'bg-muted centered rounded-lg p-2 hover:bg-primary': isAddVerse })}>
                    {isAddVerse ? (
                      <VerseSelector
                        submitVerse={addMutation.mutate}
                        onSuccess={() => router.push('/home/verses')}
                      >
                        <item.icon className={cn('w-6 h-6', { 'text-muted-foreground': isAddVerse })} />
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
