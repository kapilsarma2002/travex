import { prisma } from "@/utils/db"
import { getUserByClerkId } from "@/utils/auth"
import Editor from "@/components/Editor"
import { notFound } from "next/navigation"
import { Analysis } from "@/components/Analysis"
import { AnalysisProvider } from "@/components/AnalysisContext"

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.trip.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    },
    include: {
      analysis: true
    }
  })
  
  if (!entry) {
    return notFound()
  }

  return entry
}

export default async function TripPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const entry = await getEntry(id)

  return (
    <AnalysisProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="col-span-1 lg:col-span-2 h-full">
              <Editor entry={entry} />
            </div>
            <div className="col-span-1 lg:sticky lg:top-6 space-y-6 h-fit">
              <Analysis {...entry.analysis} />
            </div>
          </div>
        </div>
      </div>
    </AnalysisProvider>
  )
}