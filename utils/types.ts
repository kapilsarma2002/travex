export type TripStatus = 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'

export const Currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' }
]; 

export type TripData = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  title: string
  description: string | null
  experience: string | null
  destination: string
  startDate: Date
  endDate: Date
  status: TripStatus
  budget: number | null
  currency: string
  userId?: string
}