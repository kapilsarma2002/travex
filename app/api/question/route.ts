import { qa } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const { question } = await req.json()
  const user = await getUserByClerkId()

  const entries = await prisma.trip.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      title: true,
      budget: true,
      destination: true,
      startDate: true,
      endDate: true,
      experience: true
    }
  })

  const answer = await qa(question, entries)

  return NextResponse.json({ data: answer })
}