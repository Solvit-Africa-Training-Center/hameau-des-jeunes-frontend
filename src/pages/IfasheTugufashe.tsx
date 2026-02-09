import { TopNavBar } from "@/components/TopNavBar";
import IfasheTugufasheImg from "@/assets/ifasheImage.jpg";
import { ProgramSnapshot } from "@/components/IfasheTugufasheComponents/ProgramSnapshot";
import { ProgramOverview } from "@/components/IfasheTugufasheComponents/ProgramOverview";
import { HowTheProgramWorks } from "@/components/IfasheTugufasheComponents/HowTheProgramWorks";
import { HistoryAndEvolution } from "@/components/IfasheTugufasheComponents/HistoryAndEvolution";
import { FundingAndNeeds } from "@/components/IfasheTugufasheComponents/FundingAndNeeds";
import { HowToSupport } from "@/components/IfasheTugufasheComponents/HowToSupport";
import { FundingStats } from "@/components/IfasheTugufasheComponents/FundingStats";
import { CallToDonate } from "@/components/ResidentialCareComponents/CallToDonateCard";
import { Footer } from "@/components/Footer";

export const IfasheTugufashe = () => {
  return (
    <>
      <TopNavBar />
      <header
        className="relative h-64 sm:h-80 md:h-96 lg:h-[17rem] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6)),url(${IfasheTugufasheImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-2xl text-button-yellow sm:text-5xl md:text-5xl lg:text-5xl font-bold mb-2 leading-tight">
            Ifashe Tugufashe
          </h1>
          <p className="justify-center text-white md:text-2xl  sm:text-sm">
            Take the first step, and we'll walk with you the rest of the way.
          </p>
        </div>
      </header>
      <section className="bg-[#FAFAFA] px-6 py-14 md:px-10 lg:px-5 space-y-8">
        {/* Paragraphs */}
        <div className="max-w-4xl mx-auto space-y-6 px-15">
          <p className="text-[#646B76] text-sm text-justify font-semibold md:text-base  leading-relaxed">
            Ifashe Tugufashe is a family-strengthening program designed to keep
            vulnerable children safely at home and out of the streets. Instead
            of separating children from their families, the program works
            alongside households to rebuild stability, dignity, and
            self-reliance.
          </p>

          <p className="text-[#646B76] text-sm md:text-base font-semibold text-justify leading-relaxed">
            Through a partnership model rooted in shared responsibility,
            families contribute effort to community and agricultural projects
            while receiving practical support that helps meet basic needs, keep
            children in school, and restore livelihoods. The result is stronger
            families, protected children, and long-term change that prevents
            child abandonment before it happens.
          </p>
        </div>
      </section>
      <ProgramSnapshot />
      <ProgramOverview />
      <HowTheProgramWorks />
      <HistoryAndEvolution />
      <FundingAndNeeds />
      <HowToSupport />
      <FundingStats />
      <CallToDonate />
      <Footer />
    </>
  );
};
