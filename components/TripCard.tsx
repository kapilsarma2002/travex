import { TripData } from '@/utils/types'

interface TripCardProps {
  trip: TripData
}

const statusColors = {
  PLANNED:   'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  ONGOING:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <div className="h-[150px] rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow duration-200 dark:bg-black/20">
      <div className="flex justify-between items-start mb-2">
        <h3
          className="text-xl font-semibold truncate max-w-[60%]"
          title={trip.title}
        >
          {trip.title}
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 h-12">
        {trip.destination}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            statusColors[trip.status]
          }`}
        >
          {trip.status.toLowerCase()}
        </span>
        <span className="text-sm font-medium">
          {trip.budget} {trip.currency}
        </span>
      </div>
    </div>
  )
}

export default TripCard