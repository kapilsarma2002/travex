import { cn } from "@/utils/cn"
import { motion } from "framer-motion"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ 
  label, 
  error, 
  className,
  ...props 
}: InputProps) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "block w-full px-4 py-2 rounded-lg",
          "border border-gray-300 dark:border-gray-700",
          "bg-neutral-100 dark:bg-black/20",
          "text-gray-900 dark:text-gray-100",
          "placeholder-gray-400 dark:placeholder-gray-500",
          "focus:ring-blue-500",
          "transition-colors duration-200",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </motion.div>
  )
}