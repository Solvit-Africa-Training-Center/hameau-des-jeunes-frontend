"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { GoDotFill } from "react-icons/go";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", revenue: 186, expense: 80 },
  { month: "February", revenue: 305, expense: 200 },
  { month: "March", revenue: 237, expense: 120 },
  { month: "April", revenue: 73, expense: 190 },
  { month: "May", revenue: 209, expense: 130 },
  { month: "June", revenue: 214, expense: 140 },
  { month: "July", revenue: 186, expense: 80 },
  { month: "August", revenue: 305, expense: 200 },
  { month: "September", revenue: 237, expense: 120 },
  { month: "October", revenue: 73, expense: 190 },
  { month: "November", revenue: 209, expense: 130 },
  { month: "December", revenue: 214, expense: 140 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#F4B400",
  },
  expense: {
    label: "Expense",
    color: "#0F3D2E",
  },
} satisfies ChartConfig;

export function RepenseVsExpensesChart() {
  // 🔹 Get the highest value from the data
  const maxValue = Math.max(
    ...chartData.flatMap((item) => [item.revenue, item.expense]),
  );

  // 🔹 Round up for cleaner Y-axis
  const yAxisMax = Math.ceil(maxValue / 50) * 50;
  return (
    <Card className="md:mx-0 mx-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <h1>Revenue vs Expense</h1>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <GoDotFill size={20} color="#F4B400" />
              <span>Revenue</span>
            </div>

            <div className="flex items-center gap-1">
              <GoDotFill size={20} color="#0F3D2E" />
              <span>Expense</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              domain={[0, yAxisMax]}
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickCount={6}
              allowDecimals={false}
              width={30}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="#F4B400"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="#0F3D2E"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
