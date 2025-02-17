import { Users, Book, Plus, User, Search, LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export type NavItem = {
  name: string
  href: string | null
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  disabled?: boolean
}

export const navItems = [
  { name: 'Verses', href: '/home/verses', icon: Book },
  { name: 'Search', href: '/home', icon: Search },
  { name: 'Add Verse', href: null, icon: Plus },
  { name: 'Community', href: '/community', icon: Users, disabled: true },
  { name: 'Profile', href: '/home/profile', icon: User },
]
