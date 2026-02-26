import { Card, CardContent } from "../ui/card";

const statsCards = [
  {
    id: 1,
    title: "Reintegration",
    content: "84%",
    rate: "+5",
  },
  {
    id: 2,
    title: "School Attendance",
    content: "96.2%",
    rate: "+1.2",
  },
  {
    id: 3,
    title: "Healthcare Access",
    content: "100%",
    rate: "+0",
  },
  {
    id: 4,
    title: "Program Efficiency",
    content: "91.5%",
    rate: "-2",
  },
];

export const AnalyticsStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {statsCards.map((item) => {
        return (
          <Card
            key={item.id}
            className="md:w-full mx-5 md:mx-0 px-3 py-4 border border-none shadow-fuchsia-100"
          >
            {/* Main number */}
            <CardContent className="">
              <h1 className="text-xs sm:text-sm">{item.title}</h1>
              <div className="flex gap-1">
                <h1 className="font-bold text-2xl sm:text-3xl py-2">
                  {item.content}
                </h1>
                <h1
                  className={`mt-[22px] text-sm
                    ${Number(item.rate) > 0 ? "text-button-yellow" : "text-red-600"} `}
                >
                  {item.rate}%
                </h1>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
