import { AiOutlineHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { RiGraduationCapLine } from "react-icons/ri";
import { BiDollar } from "react-icons/bi";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { FaArrowTrendUp } from "react-icons/fa6";

const statsCards = [
  {
    id: 1,
    title: "Total Children",
    icon: GoPeople,
    content: "482",
    footer: "+12",
  },
  {
    id: 2,
    title: "Total Families",
    icon: AiOutlineHome,
    content: "482",
    footer: "+4",
  },
  {
    id: 3,
    title: "Active Interns",
    icon: RiGraduationCapLine,
    content: "482",
    footer: "+2",
  },
  {
    id: 4,
    title: "Total Donations",
    icon: BiDollar,
    content: "$42,850",
    footer: "+18.5%",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {statsCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.id}
            className="md:w-full mx-5 md:mx-0 px-3 py-4 border border-none shadow-fuchsia-100"
          >
            {/* Header */}
            <CardTitle className="flex items-center gap-3">
              <div
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${
                    item.id === 1 || item.id === 4
                      ? "bg-blue-200 text-blue-600"
                      : item.id === 2
                        ? "bg-[#FCE8B0] text-[#F6C333]"
                        : "bg-[#E7ECEA] text-black"
                  }
                `}
              >
                <Icon size={14} />
              </div>

              <h1 className="text-xs sm:text-sm">{item.title}</h1>
            </CardTitle>

            {/* Main number */}
            <CardContent className="font-bold text-2xl sm:text-3xl py-2">
              {item.content}
            </CardContent>

            {/* Footer */}
            <CardFooter className="pt-1">
              <div className="flex flex-col gap-1 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-[#0C9857]">{item.footer}</span>
                  <span className="text-gray-500">from last month</span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <span>Growth</span>
                  <FaArrowTrendUp size={14} className="text-[#0F3D2E]" />
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
