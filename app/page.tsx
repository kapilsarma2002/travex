import TopBar from '@/components/TopBar'
import LandingPageText from '@/components/Hero'
export default function LandingPage() {

  const title = 'The best journal app, for your travel.'
  const description = 'A digital diary that combines mood tracking with travel documentation. Users log their trips, experiences, and daily events while rating their emotions to visualize how different journeys affect their well-being.'

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
        <LandingPageText title={title} description={description} />
      </div>
    </div>
  )
}