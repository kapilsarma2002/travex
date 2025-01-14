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
import { useState } from 'react'
import { createNewEntry } from '@/utils/api'
import { TripStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters").max(50),
  description: z.string().optional(),
  destination: z.string().min(4, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.nativeEnum(TripStatus, {
    required_error: "Status is required"
  }),
  budget: z.union([
    z.number(),
    z.string().transform((val) => (val === '' ? null : Number(val)))
  ]).nullable().optional(),
  currency: z.string().min(1, "Currency is required"),
})

export default function TripForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      destination: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: 'PLANNED',
      budget: null,
      currency: 'USD',
    },
  })

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const onSubmit = async (data: FormValues) => {
    event?.preventDefault()
    try {
      setLoading(true)
      
      const tripData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        description: data.description ?? null,
        budget: data.budget ?? null,
        experience: null,
      }

      setLoading(false)
      
      const res = await createNewEntry(tripData)
      console.log('New trip created:', res)

      router.push(`/trip/${res.id}`)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
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
                <Input 
                  placeholder="Enter trip title" 
                  {...field}
                  value={field.value || ''} 
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.title && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.title.message}
                  </span>
                )}
              </FormMessage>
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
              <FormLabel>Description (Optional)</FormLabel>
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
              <FormMessage>
                {form.formState.errors.destination && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.destination.message}
                  </span>
                )}
              </FormMessage>
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
            <FormLabel>Estimated Budget (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter budget" 
                {...field}
                value={field.value || ''} 
                onKeyPress={(e) => {
                  if (!/[0-9.]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers and one decimal point
                  const sanitizedValue = value.replace(/[^0-9.]/g, '');
                  // Ensure only one decimal point
                  const parts = sanitizedValue.split('.');
                  const finalValue = parts[0] + (parts[1] ? '.' + parts[1] : '');
                  
                  field.onChange(finalValue === '' ? null : Number(finalValue));
                }}
              />
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
        <Button 
          type="button"
          variant="outline" 
          onClick={() => form.reset()}
          disabled={loading}
        >
          Reset
        </Button>
        <Button 
          type="submit"
          isLoading={!form.formState.isValid || loading || Object.keys(form.formState.errors).length > 0}
          className="cursor-pointer"
        >
          {loading ? 'Creating...' : 'Create Trip'}
        </Button>
      </motion.div>
    </form>
  )
}
