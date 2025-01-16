import { Suspense } from 'react'
import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import WorldMap from '@/components/WorldMap'
import { formatPlaces } from '@/utils/ai'
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Place {
  id: string
  destination: string
  startDate: Date
  corrected?: boolean
}

export default async function MapPage() {
  // 1) Server-side data fetch
  const user = await getUserByClerkId()
  let formattedPlaces;
  const destinations = await prisma.trip.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      destination: true,
      startDate: true,
    },
    orderBy: { startDate: 'desc' },
  })

  if (destinations.length) {
    formattedPlaces = await formatPlaces(destinations)

    await Promise.all(
      formattedPlaces
        .filter((place: Place) => place.corrected)
        .map((place: Place) =>
          prisma.trip.update({
            where: { id: place.id },
            data: {
              destination: place.destination,
            },
          })
        )
    )
  }

  // 2) Render a server component that includes a Suspense boundary
  return (
    <main className="w-full h-[calc(100vh-4rem)]">
      <Suspense fallback={<div>Loading map…</div>}>
        {/*
          3) Pass `places` to the client component.
          No `dynamic()` with `{ ssr: false }` is needed.
        */}
        <WorldMap places={formattedPlaces} />
      </Suspense>
    </main>
  )
}
