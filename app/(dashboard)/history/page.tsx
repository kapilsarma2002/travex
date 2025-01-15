import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.tripAnalysis.findMany({
    where: {
      trip: {
        userId: user.id
      }
    }
  })
}

const History = () => {
  return (
    <div>
      <h1>History</h1>
    </div>
  );
}

export default History;