import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { GoDotFill } from "react-icons/go";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Enrollment vs Targets chart";

const chartData = [
  { program: "Residential Care", target: 186, actual: 80 },
  { program: "Health Post", target: 237, actual: 120 },
  { program: "Ifashe Tugufashe", target: 73, actual: 190 },
  { program: "Internship", target: 214, actual: 140 },
];

const chartConfig = {
  target: {
    label: "Target",
    color: "#0F3D2E",
  },
  actual: {
    label: "Actual",
    color: "#4DA3FF",
  },
} satisfies ChartConfig;

export function EnrolementVSTargetChart() {
  // 🔹 Get the highest value from the data
  const maxValue = Math.max(
    ...chartData.flatMap((item) => [item.target, item.actual]),
  );

  // 🔹 Round up for cleaner Y-axis
  const yAxisMax = Math.ceil(maxValue / 50) * 50;

  return (
    <Card className="md:mx-0 mx-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <h1>Enrollment vs Targets</h1>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <GoDotFill size={20} color="#0F3D2E" />
              <span>Target</span>
            </div>

            <div className="flex items-center gap-1">
              <GoDotFill size={20} color="#4DA3FF" />
              <span>Actual</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="program"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 20)}
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

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar dataKey="target" fill="#0F3D2E" radius={4} />
            <Bar dataKey="actual" fill="#4DA3FF" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
