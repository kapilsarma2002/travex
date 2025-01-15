'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { askQuestion } from '@/utils/api'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    try {
      const { data } = await askQuestion(question)
      if (!data.answer) throw new Error('No answer received')
      setAnswer(data.answer)
      setQuestion('')
    } catch (error) {
      console.error('Failed to get answer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-[50px] grid grid-cols-3 gap-4 mb-8">
      <form onSubmit={handleSubmit} className="col-span-1 h-full flex flex-col mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about your trips..."
            className="w-full h-full p-4 pr-12 rounded-lg bg-neutral-100 dark:bg-zinc-950 
                     border border-transparent focus:border-blue-500 focus:outline-none
                     dark:text-white placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                     text-gray-500 hover:text-blue-500 disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full"
              />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
  
      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="col-span-2 h-full rounded-lg bg-white dark:bg-zinc-900 shadow-sm
                      p-4 lg:p-6 overflow-y-auto"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Question
