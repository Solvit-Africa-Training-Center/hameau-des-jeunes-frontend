import { Card, CardDescription, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import step_1_image from "@/assets/step_1_img.jpg";
import step_2_image from "@/assets/step_2_img.jpg";
import step_3_image from "@/assets/step_3_img.jpg";
import step_4_image from "@/assets/step_4_img.jpg";
import step_5_image from "@/assets/step_5_img.jpg";

const allSteps = [
  {
    id: 1,
    title: "Step 1: Safe Intake & Assessment",
    description:
      "Children are referred through government transit centres. Each receives health screening, psychosocial support, and an individualized care plan.",
    image: step_1_image,
  },

  {
    id: 2,
    title: "Step 2: Family Tracing & Reintegration",
    description:
      "We trace and assess families to determine if safe reunification is possible, providing support and guidance to increase success",
    image: step_2_image,
  },

  {
    id: 3,
    title: "Step 3: Education & Vocational Pathways",
    description:
      "Younger children return to formal schooling. Older children receive hands-on vocational training in practical, marketable skills.",
    image: step_3_image,
  },

  {
    id: 4,
    title: "Step 4: Holistic Daily Care",
    description:
      "Children live in stable family-style settings with consistent caregivers, nutritious meals, healthcare, counseling, and life-skills training.",
    image: step_4_image,
  },

  {
    id: 5,
    title: "Step 5: Transition & Follow-up",
    description:
      "Each young person receives support transitioning into apprenticeships, education, independent living, or family reunification with ongoing follow-up.",
    image: step_5_image,
  },
];

export const StepProcess = () => {
  return (
    <>
      <section className="bg-[#0F3D2E] px-6 py-14 md:px-16 lg:px-24 space-y-10">
        <div className="inline-block border border-white py-2 px-3 rounded-xl">
          <span className="text-white text-sm md:text-base">
            5-Step Process
          </span>
        </div>
        {/* Title */}
        <div className="grid grid-cols-1">
          <h1 className="text-center text-white font-bold text-2xl md:text-3xl lg:text-4xl">
            From Crisis to Confidence:
          </h1>
          <h1 className="text-center text-white font-bold text-2xl md:text-3xl lg:text-4xl">
            Our Journey
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <Carousel
            opts={{ align: "start" }}
            className="w-full sm:max-w-sm md:max-w-md lg:max-w-3xl"
          >
            <CarouselContent>
              {allSteps.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full min-h-[420px] flex flex-col overflow-hidden border border-[#0F3D2E]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover "
                    />

                    <div className="flex flex-col flex-1 px-5 py-4">
                      <CardTitle className="text-base md:text-lg mb-2">
                        {item.title}
                      </CardTitle>

                      <CardDescription className="text-sm leading-relaxed line-clamp-4">
                        {item.description}
                      </CardDescription>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop arrows only */}
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </section>
    </>
  );
};
