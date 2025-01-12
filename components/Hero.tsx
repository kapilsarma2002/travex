'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'

export default function LandingPageText({
  title,
  description
}: {
  title: string,
  description: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <motion.h1
        ref={ref}
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 font-bold"
      >
        {title}
      </motion.h1>
      <motion.p
        ref={ref}
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="text-base sm:text-lg md:text-xl text-white/70 my-2 md:my-4"
      >
        {description}
      </motion.p>
      <div className="mt-4 md:mt-6">
        <Link href={'/sign-up'}>
        <div className="relative group rounded-xl inline-block p-[1.3px] overflow-hidden">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#52525B_0%,#D4D4D8_50%,#52525B_100%)] group-hover:animate-none" />
          <button className="relative w-full sm:w-auto backdrop-blur-2xl rounded-xl bg-white/30 text-black px-3 py-1.5 sm:px-6 sm:py-3 text-md sm:text-md font-semibold hover:bg-white/80 duration-700 group-hover:scale-100">
            Get started
          </button>
        </div>
        </Link>
      </div>
    </div>
  )
}
