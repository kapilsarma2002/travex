'use client'

export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import WorldMap from '@/components/WorldMap'

export default function MapPage() {
  const [places, setPlaces] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch('/api/map')
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const data = await res.json()
        setPlaces(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
        setPlaces([])
      }
    }
    fetchDestinations()
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <WorldMap places={places} />
    </div>
  )
}