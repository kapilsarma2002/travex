import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";

const getTrips = async () => {
  const user = await getUserByClerkId()
  const trips = await prisma.trip.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return trips
}

const DashboardPage = async () => {
  const trips = await getTrips()
  console.log('trips', trips)
  return (
    <div className="h-full w-full p-8 dark:text-white dark:bg-black/5 text-black bg-white">
      <div>dashboard</div>
    </div>
  );
}

export default DashboardPage;