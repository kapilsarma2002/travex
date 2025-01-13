import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import NewTripCard from '@/components/NewTripCard'
import TripCard from '@/components/TripCard'
import Link from 'next/link'

const getTrips = async () => {
  const user = await getUserByClerkId()
  const trips = await prisma.trip.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return trips
}

const DashboardPage = async () => {
  const trips = await getTrips()

  return (
    <div className="h-full w-full dark:text-white dark:bg-zinc-900 text-black bg-white p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 md:mb-8">
        My Trips
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <NewTripCard />
        {trips.map((trip) => (
          <Link key={trip.id} href={`/trip/${trip.id}`}>
            <TripCard trip={trip} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
