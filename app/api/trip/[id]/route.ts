import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }) => {
  try {
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

    if (experience) {
      const analysis = await analyze(experience)
      await prisma.tripAnalysis.upsert({
        where: { 
          tripId: updatedEntry.id 
        },
        update: {
           ...analysis 
        },
        create: {
          tripId: updatedEntry.id,
          ...analysis
        }
      })
    }

    return NextResponse.json({ data: updatedEntry })
    
  } catch (error) {
    console.error('Trip update failed:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update trip' },
      { status: 500 }
    )
  }
}