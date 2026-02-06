import React from 'react';

export const Fundraising: React.FC = () => {
  return (
    <section className="relative h-100 w-full sm:h-125 md:h-150">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslh6fJC23goQWVV7PuSvSJpCIYufTUUHeZw&s')`
        }}
      />
 
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <p className="mb-3 text-base text-white/90 sm:text-lg md:mb-4 md:text-xl">
            We're here to support poor people
          </p>
          
          <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl md:mb-8 md:text-4xl lg:text-5xl">
            Fundraising for the People and Causes you Care About
          </h2>
          
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button className="w-full rounded-md bg-[#FDB714] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e5a513] sm:w-auto sm:px-8 sm:py-3 sm:text-base">
              Start Donating
            </button>
            <button className="w-full rounded-md border-2 border-white bg-transparent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900 sm:w-auto sm:px-8 sm:py-3 sm:text-base">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};