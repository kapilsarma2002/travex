'use client'

import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const NewTripCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    router.push(`/trip/new`)
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative h-[150px] rounded-lg shadow-md p-4 cursor-pointer 
                 hover:shadow-xl transition-all duration-200 
                 bg-neutral-100 dark:bg-black 
                 flex flex-col items-center justify-center gap-2
                 overflow-hidden group"
      onClick={handleOnClick}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
                   bg-gradient-to-r from-transparent via-white/10 to-transparent
                   -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%]
                   transition-all duration-900 ease-in-out"
      />
      <div className="text-xl font-medium text-gray-600 dark:text-gray-400">
        Plan New Trip
      </div>
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <IconPlus size={24} className="mb-2 text-gray-600 dark:text-gray-400" />
      </motion.div>
    </motion.div>
  )
}

export default NewTripCard
