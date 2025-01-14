'use client'

import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const NewTripCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    router.push(`/trip/new`)
  }

  return (
    <div
      className="h-[150px] rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow duration-200 bg-neutral-100 dark:bg-black flex flex-col items-center justify-center gap-2"
      onClick={handleOnClick}
    >
      <div className="text-xl font-medium text-gray-600 dark:text-gray-400">
        Plan New Trip
      </div>
      <IconPlus size={24} className="mb-2 text-gray-600 dark:text-gray-400" />
    </div>
  )
}

export default NewTripCard
