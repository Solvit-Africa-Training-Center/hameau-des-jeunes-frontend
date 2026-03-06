import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/swiper-bundle.css";

import {
  useGetTestimonialsQuery,
  type Testimonial,
} from "@/store/api/testimonialsApi";

interface StoryCardProps {
  image: string;
  name: string;
  story: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ image, name, story }) => {
  return (
    <div className="relative pt-20">
      {/* White Card */}
      <div className="bg-white shadow-md p-6 pl-0 flex gap-6 items-start h-56 w-full ">
        {/* Portrait Image - LEFT side, extends above card */}
        <div className="shrink-0 -mt-24 ">
          <div className="h-48 w-32 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content - RIGHT side */}
        <div className="flex-1 pt-4 text-justify overflow-hidden pb-5">
          <h3 className="mb-3 text-base font-bold text-gray-900 ">{name}</h3>
          <p className="text-xs leading-relaxed text-gray-600">{story}</p>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader matching the card shape
const StoryCardSkeleton = () => (
  <div className="relative pt-12">
    <div className="bg-white shadow-md p-6 pl-0 flex gap-6 items-start animate-pulse">
      <div className="shrink-0 -mt-18.5">
        <div className="h-48 w-32 bg-gray-200" />
      </div>
      <div className="flex-1 pt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  </div>
);

export const StoriesOfChange = () => {
  const { data: testimonials, isLoading, isError } = useGetTestimonialsQuery();

  return (
    <section className="bg-gray-100 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-left md:mb-16">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Stories of Change
          </h2>
          <p className="max-w-2xl text-sm text-gray-700 md:text-base">
            Real journeys of transformation, resilience, and hope from
            vulnerability to independence
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="mb-12 md:mb-16">
          {isError ? (
            <p className="text-center text-sm text-red-500">
              Failed to load stories. Please try again later.
            </p>
          ) : isLoading ? (
            // Show 3 skeletons while loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <StoryCardSkeleton key={i} />
              ))}
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="stories-swiper"
            >
              {testimonials.map((testimonial: Testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <StoryCard
                    image={testimonial.image}
                    name={testimonial.name}
                    story={testimonial.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-sm text-gray-500">
              No stories available yet.
            </p>
          )}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 bg-transparent px-8 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
            Read More Stories
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
