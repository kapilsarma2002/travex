import TopBar from '@/components/TopBar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-black/95 text-white">
      <div className="sticky top-0 z-50 w-full md:w-[85%] lg:w-[75%] mx-auto">
        <div className="w-full h-full" style={{ 
          borderBottom: '1px solid', 
          borderImage: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent 80%, transparent 100%) 1' 
        }}>
          <TopBar />
        </div>
      </div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 font-bold">
            The best journal app, for your travel.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 my-2 md:my-4">
            A digital diary that combines mood tracking with travel documentation.
            Users log their trips, experiences, and daily events while rating
            their emotions to visualize how different journeys affect their
            well-being.
          </p>
          <div className="mt-4 md:mt-6">
            <Link href={'/sign-up'}>
              <button className="w-full sm:w-auto bg-white/80 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-md sm:text-md font-semibold hover:bg-white duration-1000">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
