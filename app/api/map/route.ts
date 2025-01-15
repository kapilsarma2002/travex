import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { formatPlaces } from '@/utils/ai'

interface Place {
  id: string
  destination: string
  startDate: Date
  corrected?: boolean
}

export async function GET() {
  try {
    const user = await getUserByClerkId()
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
      const formattedPlaces = await formatPlaces(destinations)

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

    return NextResponse.json(destinations)
  } catch (error) {
    console.error('Failed to fetch destinations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    )
  }
}
