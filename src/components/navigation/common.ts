import { Users, Book, Plus, User, Search, LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export type NavItem = {
  name: string
  href: string | null
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  disabled?: boolean
}

export const navItems = [
  { name: 'Verses', href: '/x/verses', icon: Book },
  { name: 'Search', href: '/x/home', icon: Search },
  { name: 'Add Verse', href: null, icon: Plus },
  { name: 'Community', href: '/x/community', icon: Users },
  { name: 'Profile', href: '/x/profile', icon: User },
]
