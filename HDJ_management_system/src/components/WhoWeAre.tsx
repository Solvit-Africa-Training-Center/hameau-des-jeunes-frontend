// components/WhoWeAre.tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#122a12] sm:text-sm">
            Who We Are
          </p>
        </div>

        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Protecting Children, Strengthening Families
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-based leading-relaxed text-gray-700 sm:text-base md:text-lg">
              Hameau des Jeunes Saint Kizito is a non-profit organization in 
              Rwanda dedicated to protecting vulnerable children and 
              strengthening families through long-term, community-based solutions.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
              For over two decades, We have provided safe homes, quality 
              education, and pathways to independence for children who need 
              protection, care, and hope.
            </p>

            <a 
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#597bca] transition-colors hover:text-[#e5a513] sm:text-base"
            >
              Read Our Full Story
              <ArrowUpRight size={18} className="sm:hidden" />
              <ArrowUpRight size={20} className="hidden sm:block" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};