import { useGetCompanyImpactQuery } from "@/store/api/companyImpact";
import React, { useEffect, useRef, useState } from "react";

interface StatItemProps {
  value: string;
  label: string;
  isPercentage?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  isPercentage = false,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetValue = parseInt(value.replace(/\D/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={statRef} className="text-center">
      <div className="mb-2 text-4xl font-bold text-[#FDB714] sm:text-4xl md:text-5xl lg:text-6xl">
        {isPercentage ? `${count}%` : `${count}+`}
      </div>
      <div className="text-sm text-white sm:text-sm md:text-base">{label}</div>
    </div>
  );
};

export const Impact: React.FC = () => {
  const { data: impactList = [], isLoading } = useGetCompanyImpactQuery();
  const impact = impactList[0];

  const stats = [
    {
      value: impact?.children_supported ?? "0",
      label: "Children Supported",
      isPercentage: false,
    },
    {
      value: impact?.years_of_service ?? "0",
      label: "Years in Service",
      isPercentage: false,
    },
    {
      value: impact?.families_strengthened ?? "0",
      label: "Families Strengthened",
      isPercentage: false,
    },
    {
      value: impact?.communities_impacted ?? "0",
      label: "Commitment to Impact",
      isPercentage: true,
    },
  ];

  return (
    <section className="bg-[#1B4332] py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Our Impact
          </h2>
          <p className="text-base text-white/90 sm:text-lg md:text-xl">
            Building futures one child at a time
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="mx-auto mb-2 h-12 w-24 rounded bg-white/20" />
                <div className="mx-auto h-4 w-32 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                isPercentage={stat.isPercentage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
