'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Users, Book, Plus, User, Search } from 'lucide-react'

const navItems = [
  { name: 'Community', href: '/community', icon: Users, disabled: true },
  { name: 'Verses', href: '/home/verses', icon: Book },
  { name: 'Add Verse', href: '/home/add-verse', icon: Plus },
  { name: 'Search', href: '/home', icon: Search },
  { name: 'Profile', href: '/home/settings', icon: User },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-4 left-4 right-4 z-50 centered'>
      <nav className='bg-background border rounded-2xl shadow-lg relative overflow-hidden w-full max-w-screen-md'>
        <div className='flex justify-around items-center h-16'>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isAddVerse = item.name === 'Add Verse'
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn('flex flex-col items-center justify-center py-1 px-2 relative transition-colors', {
                  'text-white': isActive,
                  'text-gray-400 hover:text-gray-200': !isActive,
                  'opacity-50 pointer-events-none': item.disabled,
                })}
              >
                {isActive && <div className='absolute -top-[6px] left-0 right-0 h-0.5 bg-accent-foreground' />}
                <div className={cn({ 'bg-green-500 rounded-lg p-2 hover:bg-primary': isAddVerse })}>
                  <item.icon className={cn('w-6 h-6', { 'text-white': isAddVerse })} />
                </div>
                {!isAddVerse && <span className='text-xs mt-1'>{item.name}</span>}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
