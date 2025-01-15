'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Trip } from '@prisma/client'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'
import { useAnalysis } from './AnalysisContext'

const statusColors = {
  PLANNED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  ONGOING:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  COMPLETED:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

export default function Editor({ entry }: { entry: Trip }) {
  const [value, setValue] = useState(entry.experience ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const initialValue = useRef(entry.experience ?? '')
  const { setAnalysis } = useAnalysis()

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    setIsModified(newValue !== initialValue.current)
  }
  
  useAutosave({
    data: value,
    interval: 5000,
    onSave: async (_value) => {
      if (!isModified) return


      setIsSaving(true)
      const updatedEntry = await updateEntry(entry.id, _value)
      if (updatedEntry?.analysis) {
        setAnalysis(updatedEntry.analysis)
      }
      setIsSaving(false)
    },
  })

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{entry.title}</h1>

        <div className="flex items-center justify-between mb-2">
          <p className="text-md text-gray-500 dark:text-gray-400">
            {entry.description ?? ''}
          </p>
          <span
            className={`text-sm px-2.5 py-1 rounded-full font-medium ${
              statusColors[entry.status]
            }`}
          >
            {entry.status.toLowerCase()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">{entry.destination}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {format(new Date(entry.startDate), 'MMM dd, yyyy')} -{' '}
            {format(new Date(entry.endDate), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-100 dark:bg-zinc-900 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="m-2 text-lg font-semibold">
              Describe your experience of this trip
            </div>
            {isSaving && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full my-2"
              />
            )}
          </div>
          <textarea
            value={value}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg dark:bg-zinc-950 dark:border-zinc-700 focus:outline-none"
            rows={24}
          />
        </motion.div>
      </div>
    </div>
  )
}
