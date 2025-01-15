'use client'

import { TripAnalysis } from '@prisma/client'
import { useAnalysis } from './AnalysisContext'

export function Analysis(initialAnalysis: TripAnalysis ) {
  let { analysis } = useAnalysis()

  if (!analysis) {
    analysis = initialAnalysis
  }
  const analysisData = [
    { name: 'Mood', value: analysis.overallMood },
    { name: 'Worth', value: analysis.worth },
    { name: 'Stress level', value: analysis.stressLevel },
  ]

  return (
    <div className='rounded-xl shadow-sm p-6' style={{ backgroundColor: analysis.color }}>
      <h2 className="text-lg font-semibold mb-4">Analysis</h2>
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Summary</h3>
          <p className="text-sm leading-relaxed">{analysis.summary}</p>
        </div>

        <ul className="space-y-2">
          {analysisData.map((data, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-t border-black/10">
              <span className="font-medium">{data.name}</span>
              <span>{data.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}