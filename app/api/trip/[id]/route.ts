import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  const { experience } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.trip.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      experience
    }
  })

  return NextResponse.json({data: updatedEntry})
}