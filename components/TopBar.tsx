'use client'

import { useState } from 'react'
import Link from 'next/link'
import TravexLogo from './Logo'
import NavBar from './Nav'

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center p-3 sm:p-4 md:p-6">
        <div className="flex items-center">
          <TravexLogo />
        </div>

        <div className="hidden sm:block">
          <NavBar />
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <Link href={'/sign-in'}>
            <button className="text-white hover:text-white/70 duration-1000 text-base">
              Login
            </button>
          </Link>
          <Link href={'/sign-up'}>
            <button className="bg-white/80 text-black py-2 px-3 rounded-lg text-base font-semibold hover:bg-white duration-1000">
              Sign up
            </button>
          </Link>
        </div>

        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-white/70 hover:text-white"
          >
            ☰
          </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 py-4 px-3 space-y-4 sm:hidden">
          <Link href={'/sign-in'} className="block">
            <button className="w-full text-white hover:text-white/70 duration-700 text-sm py-2">
              Login
            </button>
          </Link>
          <Link href={'/sign-up'} className="block">
            <button className="w-full bg-white/80 text-black py-2 px-3 rounded-lg text-sm font-semibold hover:bg-white duration-700">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}