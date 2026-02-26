"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { ageGap: "0-5 yrs", children: 186 },
  { ageGap: "6-12 yrs", children: 305 },
  { ageGap: "13-18 yrs", children: 237 },
  { ageGap: "18+ yrs", children: 73 },
];

const chartConfig = {
  children: {
    label: "Children",
    color: "#0F3D2E",
  },
} satisfies ChartConfig;

export function BeneficiaryDemographics() {
  // 🔹 Find max value from data
  const maxValue = Math.max(...chartData.map((item) => item.children));

  // 🔹 Round up for clean Y-axis
  const yAxisMax = Math.ceil(maxValue / 50) * 50;

  return (
    <Card className="md:mx-0 mx-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <h1>Beneficiary Demographics</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 30 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="ageGap"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
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
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="children" fill="#0F3D2E" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
