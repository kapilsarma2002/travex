import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await getUserByClerkId();
    const body = await request.json();

    const entry = await prisma.trip.create({
      data: {
        userId: user.id,
        title: body.title,
        description: body.description,
        destination: body.destination,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: body.status,
        budget: body.budget,
        currency: body.currency,
      }
    });

    revalidatePath('/trip');

    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to create trip: ${error}` }, { status: 500 });
  }
}