'use client'

import { cn } from '@components/lib/utils'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { NavItem, navItems } from './common'
import { Lodash } from '@util/lodash'
import { VerseSelector } from '@components/verse/VerseSelector'
import { addVerse } from 'src/server/routers/verse'
import { useRouter } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

export function DesktopNav() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null!)
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  const closeOnEscape = (event: KeyboardEvent) => (event.key === 'Escape' ? closeMenu() : {})
  useOnClickOutside(ref, closeMenu)
  useEventListener('keydown', closeOnEscape)

  return (
    <div
      className='absolute right-6 top-4 z-50 hidden md:block'
      ref={ref}
    >
      <button
        onClick={toggleMenu}
        className='flex h-10 w-10 items-center justify-center rounded-full text-foreground'
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='absolute right-1 top-16 flex flex-col items-end space-y-2'
          >
            {navItems.map((item, index) => (
              <MenuItem
                key={item.name}
                item={item}
                index={index}
                toggleMenu={toggleMenu}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuItem({ item, index, toggleMenu }: { item: NavItem; index: number; toggleMenu: () => void }) {
  const router = useRouter()

  const buttonContent = (
    <motion.div
      className='flex items-center space-x-2 group cursor-pointer'
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <span className='text-sm font-medium text-foreground'>{item.name}</span>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full shadow-md hover:opacity-70 hover:border hover:border-primary',
          {
            'bg-secondary text-secondary-foreground': !Lodash.isNil(item.href),
            'bg-primary text-primary-foreground': Lodash.isNil(item.href), // Using this to determine "add" button
          }
        )}
      >
        <item.icon size={20} />
      </div>
    </motion.div>
  )

  if (item.disabled) {
    return <div className='opacity-50 cursor-not-allowed'>{buttonContent}</div>
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={toggleMenu}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <VerseSelector
      submitVerse={addVerse}
      onSuccess={() => {
        router.push('/home/verses')
        toggleMenu()
      }}
    >
      {buttonContent}
    </VerseSelector>
  )
}
