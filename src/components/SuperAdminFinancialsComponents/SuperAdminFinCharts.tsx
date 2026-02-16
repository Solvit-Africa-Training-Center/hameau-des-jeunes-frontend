import { ExpenseAllocation } from "./ExpenseAllocation";
import { RepenseVsExpensesChart } from "./RevenueVsExpensesChart";

export const SuperAdminFinCharts = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_2fr] mt-5">
        <RepenseVsExpensesChart />

        <ExpenseAllocation />
      </section>
    </>
  );
};
