import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.tripAnalysis.findMany({
    where: {
      trip: {
        userId: user.id
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const sum = analyses.reduce((all, cur) => all + cur.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)

  return {analyses, avg}
}

const History = async () => {

  const {analyses, avg} = await getData()
  console.log(analyses, avg)
  return (
    <div className="h-screen w-full">
      {/* <h1>{`Avg. Sentiment ${avg}`}</h1> */}
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
}

export default History;