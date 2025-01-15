'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { getCoordinates } from '@/utils/geocode'
import { format } from 'date-fns'
import 'leaflet/dist/leaflet.css'

interface Place {
  id: string
  startDate: Date
  destination: string
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

export default function Map({ places }: { places: Place[] }) {
  const [locations, setLocations] = useState<Place[]>([])

  useEffect(() => {
    const getLocations = async () => {
      const withCoordinates = await Promise.all(
        places.map(async (place) => {
          const coords = await getCoordinates(place.destination)
          return { ...place, coordinates: coords || undefined }
        })
      )
      setLocations(withCoordinates.filter(loc => loc.coordinates))
    }
    
    getLocations()
  }, [places])

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map(location => (
          location.coordinates && (
            <Marker 
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-3 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">
                    {location.destination}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(location.startDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  )
}