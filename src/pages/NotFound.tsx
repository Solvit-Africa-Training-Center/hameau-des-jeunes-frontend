import { Footer } from "@/components/Footer";
import { TopNavBar } from "@/components/TopNavBar";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-50 font-poppins">
      <TopNavBar />

      <main className="flex-grow flex items-center justify-center px-4 py-28">
        <div className="text-center animate-fade-in max-w-md w-full">
          <h1 className="text-[80px] sm:text-[100px] md:text-[120px] font-bold text-[#0f3d2e] leading-none">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0f3d2e] mb-4">
            Page not found
          </h2>
          <p className="text-sm sm:text-base md:text-lg  text-gray-600 mb-6">
            Oups ! The page you're looking for doesn't exist of has been
            displaced.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary-500 hover:font-bold text-[#0f3d2e] text-sm sm:text-base px-5 py-2.5 rounded-lg transition duration-300"
          >
            Back to home page
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
