import { LuClock4, LuLayers3 } from "react-icons/lu";
import { Card, CardTitle } from "../ui/card";
import { GoPeople } from "react-icons/go";

const statsCards = [
  {
    id: 1,
    title: "Super Admins",
    icon: GoPeople,
    content: "2",
  },
  {
    id: 2,
    title: "Program Admins",
    icon: LuLayers3,
    content: "6",
  },
  {
    id: 3,
    title: "Pending Invites",
    icon: LuClock4,
    content: "0",
  },
];

export const UsersMgtStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {statsCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.id} className={`md:w-full mx-5 md:mx-0 px-3 py-4`}>
            {/* Header */}

            <CardTitle className="flex items-center gap-3 mb-5">
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${
                    item.id === 3
                      ? "bg-[#FEF8E6] text-[#F4B400]"
                      : item.id === 2
                        ? "bg-[#E7ECEA] text-[#0F3D2E]"
                        : "bg-[#EDF6FF] text-[#4DA3FF]"
                  }
                `}
              >
                <Icon size={20} />
              </div>

              <div className="flex-col text-start space-y-2">
                <h1 className="text-xs sm:text-sm">{item.title}</h1>
                {/* Main number */}
                <h1>{item.content}</h1>
              </div>
            </CardTitle>
          </Card>
        );
      })}
    </div>
  );
};
