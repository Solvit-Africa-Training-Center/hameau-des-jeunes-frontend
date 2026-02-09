import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const residentialCareStats = [
  { id: 1, numbers: "120+", label: "Children Supported" },
  { id: 2, numbers: "2 years", label: "Average Care Duration" },
  { id: 3, numbers: "2,000+", label: "Lives Transformed Since 1987" },
  { id: 4, numbers: "100%", label: "Family-Style Living" },
];

export const OurMissionInAction = () => {
  return (
    <section className="px-6 py-14 md:px-16 lg:px-24 space-y-10 text-center">
      {/* Button */}
      <div className="flex justify-center">
        <Button className="bg-[#0F3D2E] rounded-2xl px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm md:text-base">
              Support a Child
            </span>
            <FaArrowRightLong size={18} className="text-button-yellow" />
          </div>
        </Button>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-3xl font-bold text-[#0F3D2E]">
        Our Mission in Action
      </h1>

      {/* Description */}
      <p className="text-[#646B76] max-w-4xl mx-auto text-justify md:text-center text-sm md:text-base leading-relaxed">
        Children arrive at our doors from transit centres and the streets,
        carrying fear, loss, and uncertainty. At Hameau des Jeunes Saint Kizito,
        they find safety, routine, and people who care. Through family-style
        living, education, and guidance, we help children move from crisis
        toward dignity, stability, and a future they can believe in.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        {residentialCareStats.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <h1 className="text-[#0F3D2E] font-bold text-3xl md:text-4xl">
              {item.numbers}
            </h1>
            <p className="text-sm text-[#646B76]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
