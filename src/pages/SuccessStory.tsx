import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import impact from "../assets/impact.png";
import { useGetAllSuccessStoriesQuery } from "@/store/api/successStoryApi";
import { useState } from "react";


const SuccessStories = () => {
    const { data: successStories = [], isLoading: isLoadingSuccessStories } = useGetAllSuccessStoriesQuery();
      const [page, setPage] = useState(0);
    
      const PAGE_SIZE = 8;
      const totalPages = Math.ceil(successStories.length / PAGE_SIZE);
      const paginated = successStories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    
    return (
        <div className="min-h-screen flex flex-col">
            <TopNavBar />

            <main className="grow">
                <section className="relative h-100 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${impact})` }}
                    >
                        <div className="absolute inset-0 bg-teal-900/70"></div>
                    </div>

                    <div className="relative z-10 text-center text-white px-4">
                        <h1 className="text-5xl font-bold mb-4 text-yellow-500">
                            Success Stories
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto">
                            Real people, real transformations
                        </p>
                    </div>
                </section>


                {/* Success stories */}

                <section className="py-16 px-8 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                  
                        {isLoadingSuccessStories ? (
                            <div className="p-8 text-center text-sm text-gray-500">
                                Loading testimonials...
                            </div>
                        ) : !paginated?.length ? (
                            <div className="p-8 text-center text-sm text-gray-500">
                                No testimonials yet. Add one to get started.
                            </div>
                        ) :
                            <div>
                                {paginated.map((story, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center mb-16`}
                                    >
                                        <div className="md:w-1/2">
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-100 object-cover rounded-lg shadow-lg"
                                            />
                                        </div>
                                        <div className="md:w-1/2">
                                            <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                {story.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                        {/* Pagination */}
        {!isLoadingSuccessStories && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
              className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
            >
              Next
            </button>
          </div>
        )}
                    </div>

                </section>


            </main>

            <Footer />
        </div>
    );
};

export default SuccessStories;
