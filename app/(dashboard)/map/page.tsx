'use client'

// Force dynamic to avoid SSR errors
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import WorldMap from '@/components/WorldMap'
import { getDestinations } from '@/utils/api'

export default function MapPage() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    async function fetchPlaces() {
      const res = await getDestinations()
      setPlaces(res)
    }
    
    fetchPlaces()
  }, [])

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <WorldMap places={places} />
    </div>
  )
}