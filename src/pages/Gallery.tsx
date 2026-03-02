import { Footer } from '@/components/Footer'
import { TopNavBar } from '@/components/TopNavBar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gallery from "@/assets/gallery.jpg"
import g2 from "@/assets/rwanda_2006/DSC_6100.jpg";
import g3 from "@/assets/rwanda_2006/DSC_6112.jpg";
import g4 from "@/assets/rwanda_2006/DSC_6117.jpg";
import g5 from "@/assets/rwanda_2006/DSC_6121.jpg";
import g6 from "@/assets/rwanda_2006/DSC_6264.jpg";
import g7 from "@/assets/rwanda_2006/DSC_6272.jpg";
import g8 from "@/assets/rwanda_2006/DSC_6273.jpg";
import g9 from "@/assets/rwanda_2006/DSC_6281.jpg";
import g10 from "@/assets/rwanda_2006/DSC_6273.jpg";
import g11 from "@/assets/rwanda_2006/DSC_6281.jpg";
import g12 from "@/assets/rwanda_2006/DSC_6285.jpg";
import g13 from "@/assets/rwanda_2006/DSC_6367.jpg";
import g14 from "@/assets/rwanda_2006/DSC_6460.jpg";
import g15 from "@/assets/rwanda_2006/DSC_6458.jpg";
import g16 from "@/assets/rwanda_2006/DSC_6468.jpg";
import g17 from "@/assets/rwanda_2006/DSC_6472.jpg";
import g18 from "@/assets/rwanda_2006/DSC_6482.jpg";
import g19 from "@/assets/rwanda_2006/DSC_6488.jpg";
import g20 from "@/assets/rwanda_2006/DSC_6596.jpg";
import g21 from "@/assets/rwanda_2006/DSC_6672.jpg";
import g22 from "@/assets/rwanda_2006/DSC_6680.jpg";
import g23 from "@/assets/rwanda_2006/DSC_6682.jpg";
import g24 from "@/assets/rwanda_2006/DSC_6729.jpg";
import g25 from "@/assets/rwanda_2006/DSC_6732.jpg";
import g26 from "@/assets/rwanda_2006/DSC_6733.jpg";
import g27 from "@/assets/rwanda_2006/DSC_6736.jpg";
import g28 from "@/assets/rwanda_2006/DSC_6752.jpg";
import g29 from "@/assets/rwanda_2006/DSC_6754.jpg";
import g30 from "@/assets/rwanda_2006/DSC_6755.jpg";
import g31 from "@/assets/rwanda_2006/DSC_6820.jpg";
import g32 from "@/assets/rwanda_2006/DSC_6821.jpg";
import g33 from "@/assets/rwanda_2006/DSC_6853.jpg";
import g34 from "@/assets/rwanda_2006/DSC_6889.jpg";
import g35 from "@/assets/rwanda_2006/DSC_6895.jpg";
import g36 from "@/assets/rwanda_2006/DSC_6896.jpg";
import g37 from "@/assets/rwanda_2006/DSC_6897.jpg";
import g38 from "@/assets/rwanda_2006/DSC_6898.jpg";
import g39 from "@/assets/rwanda_2006/DSC_6907.jpg";
import g40 from "@/assets/rwanda_2006/DSC_6909.jpg";
import g41 from "@/assets/rwanda_2006/DSC_6911.jpg";
import g42 from "@/assets/rwanda_2006/DSC_6917.jpg";
import g43 from "@/assets/rwanda_2006/DSC_6957.jpg";
import g44 from "@/assets/rwanda_2006/DSC_6958.jpg";
import g45 from "@/assets/rwanda_2006/DSC_6959.jpg";
import g46 from "@/assets/rwanda_2006/DSC_6960.jpg";
import g47 from "@/assets/rwanda_2006/DSC_6961.jpg";
import g48 from "@/assets/rwanda_2006/DSC_6962.jpg";
import g49 from "@/assets/rwanda_2006/DSC_6963.jpg";
import g50 from "@/assets/rwanda_2006/DSC_6969.jpg";
import g51 from "@/assets/rwanda_2006/DSC_6979.jpg";
import g52 from "@/assets/rwanda_2006/DSC_6981.jpg";
import g53 from "@/assets/rwanda_2006/DSC_7000.jpg";
import g54 from "@/assets/rwanda_2006/DSC_7002.jpg";
import g55 from "@/assets/rwanda_2006/DSC_7010.jpg";
import g56 from "@/assets/rwanda_2006/DSC_7011.jpg";
import g57 from "@/assets/rwanda_2006/DSC_7012.jpg";
import g58 from "@/assets/rwanda_2006/DSC_7013.jpg";
import g59 from "@/assets/rwanda_2006/DSC_7016.jpg";
import g60 from "@/assets/rwanda_2006/DSC_7017.jpg";
import g61 from "@/assets/rwanda_2006/DSC_7018.jpg";
import g62 from "@/assets/rwanda_2006/DSC_7037.jpg";
import g63 from "@/assets/rwanda_2006/DSC_7038.jpg";
import g64 from "@/assets/rwanda_2006/DSC_7040.jpg";
import g65 from "@/assets/rwanda_2006/DSC_7042.jpg";
import g66 from "@/assets/rwanda_2006/DSC_7048.jpg";
import g67 from "@/assets/rwanda_2006/DSC_7105.jpg";
import g68 from "@/assets/rwanda_2006/DSC_7107.jpg";
import g69 from "@/assets/rwanda_2006/DSC_7108.jpg";
import g70 from "@/assets/rwanda_2006/DSC_7109.jpg";
import g71 from "@/assets/rwanda_2006/DSC_7110.jpg";
import g72 from "@/assets/rwanda_2006/DSC_7111.jpg";
import g73 from "@/assets/rwanda_2006/DSC_7112.jpg";
import g74 from "@/assets/rwanda_2006/DSC_7121.jpg";
import g75 from "@/assets/rwanda_2006/DSC_7122.jpg";
import g76 from "@/assets/rwanda_2006/DSC_7130.jpg";
import g77 from "@/assets/rwanda_2006/DSC_7136.jpg";
import g78 from "@/assets/rwanda_2006/DSC_7138.jpg";
import g79 from "@/assets/rwanda_2006/DSC_7139.jpg";
import g80 from "@/assets/rwanda_2006/DSC_7145.jpg";
import g81 from "@/assets/rwanda_2006/DSC_7146.jpg";
import g82 from "@/assets/rwanda_2006/DSC_7147.jpg";
import g83 from "@/assets/rwanda_2006/DSC_7148.jpg";
import g84 from "@/assets/rwanda_2006/DSC_7157.jpg";
import g85 from "@/assets/rwanda_2008/_EMA1616.jpg";
import g86 from "@/assets/rwanda_2008/_EMA1619.jpg";
import g87 from "@/assets/rwanda_2008/_EMA1620.jpg";
import g88 from "@/assets/rwanda_2008/_EMA1621.jpg";
import g89 from "@/assets/rwanda_2008/_EMA1622.jpg";
import g90 from "@/assets/rwanda_2008/_EMA1623.jpg";
import g91 from "@/assets/rwanda_2008/_EMA1624.jpg";
import g92 from "@/assets/rwanda_2008/_EMA1626.jpg";
import g93 from "@/assets/rwanda_2008/_EMA1627.jpg";
import g94 from "@/assets/rwanda_2008/_EMA1644.jpg";
import g95 from "@/assets/rwanda_2008/_EMA1646.jpg";
import g96 from "@/assets/rwanda_2008/_EMA1648.jpg";
import g97 from "@/assets/rwanda_2008/_EMA1649.jpg";
import g98 from "@/assets/rwanda_2008/_EMA1653.jpg";
import g99 from "@/assets/rwanda_2008/_EMA1654.jpg";
import g100 from "@/assets/rwanda_2008/_EMA1662.jpg";
import g101 from "@/assets/rwanda_2008/_EMA1664.jpg";
import g102 from "@/assets/rwanda_2008/_EMA1666.jpg";
import g103 from "@/assets/rwanda_2008/_EMA1676.jpg";
import g104 from "@/assets/rwanda_2008/_EMA1679.jpg";
import g105 from "@/assets/rwanda_2008/_EMA1700.jpg";
import g106 from "@/assets/rwanda_2008/_EMA1705.jpg";
import g107 from "@/assets/rwanda_2008/_EMA1706.jpg";
import g108 from "@/assets/rwanda_2008/_EMA1709.jpg";
import g109 from "@/assets/rwanda_2008/_EMA1714.jpg";
import g110 from "@/assets/rwanda_2008/_EMA1731.jpg";
import g111 from "@/assets/rwanda_2008/_EMA1736.jpg";
import g112 from "@/assets/rwanda_2008/_EMA1737.jpg";
import g113 from "@/assets/rwanda_2008/_EMA1738.jpg";
import g114 from "@/assets/rwanda_2008/_EMA1741.jpg";
import g115 from "@/assets/rwanda_2008/_EMA1742.jpg";
import g116 from "@/assets/rwanda_2008/_EMA1746.jpg";
import g117 from "@/assets/rwanda_2008/_EMA1748.jpg";
import g118 from "@/assets/rwanda_2008/_EMA1752.jpg";
import g119 from "@/assets/rwanda_2008/_EMA1768.jpg";
import g120 from "@/assets/rwanda_2008/_EMA1771.jpg";
import g121 from "@/assets/rwanda_2008/_EMA1779.jpg";
import g122 from "@/assets/rwanda_2008/_EMA1781.jpg";
import g123 from "@/assets/rwanda_2008/_EMA1783.jpg";
import g124 from "@/assets/rwanda_2008/_EMA1784.jpg";
import g125 from "@/assets/rwanda_2008/_EMA1786.jpg";
import g126 from "@/assets/rwanda_2008/_EMA1788.jpg";
import g127 from "@/assets/rwanda_2008/_EMA1792.jpg";
import g128 from "@/assets/rwanda_2008/_EMA1794.jpg";
import g129 from "@/assets/rwanda_2008/_EMA1803.jpg";
import g130 from "@/assets/rwanda_2008/_EMA1805.jpg";
import g131 from "@/assets/rwanda_2008/_EMA1806.jpg";
import g132 from "@/assets/rwanda_2008/_EMA1807.jpg";
import g133 from "@/assets/rwanda_2008/_EMA1811.jpg";
import g134 from "@/assets/rwanda_2008/_EMA1812.jpg";
import g135 from "@/assets/rwanda_2008/_EMA1818.jpg";
import g136 from "@/assets/rwanda_2008/_EMA1822.jpg";
import g137 from "@/assets/rwanda_2008/_EMA1826.jpg";
import g138 from "@/assets/rwanda_2008/_EMA1827.jpg";
import g139 from "@/assets/rwanda_2008/_EMA1834.jpg";
import g140 from "@/assets/rwanda_2008/_EMA1851.jpg";
import g141 from "@/assets/rwanda_2008/_EMA1852.jpg";
import g142 from "@/assets/rwanda_2008/_EMA1861.jpg";
import g143 from "@/assets/rwanda_2008/_EMA1864.jpg";
import g144 from "@/assets/rwanda_2008/_EMA1870.jpg";
import g145 from "@/assets/rwanda_2008/_EMA1871.jpg";
import g146 from "@/assets/rwanda_2008/_EMA1872.jpg";
import g147 from "@/assets/rwanda_2008/_EMA1874.jpg";
import g148 from "@/assets/rwanda_2008/_EMA1875.jpg";
import g149 from "@/assets/rwanda_2008/_EMA1877.jpg";
import g150 from "@/assets/rwanda_2008/_EMA1880.jpg";
import g151 from "@/assets/rwanda_2008/_EMA1881.jpg";
import g152 from "@/assets/rwanda_2008/_EMA1882.jpg";
import g153 from "@/assets/rwanda_2008/_EMA1883.jpg";
import g154 from "@/assets/rwanda_2008/_EMA1886.jpg";
import g155 from "@/assets/rwanda_2008/_EMA1890.jpg";
import g156 from "@/assets/rwanda_2008/_EMA1895.jpg";
import g157 from "@/assets/rwanda_2008/_EMA1898.jpg";
import g158 from "@/assets/rwanda_2008/_EMA1902.jpg";
import g159 from "@/assets/rwanda_2008/_EMA1903.jpg";
import g160 from "@/assets/rwanda_2008/_EMA1905.jpg";
import g161 from "@/assets/rwanda_2008/_EMA1914.jpg";
import g162 from "@/assets/rwanda_2008/_EMA1919.jpg";
import g163 from "@/assets/rwanda_2008/_EMA1920.jpg";
import g164 from "@/assets/rwanda_2008/_EMA1921.jpg";
import g165 from "@/assets/rwanda_2008/_EMA1923.jpg";
import g166 from "@/assets/rwanda_2008/_EMA1950.jpg";
import g167 from "@/assets/rwanda_2008/_EMA1955.jpg";
import g168 from "@/assets/rwanda_2008/_EMA1961.jpg";



function Gallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const allPhotos = [ g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36, g37, g38, g39, g40, g41, g42, g43, g44, g45, g46, g47, g48, g49, g50, g51, g52, g53, g54, g55, g56, g57, g58, g59, g60, g61, g62, g63, g64, g65, g66, g67, g68, g69, g70, g71, g72, g73, g74, g75, g76, g77, g78, g79, g80, g81, g82, g83, g84,g85,g86,g87,g88,g89,g90,g91,g92,g93,g94,g95,g96,g97,g98,g99,g100,g101,g102,g103,g104,g105,g106,g107,g108,g109,g110,g111,g112,g113,g114,g115,g116,g117,g118,g119,g120,g121,g122,g123,g124,g125,g126,g127,g128,g129,g130,g131,g132,g133,g134,g135,g136,g137,g138,g139,g140,g141,g142,g143,g144,g145,g146,g147,g148,g149,g150,g151,g152,g153,g154,g155,g156,g157,g158,g159,g160,g161,g162,g163,g164,g165,g166,g167,g168];
  const partnersPhotos = [g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36, g37, g38, g39, g40, g41, g42, g43, g44, g45, g46, g47, g48, g49, g50, g51, g52, g53, g54, g55, g56, g57, g58, g59, g60, g61, g62, g63, g64, g65, g66, g67, g68, g69, g70, g71, g72, g73, g74, g75, g76, g77, g78, g79, g80, g81, g82, g83, g84];
  const studentsPhotos = [ g2, g3, g13, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36, g37, g38, g39, g40, g41, g42, g43, g44, g45, g46, g47, g48, g49, g50, g51, g52, g53, g54, g55, g56, g57, g58, g59, g60, g61, g62, g63, g64, g65, g66, g67, g68, g69, g70, g71, g72, g73, g74, g75, g76, g77, g78, g79, g80, g81, g82, g83, g84];
  const communityPhotos = [ g2, g3, g4, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36, g37, g38, g39, g40, g41, g42, g43, g44, g45, g46, g47, g48, g49, g50, g51, g52, g53, g54, g55, g56, g57, g58, g59, g60, g61, g62, g63, g64, g65, g66, g67, g68, g69, g70, g71, g72, g73, g74, g75, g76, g77, g78, g79, g80, g81, g82, g83, g84];
  const ourWorksPhotos = [ g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36, g37, g38, g39, g40, g41, g42, g43, g44, g45, g46, g47, g48, g49, g50, g51, g52, g53, g54, g55, g56, g57, g58, g59, g60, g61, g62, g63, g64, g65, g66, g67, g68, g69, g70, g71, g72, g73, g74, g75, g76, g77, g78, g79, g80, g81, g82, g83, g84];
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
  const [preview, setPreview] = useState<string | null>(null);

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
                    onClick={() => setPreview(photo)}
                  />
                </div> 
              ))}
                 </div>
              {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreview(null)} // close on click outside
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