'use client'
import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/SideBar'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react'
import Logo from '@/components/Logo'
import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from '@/components/Theme'

export function Dashboard({ children }: { children: React.ReactNode }) {

  const links = [
    {
      label: 'Dashboard',
      href: '#',
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Profile',
      href: '#',
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Settings',
      href: '#',
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
            {open ? <Logo /> : <LogoIcon />}
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
      <div className="h-full w-full z-10">{children}</div>
    </div>
  )
}

export const LogoIcon = () => {
  return (
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-800 to-black rounded-full opacity-70"></div>
      <div className="absolute inset-1 bg-gray-100 rounded-full"></div>
      <div className="absolute inset-2 border-2 border-black rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping"></div>
      </div>
    </div>
  )
}

export default Dashboard
