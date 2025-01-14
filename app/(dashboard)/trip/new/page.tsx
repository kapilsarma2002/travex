import TripForm from '@/components/TripForm'

export default function NewTripPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create New Trip
        </h1>
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 sm:p-8 overflow-y-auto">
          <TripForm />
        </div>
      </div>
    </div>
  )
}