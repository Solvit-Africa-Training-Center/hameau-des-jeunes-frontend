import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// Import placeholder images (replace these with your actual imports)
import story1 from '@/assets/viye.png';
import story2 from '@/assets/testimonial_2_img.png';
import story3 from '@/assets/testimonial_3_img.jpg';
import story4 from '@/assets/testimonial_4_img.jpg';
import story5 from '@/assets/child_protection_officer.png';
import story6 from '@/assets/bg.png';

interface StoryCardProps {
  image: string;
  name: string;
  story: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ image, name, story }) => {
  return (
    <div className="relative pt-12">
      {/* White Card */}
      <div className="bg-white shadow-md p-6 pl-0 flex gap-6 items-start">
        {/* Portrait Image - LEFT side, extends above card */}
        <div className="shrink-0 -mt-18.5">
          <div className="h-48 w-32 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        {/* Content - RIGHT side */}
        <div className="flex-1 pt-4">
          <h3 className="mb-3 text-base font-bold text-gray-900">
            {name}
          </h3>
          <p className="text-xs leading-relaxed text-gray-600">
            {story}
          </p>
        </div>
      </div>
    </div>
  );
};

export const StoriesOfChange = () => {
  const stories = [
    {
      image: story1,
      name: 'NDEKEZI Pascal',
      story: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    },
    {
      image: story2,
      name: 'MANIRAKIZA JEAN Paul',
      story: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    },
    {
      image: story3,
      name: 'UWIMPAYE Evelyne',
      story: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    },
    {
      image: story4,
      name: 'MUKAMANA Grace',
      story: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    },
    {
      image: story5,
      name: 'NIYONZIMA Jean',
      story: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    },
    {
      image: story6,
      name: 'UWIHANA Rose',
      story: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    },
  ];

  return (
    <section className="bg-gray-100 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-left md:mb-16">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Stories of Change
          </h2>
          <p className="max-w-2xl text-sm text-gray-700 md:text-base">
            Real journeys of transformation, resilience, and hope from vulnerability to independence
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="mb-12 md:mb-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
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
            {stories.map((story, index) => (
              <SwiperSlide key={index}>
                <StoryCard
                  image={story.image}
                  name={story.name}
                  story={story.story}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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