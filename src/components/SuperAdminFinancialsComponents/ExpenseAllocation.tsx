"use client";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartData = [
  { browser: "residentialCare", expenses: 275, fill: "#0F3D2E" },
  { browser: "tweseHamwe", expenses: 200, fill: "#F4B400" },
  { browser: "healthPost", expenses: 187, fill: "#4DA3FF" },
  { browser: "internship", expenses: 173, fill: "#D5D5D5" },
];

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
  residentialCare: {
    label: "Residential Care",
    color: "#0F3D2E",
  },
  tweseHamwe: {
    label: "Twese Hamwe",
    color: "#F4B400",
  },
  healthPost: {
    label: "Health Post",
    color: "#4DA3FF",
  },
  internship: {
    label: "Internship",
    color: "#D5D5D5",
  },
} satisfies ChartConfig;

export function ExpenseAllocation() {
  // Calculate total expenses
  const totalExpenses = chartData.reduce((sum, item) => sum + item.expenses, 0);

  return (
    <Card className="flex flex-col md:mx-0 mx-5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Allocation</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="expenses"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-2 w-full">
          {chartData.map((item) => {
            const percentage = ((item.expenses / totalExpenses) * 100).toFixed(
              1,
            );
            const config =
              chartConfig[item.browser as keyof typeof chartConfig];

            return (
              <div key={item.browser} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-xs text-muted-foreground">
                  {config?.label}: {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
