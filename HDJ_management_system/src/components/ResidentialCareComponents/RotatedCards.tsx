import { BookOpen, Heart, ShieldCheck, Users } from "lucide-react";

const pathsCards = [
  {
    id: 1,
    title: "Safe Intake",
    description: "Comprehensive assessment and individualized care planning",
    bg: "bg-blue-100",
    iconBg: "bg-blue-500",
    rotate: "rotate-0 lg:-rotate-6",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Family Tracing",
    description: "Working toward safe reunification when possible",
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-500",
    rotate: "rotate-0 lg:-rotate-2",
    icon: Users,
  },
  {
    id: 3,
    title: "Education Pathways",
    description: "School reintegration and vocational training",
    bg: "bg-gray-100",
    iconBg: "bg-green-700",
    rotate: "rotate-0 lg:rotate-0",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Daily Care",
    description: "Holistic support in family-style homes",
    bg: "bg-blue-100",
    iconBg: "bg-blue-500",
    rotate: "rotate-0 lg:rotate-2",
    icon: Heart,
  },
  {
    id: 5,
    title: "Transition Support",
    description: "Preparing for independent living and follow-up",
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-500",
    rotate: "rotate-0 lg:rotate-6",
    icon: ShieldCheck,
  },
];

export const RotatedCards = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
        {pathsCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`
                ${item.bg}
                ${item.rotate}
                w-full
                sm:w-[200px]
                md:w-[220px]
                p-5
                sm:p-6
                rounded-2xl
                shadow-md
                transition-all
                duration-300
                hover:rotate-0
                hover:scale-105
              `}
            >
              {/* Icon */}
              <div
                className={`${item.iconBg} w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3 sm:mb-4`}
              >
                <Icon size={18} className="text-white sm:size-[20px]" />
              </div>

              {/* Text */}
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
