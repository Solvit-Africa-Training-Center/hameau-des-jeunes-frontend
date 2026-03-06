import { useGetWhoWeAreQuery } from "@/store/api/whoWeAreApi";
import React from "react";

export const WhoWeAre: React.FC = () => {
  const { data: whoWeAre } = useGetWhoWeAreQuery();

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#122a12] sm:text-sm">
            Who We Are
          </p>
        </div>

        {whoWeAre?.map((whoweare) => (
          <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                {whoweare.title}
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <p className="text-based leading-relaxed text-gray-700 sm:text-base md:text-lg">
                {whoweare.description}
              </p>
              {/* <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
              For over two decades, We have provided safe homes, quality
              education, and pathways to independence for children who need
              protection, care, and hope.
            </p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
