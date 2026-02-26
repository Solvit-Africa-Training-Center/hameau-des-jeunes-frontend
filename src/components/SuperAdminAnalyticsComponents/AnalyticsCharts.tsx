import { BeneficiaryDemographics } from "./BeneficiaryDemographics";
import { EnrolementVSTargetChart } from "./EnrolemenVSTargetChart";

export const AnalyticsCharts = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_2fr] mt-5">
        <EnrolementVSTargetChart />

        <BeneficiaryDemographics />
      </section>
    </>
  );
};
