import Link from "next/link"

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black/95 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl mb-4 md:mb-8">The best journal app, for your travel.</h1>
        <p className="text-xl text-white/70 my-2 md:my-4">A digital diary that combines mood tracking with travel documentation. Users log their trips, experiences, and daily events while rating their emotions to visualize how different journeys affect their well-being.</p>
        <div className="mt-4 md:mt-6">
          <Link href={'/journal'}>
            <button className="bg-white/90 text-black px-4 py-2 rounded-lg text-md">Get started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
