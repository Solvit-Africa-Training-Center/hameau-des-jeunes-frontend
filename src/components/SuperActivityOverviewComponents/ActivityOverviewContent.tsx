import { MdOutlineTune } from "react-icons/md";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ActivityStatsCards } from "./ActivityStatsCards";
import { Card } from "../ui/card";
import { AdminActivityDetailsTable } from "./AdminActivityDetailsTable";

export const ActivityOverviewContent = () => {
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-60">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Admin Activity Oveview</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Monitoring organizational progress and administrative
              accountability.
            </h1>
          </div>

          <div className="flex items-center justify-center md:mt-0 mt-3">
            <Field>
              <div className="relative w-full max-w-xs">
                <Input
                  id="search_field"
                  type="text"
                  placeholder="Search by name, email or role"
                  required
                  className="border-none rounded-2xl bg-[#F5F7FA] text-[#718EBF] pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                  size={18}
                />
              </div>
            </Field>
            <MdOutlineTune size={35} />
          </div>
        </div>
        <ActivityStatsCards />
        <Card className="mt-5">
          <AdminActivityDetailsTable />
        </Card>
      </section>
    </>
  );
};
