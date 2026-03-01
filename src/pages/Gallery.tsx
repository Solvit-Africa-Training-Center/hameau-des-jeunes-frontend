import { Footer } from '@/components/Footer'
import { TopNavBar } from '@/components/TopNavBar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gallery from "@/assets/gallery.jpg"
import g1 from "@/assets/rwanda_2006/DSC_6099.jpg";
import g2 from "@/assets/rwanda_2006/DSC_6100--.jpg";
import g3 from "@/assets/rwanda_2006/DSC_6121.jpg";
import g4 from "@/assets/rwanda_2006/DSC_7108.jpg";
import g5 from "@/assets/rwanda_2006/DSC_6174--.jpg";
import g6 from "@/assets/rwanda_2006/DSC_6264--.jpg";
import g7 from "@/assets/rwanda_2006/DSC_6272--.jpg";
import g8 from "@/assets/rwanda_2006/DSC_6273--.jpg";
import g9 from "@/assets/rwanda_2006/DSC_6281--.jpg";
import g10 from "@/assets/rwanda_2006/DSC_6273--.jpg";
import g11 from "@/assets/rwanda_2006/DSC_6281--.jpg";
import g12 from "@/assets/rwanda_2006/DSC_6285--.jpg";
import g13 from "@/assets/rwanda_2006/DSC_6367--.jpg";
import g14 from "@/assets/rwanda_2006/DSC_6460.jpg";
import g15 from "@/assets/rwanda_2006/DSC_6458.jpg";
import g16 from "@/assets/rwanda_2006/DSC_6468.jpg";


function Gallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const allPhotos = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16];
  const partnersPhotos = [g10, g11, g12, g13, g14, g15];
  const studentsPhotos = [g1, g2, g3, g13, g16];
  const communityPhotos = [ g2, g3, g4, g16];
  const ourWorksPhotos = [g1, g2, g15, g16];

  const getPhotos = () => {
    switch (activeCategory) {
      case 'all':
        return allPhotos;
      case 'partners':
        return partnersPhotos;
      case 'students':
        return studentsPhotos;
      case 'community':
        return communityPhotos;
      case 'ourWorks':
        return ourWorksPhotos;
      default:
        return allPhotos;
    }
  };

  const categories = [
    { id: 'all', label: 'All photos(48)' },
    { id: 'partners', label: 'Children & care(18)' },
    { id: 'students', label: 'Education(12)' },
    { id: 'community', label: 'Community Events(10)' },
    { id: 'ourWorks', label: 'Our Facilities(8)' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopNavBar />
      <main>
        {/* Hero Section */}
        <section className="relative h-100 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${gallery})` }}
          >
            <div className="absolute inset-0 bg-teal-900/70"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 text-yellow-500">
              Our Gallery
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Moments of hope, growth, and transformation captured through the lens of our 
              daily work with children and communities
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0f3d2e] mb-2">
                  500+
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Photos Captured
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0f3d2e] mb-2">
                  21
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Years Documented
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0f3d2e] mb-2">
                  1000
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Lives Captured
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0f3d2e] mb-2">
                  50+
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Events Covered
                </p>
              </div>
            </div>
          </div>
        </section>

         {/* Our Story Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f3d2e] mb-4">
                Explore Our Story
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each photography tells a story of resilience, growth, and hope. Browse through different aspects of our work and witness the transformation happening everyday
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-[#0f3d2e] text-white'
                      : 'bg-white text-[#0f3d2e] border-2 border-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getPhotos().map((photo, index) => (
                <div
                  key={index}
                  className="aspect-4/3 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Part of Our Story Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0f3d2e] text-white rounded-xl py-12 px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Be Part of Our Story
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Every photo represents a life touched, a future brightened, and hope restored.
                Your support helps us continue creating these moments of transformation
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('/programs')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-[#0f3d2e] font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Support Our work
                </button>
                <button
                  onClick={() => navigate('/donate')}
                  className="bg-white hover:bg-gray-100 text-[#0f3d2e] font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Visit Our programs
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Gallery