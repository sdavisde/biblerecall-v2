'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { logout } from '@lib/firebase'
import { api } from '@lib/trpc/client'
import { SignedInUser } from 'types/api'
import { LogOut, Settings, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import Link from 'next/link'

export function Profile() {
  const user = api.user.get.useQuery<SignedInUser>()

  if (user.isPending || !user.data) {
    return <></>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='centered cursor-pointer scale-75 border rounded-full'>
          <Avatar>
            <AvatarImage src={user.data.picture} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href='/home/settings'
              className='centered'
            >
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem disabled>
          <Cloud className='mr-2 h-4 w-4' />
          <span>API</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <button onClick={logout}>Log out</button>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
