'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'

interface Place {
  id: string
  destination: string
  startDate: string
  coordinates?: { lat: number; lng: number }
}

const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C7.802 0 4.4 3.402 4.4 7.6C4.4 11.798 12 24 12 24C12 24 19.6 11.798 19.6 7.6C19.6 3.402 16.198 0 12 0ZM12 10.4C10.454 10.4 9.2 9.146 9.2 7.6C9.2 6.054 10.454 4.8 12 4.8C13.546 4.8 14.8 6.054 14.8 7.6C14.8 9.146 13.546 10.4 12 10.4Z" 
        fill="black"
        filter="drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))"
      />
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
  className: 'transition-transform hover:scale-125'
})

export default function WorldMap({ places }: { places: Place[] }) {
  const [locations, setLocations] = useState<Place[]>([])

  useEffect(() => {
    if (!places?.length) return

    async function geocode() {
      const results = await Promise.all(
        places.map(async p => {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(p.destination)}&format=json&limit=1`
          )
          const data = await res.json()
          return {
            ...p,
            coordinates: data?.[0]
              ? { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
              : undefined
          }
        })
      )
      setLocations(results.filter(r => r.coordinates))
    }
    geocode()
  }, [places])

  if (!locations.length) return <div className='h-full w-full flex items-center justify-center'>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-4 h-4 border-2 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full my-2"
    />
  </div>

  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map(loc => (
        loc.coordinates && (
          <Marker key={loc.id} icon={customIcon} position={[loc.coordinates.lat, loc.coordinates.lng]}>
            <Popup>
              {loc.destination}
              <br />
              {new Date(loc.startDate).toLocaleDateString()}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  )
}