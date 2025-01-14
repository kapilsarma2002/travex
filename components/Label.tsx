'use client'

import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface LabelProps extends HTMLMotionProps<'label'> {
  required?: boolean
  children: React.ReactNode
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <motion.label
        ref={ref}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'text-sm font-medium leading-none',
          'text-gray-700 dark:text-gray-300',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
    )
  }
)

Label.displayName = 'Label'

export { Label }