import { prisma } from "@/utils/db"
import { getUserByClerkId } from "@/utils/auth"
import Editor from "@/components/Editor"
import { notFound } from "next/navigation"

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.trip.findFirst({
    where: {
      id,
      userId: user.id,
    },
  })
  
  if (!entry) {
    return notFound()
  }

  return entry
}

export default async function TripPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Worth', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Stress level', value: '' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen p-4 sm:p-6 lg:p-8">
          {/* Main content area */}
          <div className="col-span-1 lg:col-span-2 h-full">
            <div className="bg-neutral-100 dark:bg-zinc-900 rounded-xl shadow-sm p-6 h-full">
              <Editor entry={entry} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 lg:sticky lg:top-6 space-y-6 h-fit">
            <div className="bg-neutral-100 dark:bg-zinc-900 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Analysis</h2>
              <div>
                <ul>
                  {analysisData.map((data, index) => (
                    <li key={index} className="flex justify-between py-2">
                      <span>{data.name}</span>
                      <span>{data.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}