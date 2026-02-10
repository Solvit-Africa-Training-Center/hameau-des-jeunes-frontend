import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { AnalyticsStatsCards } from "./AnalyticsStatsCards";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { ProgramImpactMetrics } from "./ProgramImpactMetrics";

export const AnalyticsContent = () => {
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-60">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Program Analytics</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Deep dive into program performance and impact metrics.
              {/* <br className="block sm:hidden" />
              Here's what's happening across all programs. */}
            </h1>
          </div>

          {/* Date Picker */}
          <div className="md:mt-0 mt-8 gap-2 flex flex-col md:flex-row items-center justify-center">
            <DatePickerWithRange />
            <Button className="flex items-center justify-center md:mt-0 mt-3 gap-1 bg-[#0F3D2E] text-sm font-light rounded-lg">
              <MdOutlineFileDownload size={20} color="white" />
              <h1>Download Full Report</h1>
            </Button>
          </div>
        </div>
        <AnalyticsStatsCards />
        <AnalyticsCharts />
        <ProgramImpactMetrics />
      </section>
    </>
  );
};
