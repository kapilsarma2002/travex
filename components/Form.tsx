'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form"

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn('space-y-6', className)} {...props} />
))
Form.displayName = 'Form'

const FormItem = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('space-y-2', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    />
  )
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ ...props }, ref) => (
  <motion.div
    ref={ref}
    className="mt-2"
    whileTap={{ scale: 0.995 }}
    {...props}
  />
))
FormControl.displayName = 'FormControl'

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />
}
FormField.displayName = "FormField"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  HTMLMotionProps<'p'>
>(({ className, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn(
      'text-sm font-medium text-red-500 dark:text-red-400',
      className
    )}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    {...props}
  >
    {children}
  </motion.p>
))
FormMessage.displayName = 'FormMessage'

export { Form, FormItem, FormLabel, FormControl, FormField, FormMessage }
