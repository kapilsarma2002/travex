'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from "@/utils/cn"
import { Check } from 'lucide-react'

const Select = SelectPrimitive.Root

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between px-4 py-2 rounded-lg",
      "border border-gray-300 dark:border-gray-700",
      "bg-neutral-100 dark:bg-black/20",
      "text-gray-900 dark:text-gray-100",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "focus:ring-blue-500 focus:border-transparent",
      "transition-colors duration-200",
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-lg",
        "bg-neutral-100/90 dark:bg-black/90",
        "backdrop-blur-sm backdrop-saturate-150",
        "border border-gray-300 dark:border-gray-700",
        "shadow-lg",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-md",
      "py-1.5 pl-8 pr-2 text-sm",
      "text-gray-900 dark:text-gray-100",
      "hover:bg-neutral-200/50 dark:hover:bg-zinc-800/50",
      "focus:bg-neutral-200/50 dark:focus:bg-zinc-800/50",
      "outline-none transition-colors",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectValue = SelectPrimitive.Value

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
}