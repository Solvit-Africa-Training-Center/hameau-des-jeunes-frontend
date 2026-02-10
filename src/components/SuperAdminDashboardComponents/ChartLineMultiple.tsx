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
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 186, mobile: 80 },
  { month: "August", desktop: 305, mobile: 200 },
  { month: "September", desktop: 237, mobile: 120 },
  { month: "October", desktop: 73, mobile: 190 },
  { month: "November", desktop: 209, mobile: 130 },
  { month: "December", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Donations",
    color: "#000000",
  },
  mobile: {
    label: "Beneficiaries",
    color: "#4DA3FF",
  },
} satisfies ChartConfig;

export function ChartLineMultiple() {
  return (
    <Card className="md:w-[700px] md:mx-0 mx-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <h1>Program Performance</h1>
          <div className="flex items-center gap-5">
            <div className="flex gap-1">
              <GoDotFill /> <h1>Donations</h1>
            </div>

            <div className="flex gap-1">
              <GoDotFill color="#4DA3FF" /> <h1>Beneficiaries</h1>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <ChartContainer config={chartConfig} className="md:h-[200px] md:w-full">
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
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickCount={6}
              width={20}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
