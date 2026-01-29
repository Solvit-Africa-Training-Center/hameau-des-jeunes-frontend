import React from 'react';

interface StoryCardProps {
  image: string;
  name: string;
  story: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ image, name, story }) => {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-sm">
      <div className="mb-4 h-24 w-24 overflow-hidden rounded-md border-4 border-gray-200 sm:h-28 sm:w-28 md:h-32 md:w-32">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-gray-900 sm:text-lg md:mb-3">
        {name}
      </h3>
      <p className="text-base leading-relaxed text-gray-600 sm:text-base">
        {story}
      </p>
    </div>
  );
};

export const StoriesOfChange= () => {
  const stories = [
     {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCLdglNRCWITCP7qQGWY6RdzWOBXJ6TimHw&s',
      name: 'NDEKEZI Pascal',
      story: ' I have been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!',
      
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWiFTjPzMtOOiOyQ5reLcmz98X2dhfg30sIw&s',
      name: 'MANIRAKIZA JEAN Paul',
      story: 'I have been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWiFTjPzMtOOiOyQ5reLcmz98X2dhfg30sIw&s',
      name: 'UWIMPAYE Evelyne',
      story: 'I have been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!',
    },
  ];

  return (
    <section className="bg-gray-100 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl md:mb-4">
            Stories of Change
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-700 sm:text-base md:text-lg">
            Real journeys of transformation, resilience, and hope from vulnerability to independence
          </p>
        </div>
        <div className="mb-8 grid gap-8 sm:grid-cols-2 md:mb-12 md:gap-12 lg:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              image={story.image}
              name={story.name}
              story={story.story}
            />
          ))}
        </div>
        <div className="text-center">
          <button className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base">
            Read More Stories
          </button>
        </div>
      </div>
    </section>
  );
};