// components/WhatWeDo.tsx
import React from 'react';
import { Home, Users, Heart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WhatWeDo: React.FC = () => {
  const navigate = useNavigate();
  const programs = [
    {
      icon: Home,
      title: 'Residential Care',
      description: 'Safe, family-style homes for children without stable care.',
      color: 'bg-[#1B4332]',
    },
    {
      icon: Users,
      title: 'Internship',
      description: 'Safe, family-style homes for children without stable care.',
      color: 'bg-[#4A90E2]',
    },
    {
      icon: Heart,
      title: 'TweseHamwe',
      description: 'Supporting families to reunite and became self-reliant.',
      color: 'bg-[#FDB714]',
    },
    {
      icon: Activity,
      title: 'Health Post',
      description: 'Safe, family-style homes for children without stable care.',
      color: 'bg-[#1B4332]',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <p className="mb-3 text-xl font-bold uppercase tracking-wide text-gray-600 sm:text-sm sm:mb-4">
            What We Do
          </p>
          <p className="mx-auto max-w-3xl text-sm text-gray-700 sm:text-base md:text-lg">
            Our comprehensive programs address the diverse needs of vulnerable children and families
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <div
                key={index}
                className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-6"
              >
                <div className={`mb-3 inline-flex rounded-lg ${program.color} p-2.5 sm:mb-4 sm:p-3`}>
                  <IconComponent className="h-6 w-6 text-white sm:h-6 sm:w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl sm:mb-3">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600 sm:text-sm">
                  {program.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center sm:mt-10 md:mt-12">
          <button onClick={() => navigate("/programs")} className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base">
            Explore Our Programs
          </button>
        </div>
      </div>
    </section>
  );
};