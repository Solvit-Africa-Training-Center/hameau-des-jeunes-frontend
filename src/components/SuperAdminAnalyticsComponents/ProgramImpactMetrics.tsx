import { Heart } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { GoPeople } from "react-icons/go";

const programImpactMetrics = [
  {
    id: 1,
    icon: Heart,
    stats: "1.2k",
    description: "Lives Impacted",
  },
  {
    id: 2,
    icon: GoPeople,
    stats: "450",
    description: "Active Families",
  },
  {
    id: 3,
    icon: Heart,
    stats: "1.2k",
    description: "Lives Impacted",
  },
  {
    id: 4,
    icon: Heart,
    stats: "1.2k",
    description: "Lives Impacted",
  },
];

export const ProgramImpactMetrics = () => {
  return (
    <>
      <Card className="mt-5 p-3 md:mx-0 mx-5">
        <CardTitle>Program Impact Metrics</CardTitle>

        <CardContent className="flex md:justify-between justify-center items-center ">
          {programImpactMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div className="flex-col">
                {/* Icon */}
                <div
                  className={`${item.icon} w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center  
                  ${item.id === 2 ? "bg-[#EDF6FF] text-[#3774B5]" : "bg-[#E7ECEA] text-[#0F3D2E]"} `}
                >
                  <Icon size={18} className="sm:size-[20px]" />
                </div>

                {/* Stat */}
                <h1 className="text-lg font-bold">{item.stats}</h1>
                <h1 className="font-light ">{item.description}</h1>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};
