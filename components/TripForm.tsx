'use client'

import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'
import { Currencies } from '@/utils/types'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  destination: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  status: z.string(),
  budget: z.number().optional(),
  currency: z.string(),
})

export default function TripForm() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'PLANNED',
      currency: 'USD',
    },
  })

  if (!mounted) {
    return null
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <form
      onSubmit={form.handleSubmit((data) => console.log(data))}
      className="space-y-6"
    >
      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter trip title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input placeholder="Enter destination" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="ONGOING">Ongoing</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter budget" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={item} className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Create Trip</Button>
      </motion.div>
    </form>
  )
}
