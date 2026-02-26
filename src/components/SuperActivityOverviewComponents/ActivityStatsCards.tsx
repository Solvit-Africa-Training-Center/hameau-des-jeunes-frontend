import { BsExclamationCircle } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { Card, CardFooter, CardTitle } from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";

const statsCards = [
  {
    id: 1,
    title: "Pending Review",
    icon: LuClock4,
    content: "08",
    footer: "Updates awaiting oversight",
  },
  {
    id: 2,
    title: "Program Admins",
    icon: BsExclamationCircle,
    content: "05",
    footer: "Requires leadership attention",
  },
  {
    id: 3,
    title: "Completion Rate",
    icon: IoMdCheckmarkCircleOutline,
    percentage: "92",
  },
];

export const ActivityStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {statsCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.id}
            className={`md:w-full mx-5 md:mx-0 px-3 py-4 border border-none shadow-fuchsia-100
          ${item.id === 3 ? "bg-[#0F3D2E] text-white" : "bg-white"}`}
          >
            {/* Header */}

            <CardTitle className="flex items-center gap-3">
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${
                    item.id === 1
                      ? "bg-[#FEF8E6] text-[#F4B400]"
                      : item.id === 2
                        ? "bg-[#A72838] text-white"
                        : "bg-[#F4B400] text-[#0F3D2E]"
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

            {/* Footer */}
            {item.id === 1 || item.id === 2 ? (
              <CardFooter className="pt-1 text-[#838484] text-sm font-light">
                {item.footer}
              </CardFooter>
            ) : (
              <Field className="w-full max-w-sm">
                <FieldLabel htmlFor="progress-upload">
                  <span className="text-sm font-light text-white">
                    Overall Weekly Goal Progress
                  </span>
                  <span className="ml-auto text-button-yellow">
                    {item.percentage}%
                  </span>
                </FieldLabel>
                <Progress
                  id="progress-upload"
                  value={Number(item.percentage)}
                  className="h-2 bg-white/20 [&>div]:bg-[#F4B400] "
                />
              </Field>
            )}
          </Card>
        );
      })}
    </div>
  );
};
