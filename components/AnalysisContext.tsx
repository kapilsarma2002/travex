'use client'

import { createContext, useContext, ReactNode, useState } from 'react'
import { TripAnalysis } from '@prisma/client'

const AnalysisContext = createContext<{
  analysis: TripAnalysis | null
  setAnalysis: (analysis: TripAnalysis) => void
} | null>(null)

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysis, setAnalysis] = useState<TripAnalysis | null>(null)
  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export const useAnalysis = () => useContext(AnalysisContext)
