import { cn } from "@/utils/cn"
import { motion, HTMLMotionProps } from "framer-motion"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'default' | 'outline'
  isLoading?: boolean
}

export const Button = ({ 
  className, 
  variant = 'default',
  isLoading,
  children,
  ...props 
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-4 py-2 rounded-lg font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        variant === 'default' && "bg-blue-600 text-white hover:bg-blue-700",
        variant === 'outline' && "border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {children}
    </motion.button>
  )
}