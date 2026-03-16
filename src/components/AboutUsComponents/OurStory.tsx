import { useGetAboutUsQuery } from "@/store/api/aboutUsApi";
import { useGetWhoWeAreQuery } from "@/store/api/whoWeAreApi";

export const OurStory = () => {
  const { data: whoWeAre } = useGetWhoWeAreQuery();
  const { data } = useGetAboutUsQuery();
  const about = data?.results?.[0];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#FAFAFA] px-6 md:px-16 lg:px-30 py-16">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-1 bg-blue-400" />
          <h1 className="text-button-yellow text-sm md:text-base">
            A loving home, a brighter tomorrow
          </h1>
        </div>

        <h1 className="font-bold text-3xl md:text-5xl mb-5 text-[#0F3D2E]">
          Who We Are
        </h1>

        {whoWeAre?.map((whoweare) => (
          <p className="mb-10 text-sm md:text-base leading-relaxed text-justify">
            {whoweare.description}
          </p>
        ))}

        <h1 className="font-bold text-3xl md:text-5xl mb-5 text-[#0F3D2E]">
          Our Story
        </h1>

        <p className="text-sm md:text-base leading-relaxed text-justify">
          {about?.our_story}
        </p>
      </div>

      <div className="relative mx-auto md:mx-7 w-full max-w-lg">
        <div className="hidden md:block absolute -left-2.5 top-[5%]  h-[90%] w-[10px] bg-button-yellow rounded-bl-3xl rounded-tl-3xl" />

        <img
          src={about?.banner_image}
          alt="our_story_image"
          className="w-full object-cover rounded-2xl"
        />
      </div>
    </section>
  );
};
