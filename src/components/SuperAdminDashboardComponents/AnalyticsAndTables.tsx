import { Card, CardContent, CardTitle } from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import { AdminActivityTable } from "./AdminActivityTable";
import { ChartLineMultiple } from "./ChartLineMultiple";

const activities = [
  {
    id: 1,
    user: "Jean-Jacques Mugabo",
    action: "added 5 new children to Residential Care",
    time: "12 minutes ago",
  },
  {
    id: 2,
    user: "Jean-Paul Mugisha",
    action: "added 5 new children to Residential Care",
    time: "12 minutes ago",
  },
  {
    id: 3,
    user: "Jean-Jacques Mugabo",
    action: "added 5 new children to Residential Care",
    time: "12 minutes ago",
  },
  {
    id: 4,
    user: "Jean-Paul Mugisha",
    action: "added 5 new children to Residential Care",
    time: "12 minutes ago",
  },
  {
    id: 5,
    user: "Jean-Jacques Mugabo",
    action: "added 5 new children to Residential Care",
    time: "12 minutes ago",
  },
  {
    id: 6,
    user: "Jean-Paul Mugisha",
    action: "added 5 new children to Residential Care",
    time: "12 minutes ago",
  },
];

export const AnalyticsAndTables = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1.5fr] mt-5">
        <div className="flex-col">
          <ChartLineMultiple />

          <Card className="px-5 mt-3 md:mx-0 mx-5">
            <CardTitle>
              <h1>Admin Activity Overview</h1>
            </CardTitle>
            <CardContent>
              <AdminActivityTable />
            </CardContent>
          </Card>
        </div>

        <div className="flex-col space-y-3">
          <Card className="px-5 bg-[#0F3D2E] md:mx-0 mx-5">
            <CardTitle className="space-y-3">
              <h1 className="text-white font-bold">Quick Summary</h1>
              <span className="text-sm font-light text-white">
                Program performance is up by 12% compared to the previous
                quarter.{" "}
              </span>
            </CardTitle>

            <CardContent className="space-y-8">
              <Field className="w-full max-w-sm">
                <FieldLabel htmlFor="progress-upload">
                  <span className="text-sm font-light text-white">
                    Twese Hamwe
                  </span>
                  <span className="ml-auto text-button-yellow">66%</span>
                </FieldLabel>
                <Progress
                  id="progress-upload"
                  value={66}
                  className="h-2 bg-white/20 [&>div]:bg-[#F4B400]"
                />
              </Field>

              <Field className="w-full max-w-sm">
                <FieldLabel htmlFor="progress-upload">
                  <span className="text-sm font-light text-white">
                    Health Checkups
                  </span>
                  <span className="ml-auto text-button-yellow">88%</span>
                </FieldLabel>
                <Progress
                  id="progress-upload"
                  value={88}
                  className="h-2 bg-white/20 [&>div]:bg-[#F4B400] "
                />
              </Field>
            </CardContent>
          </Card>

          {/* RECENT ACTIVITIES CARD */}

          <Card className="px-5 md:mx-0 mx-5">
            <CardTitle>
              <h1>Recent Activity</h1>
            </CardTitle>
            <CardContent>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 h-full w-px bg-gray-200" />

                <div className="relative">
                  <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex gap-4 relative">
                        {/* Dot */}
                        <div className="relative z-10">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-emerald-700" />
                          </div>
                        </div>

                        {/* Content */}
                        <div>
                          <p className="text-sm text-gray-800 leading-snug">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
