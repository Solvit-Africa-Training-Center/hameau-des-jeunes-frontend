import historyImage from "@/assets/history_image.jpg";

export const HistoryAndEvolution = () => {
  return (
    <>
      <section className="bg-[#FAFAFA]  px-6 py-14 md:px-14 lg:px-32 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT IMAGE SECTION */}
          <div className="relative">
            <img
              src={historyImage}
              alt="Our journey"
              className="w-full h-full object-cover rounded-3xl"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg px-6 py-4 max-w-xs">
              <p className="text-sm text-gray-500">Original Name</p>
              <h3 className="font-semibold text-green-800 mt-1">Twese Hamwe</h3>
              <p className="text-sm text-gray-600 italic">
                “All of us together”
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-blue-500 rotate-45"></span>
              <p className="text-sm text-gray-600">Our Journey</p>
            </div>

            <h2 className="text-3xl font-bold text-green-900 mb-10">
              History & Evolution
            </h2>

            {/* Timeline */}
            <div className="space-y-10">
              {/* Item 1 */}
              <div className="flex gap-6">
                <div className="w-1 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-green-900">1997</p>
                  <h3 className="font-bold text-lg mt-1">
                    Launch as Twese Hamwe
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Launched as Twese Hamwe ("All of us together"), the program
                    emphasized unity and mutual support among vulnerable
                    families in the community.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-6">
                <div className="w-1 bg-yellow-400 rounded-full"></div>
                <div>
                  <p className="font-semibold text-green-900">Evolution</p>
                  <h3 className="font-bold text-lg mt-1">
                    Strategic Transformation
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Over time, it evolved into Ifashe Tugufashe, reflecting a
                    strategic shift toward self-reliance and partnership rather
                    than handouts.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-6">
                <div className="w-1 bg-green-700 rounded-full"></div>
                <div>
                  <p className="font-semibold text-green-900">Today</p>
                  <h3 className="font-bold text-lg mt-1">
                    Core Prevention Pathway
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Today, the program is a core pathway for preventing child
                    abandonment and strengthening community resilience in the
                    region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
