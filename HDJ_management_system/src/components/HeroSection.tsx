import hero_image_1 from "@/assets/hero_image_1.png";
import hero_image_2 from "@/assets/hero_image_2.png";

export const HeroSection = () => {
  return (
    <>
      <section className="w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[500px] relative overflow-hidden">
        <img
          src={hero_image_1}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Your Hero Title</h1>
        </div>
      </section>
    </>
  );
};
