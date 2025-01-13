export type TripStatus = 'PLANNED' | 'ONGOING' | 'COMPLETED'

export type TripData = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string | null
  destination: string
  startDate: Date
  endDate: Date
  status: TripStatus
  budget: number | null
  currency: string
  userId: string
}