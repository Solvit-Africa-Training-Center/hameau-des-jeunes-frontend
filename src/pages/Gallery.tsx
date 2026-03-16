import { Footer } from "@/components/Footer";
import { TopNavBar } from "@/components/TopNavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gallery from "@/assets/gallery.jpg";
import {
  useGetGalleryCategoriesQuery,
  useGetGalleryMediaQuery,
} from "@/store/api/galleryApi";

function Gallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [preview, setPreview] = useState<string | null>(null);

  const { data: categories = [], isLoading: loadingCats } =
    useGetGalleryCategoriesQuery();
  const { data: mediaList = [], isLoading: loadingMedia } =
    useGetGalleryMediaQuery();

  // Filter media by active category
  const visibleMedia =
    activeCategory === "all"
      ? mediaList.filter((m) => m.is_public)
      : mediaList.filter((m) => m.is_public && m.category === activeCategory);

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
              Moments of hope, growth, and transformation captured through the
              lens of our daily work with children and communities
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0f3d2e] mb-2">
                  {mediaList.length}+
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Photos Captured
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0f3d2e] mb-2">
                  {categories.length}+
                </div>
                <p className="text-gray-600 text-sm md:text-base">Categories</p>
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
                Each photograph tells a story of resilience, growth, and hope.
                Browse through different aspects of our work and witness the
                transformation happening every day.
              </p>
            </div>

            {/* Category Filters */}
            {loadingCats ? (
              <div className="flex justify-center mb-12">
                <p className="text-gray-400 text-sm">Loading categories…</p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {/* "All" tab */}
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeCategory === "all"
                      ? "bg-[#0f3d2e] text-white"
                      : "bg-white text-[#0f3d2e] border-2 border-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white"
                  }`}
                >
                  All photos ({mediaList.filter((m) => m.is_public).length})
                </button>

                {/* Dynamic category tabs */}
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-[#0f3d2e] text-white"
                        : "bg-white text-[#0f3d2e] border-2 border-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white"
                    }`}
                  >
                    {cat.name} ({cat.media_count})
                  </button>
                ))}
              </div>
            )}

            {/* Photo Grid */}
            {loadingMedia ? (
              <div className="flex justify-center py-16">
                <p className="text-gray-400">Loading photos…</p>
              </div>
            ) : visibleMedia.length === 0 ? (
              <div className="flex justify-center py-16">
                <p className="text-gray-400">No photos in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleMedia.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-4/3 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                      onClick={() => setPreview(item.media_url)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Preview modal */}
            {preview && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                onClick={() => setPreview(null)}
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-full rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </section>

        {/* Be Part of Our Story Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0f3d2e] text-white rounded-xl py-12 px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Be Part of Our Story
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Every photo represents a life touched, a future brightened, and
                hope restored. Your support helps us continue creating these
                moments of transformation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate("/donate")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-[#0f3d2e] font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Support Our Work
                </button>
                <button
                  onClick={() => navigate("/programs")}
                  className="bg-white hover:bg-gray-100 text-[#0f3d2e] font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Visit Our Programs
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

export default Gallery;
