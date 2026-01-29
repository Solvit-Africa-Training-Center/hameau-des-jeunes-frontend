import { GoDotFill } from "react-icons/go";
import { RotatedCards } from "./RotatedCards";

export const ResidentialCarePathsWays = () => {
  return (
    <>
      <section className="bg-[#FAFAFA] px-6 py-14 md:px-10 lg:px-5 space-y-8">
        {/* Section label */}
        <div className="flex items-center gap-2 max-w-5xl mx-auto">
          <GoDotFill size={15} className="text-[#4DA3FF]" />
          <h1 className="text-button-yellow text-sm md:text-base">
            Residential Care Program
          </h1>
        </div>

        {/* Title */}
        <h1 className="text-center text-[#0F3D2E] font-bold text-2xl md:text-3xl lg:text-4xl">
          How We Create Safe Pathways Forward
        </h1>

        {/* Paragraphs */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-[#646B76] text-sm text-justify md:text-base font-semibold leading-relaxed">
            Our Residential Care program provides a safe, nurturing environment
            for vulnerable children who cannot remain with their biological
            families. Many are referred to us by government transit centres
            after experiencing neglect, homelessness, or family breakdown.
          </p>

          <p className="text-[#646B76] text-sm md:text-base font-semibold text-justify leading-relaxed">
            We operate family-style homes where children receive consistent
            care, protection, and emotional support. Alongside meeting immediate
            needs such as shelter, food, healthcare, and counseling, we work
            with each child to return to school or develop practical skills that
            prepare them for a stable livelihood. Our goal is not long-term
            institutionalization, but healing, growth, and a clear path forward.
          </p>
        </div>
        <RotatedCards />
        <h1 className="text-center">
          Each step is designed to restore dignity, build confidence, and create
          lasting pathways to stability and self-reliance.
        </h1>
      </section>
    </>
  );
};
