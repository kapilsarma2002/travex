'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { format } from 'date-fns'

const formatDate = (dateStr: string | number | Date) => {
  return format(new Date(dateStr), 'MMM d')
}

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.overallMood}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <XAxis
          dataKey="createdAt"
          tickFormatter={formatDate}
          interval="preserveEnd"
        />
        <YAxis />
        <CartesianGrid 
          stroke="currentColor" 
          strokeOpacity={0.2}
          strokeDasharray="5 5" 
          className="dark:stroke-zinc-400" 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        {/* <Line
          type="monotone"
          dataKey="stressLevel"
          stroke="#FF0000"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
