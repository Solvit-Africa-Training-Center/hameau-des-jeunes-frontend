import React from "react";
import { ChevronRight } from "lucide-react";

export const PhotoGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:px-6 md:p-16">
      <div className="w-full max-w-7xl">
        <section className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 md:mb-16 leading-tight text-center md:text-left">
            A Photo Gallery of
            <br />
            Our Work
          </h1>
          <div className="relative mb-16 ">
            {/* Container with flexible height and centered content */}
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:relative md:h-175">
              {/* Bottom left - Group of children */}
              <div className="w-full max-w-sm h-64 sm:h-72 md:absolute md:left-50  md:bottom-55 md:w-45 md:h-32.5">
                <img
                  src="https://images.unsplash.com/photo-1602181047856-c07f6c5d6353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGRyZW4lMjBncm91cCUyMHNtaWxpbmd8ZW58MXx8fHwxNzY5NTA5NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Group of children"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Center left - Family portrait */}
              <div className="w-full max-w-sm h-80 sm:h-96 md:absolute md:left-100 md:top-60 md:w-45 md:h-60">
                <img
                  src="https://images.unsplash.com/photo-1577897113176-6888367369bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFtaWx5JTIwcG9ydHJhaXQlMjBoYXBweXxlbnwxfHx8fDE3Njk1MDk0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Family portrait"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Center - Women in traditional dress */}
              <div className="w-full max-w-sm h-96 sm:h-112 md:absolute md:left-150 md:top-20 md:w-45 md:h-65">
                <img
                  src="https://images.unsplash.com/photo-1625989744655-9bff7a23dac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzfGVufDF8fHx8MTc2OTUwOTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Women in traditional dress"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Top right - Vintage portrait */}
              <div className="w-full max-w-sm h-80 sm:h-96 md:absolute md:right-75 md:-top-10 md:w-45 md:h-60">
                <img
                  src="https://images.unsplash.com/photo-1690997711855-5d7a3fc9df33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWZyaWNhbiUyMHdvbWVuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTA5NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Vintage portrait"
                  className="w-full h-full object-cover rounded-sm grayscale"
                />
              </div>

              {/* Right middle - Children standing */}
              <div className="w-full max-w-sm h-64 sm:h-72 md:absolute md:right-75 md:top-55 md:w-45 md:h-30">
                <img
                  src="https://images.unsplash.com/photo-1761666520015-5675ff0795b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGRyZW4lMjBzdGFuZGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzY5NTA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Children standing outdoor"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Bottom center-right - Family in colorful clothing */}
              <div className="w-full max-w-sm h-64 sm:h-72 md:absolute md:left-150 md:top-90 md:bottom-0 md:w-96 md:h-30">
                <img
                  src="https://images.unsplash.com/photo-1694286080811-e5e416f4fdb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFtaWx5JTIwY29sb3JmdWwlMjBjbG90aGluZ3xlbnwxfHx8fDE3Njk1MDk0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Family in colorful clothing"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-8 md:mt-0">
            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 rounded-md text-gray-900 hover:bg-gray-50 transition-colors font-medium">
              View Our Gallery
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
