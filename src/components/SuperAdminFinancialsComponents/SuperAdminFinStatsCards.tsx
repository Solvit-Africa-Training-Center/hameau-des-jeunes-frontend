import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { Card, CardContent, CardFooter } from "../ui/card";
import { BiDollar } from "react-icons/bi";

const statsCards = [
  {
    id: 1,
    title: "Monthly Revenue",
    content: "67,420",
    rate: "+12.5",
    icon: FiArrowUpRight,
  },
  {
    id: 2,
    title: "Total Expenses",
    content: "67,420",
    rate: "+4.2",
    icon: FiArrowDownRight,
  },
  {
    id: 3,
    title: "Current Balance",
    content: "684,500.20",
    icon: BiDollar,
  },
];

export const SuperAdminFinStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {statsCards.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.id}
            className={`md:w-full mx-5 md:mx-0 px-3 py-4 border border-none font-semibold shadow-fuchsia-100
                ${item.id === 3 ? "bg-[#0F3D2E] text-white" : ""}`}
          >
            {/* Main number */}

            <div className="">
              {/* Main content */}
              <CardContent className="">
                <div className="flex items-center justify-between">
                  <h1
                    className={`text-xs sm:text-sm 
                    ${item.id === 1 || item.id === 2 ? "text-[#979595]" : "text-white"}`}
                  >
                    {item.title}
                  </h1>

                  <div
                    className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${
                    item.id === 1
                      ? "bg-[#0F3D2E] text-white"
                      : item.id === 3
                        ? "bg-[#3F6458] text-white"
                        : item.id === 2
                          ? "bg-[#FFCACB] text-[#F56565]"
                          : "bg-[#C8E2FF] text-black"
                  }
                `}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div className="flex gap-1">
                  <h1 className="font-semibold text-xl sm:text-xl -mt-2">
                    {item.content}
                  </h1>
                </div>
              </CardContent>
            </div>

            {item.id === 1 || item.id === 2 ? (
              <CardFooter>
                {" "}
                <h1
                  className={`mt-[22px] text-sm
                    ${Number(item.rate) > 0 ? "text-[#0F3D2E]" : "text-red-600"} `}
                >
                  {item.rate}%{" "}
                  <span className="text-[#626363]">vs last month</span>
                </h1>
              </CardFooter>
            ) : (
              <div></div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
