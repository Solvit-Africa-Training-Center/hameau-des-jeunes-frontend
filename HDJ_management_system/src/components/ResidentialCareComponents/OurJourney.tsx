const residentialCareStats = [
  { id: 1, numbers: "1987", label: "Foundation by Father Hermann" },
  { id: 2, numbers: "1994", label: "Genocide & Rebuilding" },
  { id: 3, numbers: "2000s", label: "Evolution to Family-Style Model" },
  { id: 4, numbers: "Today", label: "120+ Children in Care" },
];

export const OurJourney = () => {
  return (
    <>
      <section className="bg-[#F9F5EF] px-10 py-14 md:px-16 lg:px-24 space-y-10">
        <div className="flex items-center gap-2 max-w-5xl mx-auto">
          {/* <GoDotFill size={15} className="text-[#4DA3FF]" /> */}
          <h1 className="text-[#494A49] text-sm md:text-base">Our Journey</h1>
        </div>

        {/* Title */}
        {/* <h1 className="text-center text-[#0F3D2E] font-bold text-2xl md:text-3xl lg:text-4xl">
          How We Create Safe Pathways Forward
        </h1> */}

        {/* Paragraphs */}
        <div className="max-w-4xl mx-auto space-y-6 px-15">
          <p className="text-black text-sm text-justify font-semibold md:text-base  leading-relaxed">
            This work began when Father Hermann started walking the streets with
            a small group of boys, teaching them basic trades and offering
            guidance and direction. With the support of friends abroad, this
            effort grew into an orphanage that provided food, shelter, and
            schooling.
          </p>

          <p className="text-black text-sm md:text-base font-semibold text-justify leading-relaxed">
            The 1994 genocide against the Tutsi devastated the community and the
            orphanage itself. After the genocide, Father Hermann returned to
            rebuild. Over time, the program evolved into the residential care
            model we run today — a family-style village dedicated to restoring
            dignity, stability, and opportunity for vulnerable children.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 mx-28  md:grid-cols-4 md:mx-24 gap-10 my-14">
          {residentialCareStats.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <h1 className="text-[#0F3D2E] font-bold text-3xl md:text-4xl">
                {item.numbers}
              </h1>
              <p className="text-sm text-[#646B76]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
