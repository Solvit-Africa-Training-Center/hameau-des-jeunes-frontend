import { LuClock4 } from "react-icons/lu";
import { Card, CardTitle } from "../ui/card";
import { BiMessage } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { TbCalendarTime } from "react-icons/tb";

const statsCards = [
  {
    id: 1,
    title: "Total Inquiries",
    icon: BiMessage,
    content: "48",
  },
  {
    id: 2,
    title: "Pending",
    icon: LuClock4,
    content: "12",
  },
  {
    id: 3,
    title: "Resolved",
    icon: FiCheckCircle,
    content: "36",
  },
  {
    id: 4,
    title: "Avg. Response Time",
    icon: TbCalendarTime,
    content: "4h",
  },
];

export const FeedbackStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {statsCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.id}
            className={`md:w-full mx-5 md:mx-0 px-3 py-4 border border-none shadow-fuchsia-100`}
          >
            {/* Header */}

            <CardTitle className="flex items-center gap-3 mb-5">
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${
                    item.id === 2
                      ? "bg-[#FEF8E6] text-[#F4B400]"
                      : item.id === 3
                        ? "bg-[#E7ECEA] text-black"
                        : item.id === 4
                          ? "bg-[#EDF6FF] text-black"
                          : "bg-[#C8E2FF] text-black"
                  }
                `}
              >
                <Icon size={20} />
              </div>

              <h1 className="text-xs sm:text-sm">{item.title}</h1>
            </CardTitle>
            <div className="-mt-8 mx-3">
              <h1 className="text-lg font-semibold">{item.content}</h1>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
