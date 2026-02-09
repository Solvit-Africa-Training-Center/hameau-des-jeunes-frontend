import { DatePickerNaturalLanguage } from "../DatePicker";
import { AnalyticsAndTables } from "./AnalyticsAndTables";
import { StatsCards } from "./StatsCards";

export const DashboardContent = () => {
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full px-2 md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-60">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Dashboard Overview</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Welcome back, Super Admin.
              <br className="block sm:hidden" />
              Here's what's happening across all programs.
            </h1>
          </div>

          {/* Date Picker */}
          <div className="md:mt-0 mt-8">
            <DatePickerNaturalLanguage />
          </div>
        </div>
        <StatsCards />
        <AnalyticsAndTables />
      </section>
    </>
  );
};
