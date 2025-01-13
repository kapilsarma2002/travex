import { TripData } from '@/utils/types'

interface TripCardProps {
  trip: TripData
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <div className="rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow duration-200 dark:bg-black/20">
      <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{trip.destination}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{trip.status}</span>
        <span className="text-sm font-medium">
          {trip.budget} {trip.currency}
        </span>
      </div>
    </div>
  )
}

export default TripCard