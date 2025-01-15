'use client'
import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/SideBar'
import {
  IconGraph,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react'
import { TravexLogo, Logo } from '@/components/Logo'
import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from '@/components/Theme'

export function Dashboard({ children }: { children: React.ReactNode }) {

  const links = [
    {
      label: 'Dashboard',
      href: '/trip',
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'History',
      href: '/history',
      icon: (
        <IconGraph className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ]
  const [open, setOpen] = useState(false)
  return (
    <div
      className={
        'h-screen w-screen flex flex-col md:flex-row flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden'
      }
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <TravexLogo /> : <Logo />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4 justify-between items-start'>
            <ThemeSwitcher />
            <UserButton />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="h-full w-full z-10 overflow-y-auto">{children}</div>
    </div>
  )
}

export default Dashboard
