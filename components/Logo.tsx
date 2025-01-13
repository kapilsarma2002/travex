'use client'

export function TravexLogo() {
  return (
    <div className="flex items-center justify-center space-x select-none gap-1">
      <div className="relative w-8 h-8">
        {/* Outer gradient circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-800 to-black dark:from-gray-200 dark:via-gray-300 dark:to-gray-500 rounded-full opacity-70"></div>

        {/* Middle circle */}
        <div className="absolute inset-1 bg-gray-100 dark:bg-gray-900 rounded-full"></div>

        {/* Inner circle with ping animation */}
        <div className="absolute inset-2 border-2 border-black dark:border-gray-200 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <span className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-200 dark:from-gray-200 dark:to-gray-400">
        Travex
      </span>
    </div>
  )
}

export function Logo() {
  return (
    <div className="flex items-center justify-center space-x select-none gap-1">
      <div className="relative w-8 h-8">
        {/* Outer gradient circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-800 to-black dark:from-gray-200 dark:via-gray-300 dark:to-gray-500 rounded-full opacity-70"></div>

        {/* Middle circle */}
        <div className="absolute inset-1 bg-gray-100 dark:bg-gray-900 rounded-full"></div>

        {/* Inner circle with ping animation */}
        <div className="absolute inset-2 border-2 border-black dark:border-gray-200 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  )
}