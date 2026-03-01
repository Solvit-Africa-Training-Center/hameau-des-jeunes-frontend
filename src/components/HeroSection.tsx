import hero_image_1 from "@/assets/rwanda_2006/DSC_7109.jpg";
import hero_image_2 from "@/assets/rwanda_2006/DSC_6896.jpg";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const heroImages = [hero_image_1, hero_image_2];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section className="w-full h-[200px] sm:h-[600px] md:h-[600px] lg:h-[500px] relative overflow-hidden">
        {/* Hero images */}
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            alt="Hero"
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center text-white px-4">
          <div className="max-w-4xl text-center">
            {/* Main heading */}
            <h1
              className="
        font-heading font-bold
        leading-tight sm:leading-tight md:leading-snug
        text-2xl
        sm:text-2xl
        md:text-3xl
        lg:text-6xl
      "
            >
              Building Hope and <br className="hidden sm:block" />
              Opportunity for Every Child
            </h1>

            {/* Subtitle */}
            <p
              className="
        mt-4 sm:mt-6
        text-sm
        sm:text-base
        md:text-lg
        font-sans
        max-w-xl
        mx-auto
      "
            >
              Protecting, Educating, and Empowering Vulnerable Children in
              Rwanda
            </p>

            {/* CTA buttons */}
            <div
              className="
        my-3 sm:my-3 md:my-5
        flex items-center
        justify-center
        gap-4
      "
            >
              <Button className="w-auto sm:w-auto text-white bg-button-yellow hover:bg-amber-500">
                Give a Child a Future
              </Button>

              <Button
                variant="outline"
                className="
          w-auto 
          border-button-yellow
          bg-transparent
          text-button-yellow
          hover:bg-button-yellow
          hover:text-white  
        "
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
