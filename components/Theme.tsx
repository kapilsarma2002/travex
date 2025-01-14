'use client'

import { useTheme } from 'next-themes'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useState, useEffect } from 'react'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="h-[30px] w-[30px]" />
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="h-[25px] w-[25px]"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <IconSun size={25} className="text-gray-200 hover:text-gray-400" />
      ) : (
        <IconMoon size={25} className="text-gray-800 hover:text-gray-600" />
      )}
    </button>
  )
}

export default ThemeSwitcher