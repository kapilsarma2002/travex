import WorldMap from "@/components/WorldMap"
import { formatPlaces } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

interface Place {
  id: string
  destination: string
  startDate: Date
  corrected?: boolean
}

async function getDestinations() {
  try {
    const user = await getUserByClerkId()
    const destinations = await prisma.trip.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        destination: true,
        startDate: true,
      },
      orderBy: {
        startDate: 'desc',
      },
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

    return destinations
  } catch (error) {
    console.error('Failed to fetch destinations:', error)
    return []
  }
}

const Map = async() => {
  
  const places = await getDestinations()

  return (
    <div>
      <WorldMap places={places} />
    </div>
  )
}

export default Map