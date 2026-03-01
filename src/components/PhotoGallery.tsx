import React from "react";
import { ChevronRight } from "lucide-react";

import g1 from "@/assets/rwanda_2006/DSC_6099.jpg";
import g2 from "@/assets/rwanda_2006/DSC_6896.jpg";
import g3 from "@/assets/rwanda_2006/DSC_6173--.jpg";
import g4 from "@/assets/rwanda_2006/DSC_6229--.jpg";
import g5 from "@/assets/rwanda_2006/DSC_6174--.jpg";
import g6 from "@/assets/rwanda_2006/DSC_6264--.jpg";

export const PhotoGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:px-6 md:p-8">
      <div className="w-full max-w-7xl">
        <section className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 md:mb-16 leading-tight text-center md:text-left">
            A Photo Gallery of
            <br />
            Our Work
          </h1>
          <div className="relative mb-1">
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:relative md:h-175">
              <div className="w-full max-w-sm h-64 sm:h-72 md:absolute md:left-50  md:bottom-55 md:w-45 md:h-32.5">
                <img
                  src={g1}
                  alt="Group of children"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="w-full max-w-sm h-80 sm:h-96 md:absolute md:left-100 md:top-60 md:w-45 md:h-60">
                <img
                  src={g2}
                  alt="Family portrait"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="w-full max-w-sm h-96 sm:h-112 md:absolute md:left-150 md:top-20 md:w-45 md:h-65">
                <img
                  src={g3}
                  alt="Women in traditional dress"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="w-full max-w-sm h-80 sm:h-96 md:absolute md:right-75 md:-top-10 md:w-45 md:h-60">
                <img
                  src={g4}
                  alt="Vintage portrait"
                  className="w-full h-full object-cover rounded-sm grayscale"
                />
              </div>
              <div className="w-full max-w-sm h-64 sm:h-72 md:absolute md:right-75 md:top-55 md:w-45 md:h-30">
                <img
                  src={g5}
                  alt="Children standing outdoor"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="w-full max-w-sm h-64 sm:h-72 md:absolute md:left-150 md:top-90 md:bottom-0 md:w-96 md:h-30">
                <img
                  src={g6}
                  alt="Family in colorful clothing"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center  md:mt-0">
            <a href="/gallery" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 rounded-md text-gray-900 hover:bg-gray-50 transition-colors font-medium">
              View Our Gallery
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
