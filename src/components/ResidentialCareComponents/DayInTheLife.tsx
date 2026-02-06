import morningImage from "@/assets/step_1_img.jpg";
import afternoonImage from "@/assets/afternoon_image.jpg";
import eveningImage from "@/assets/evening_image.jpg";
import { Card, CardDescription, CardTitle } from "../ui/card";

const dailyRoutines = [
  {
    id: 1,
    title: "Morning: Structure & Learning",
    description:
      "Mornings begin with shared chores followed by school or vocational classes.",
    image: morningImage,
  },
  {
    id: 2,
    title: "Afternoon: Growth & Play",
    image: afternoonImage,
  },
  {
    id: 3,
    title: "Evening: Family & Reflection",
    image: eveningImage,
  },
];

export const DayInTheLife = () => {
  return (
    <section className="bg-white px-6 py-14 md:px-16 lg:px-24 space-y-10">
      {/* Header */}
      <div className="flex justify-between flex-wrap gap-6">
        <div>
          <p className="text-[#0F3D2E] font-bold">A Day in the Life</p>
          <p className="text-[#0F3D2E] font-bold">of Hope and Routine</p>
        </div>

        <div className="max-w-md">
          <p className="text-sm font-bold">
            This balanced routine helps children regain a sense
          </p>
          <p className="text-sm font-bold">
            of normality, responsibility, and hope.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:flex gap-6">
        {dailyRoutines.map((item, index) => (
          <Card
            key={item.id}
            className={`
              flex flex-col overflow-hidden bg-[#E7ECEA]
              ${index === 0 ? "h-[370px]" : "h-[276px] md:mt-24"}
            `}
          >
            {/* FIRST CARD → image first */}
            {index === 0 && (
              <img
                src={item.image}
                alt="routine"
                className="w-full h-[260px] object-cover"
              />
            )}

            {/* Text */}
            <div
              className={`
                p-4 space-y-2
                ${index === 0 ? "mt-0" : ""}
              `}
            >
              <CardTitle className="text-lg font-bold text-[#0F3D2E]">
                {item.title}
              </CardTitle>

              {item.description && (
                <CardDescription className="text-sm text-black">
                  {item.description}
                </CardDescription>
              )}
            </div>

            {/* OTHER CARDS → image after text */}
            {index !== 0 && (
              <img
                src={item.image}
                alt="routine"
                className="w-full h-[180px] object-cover mt-3"
              />
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};
