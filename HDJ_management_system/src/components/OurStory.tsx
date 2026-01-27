import ourStoryImage from "@/assets/photo_story.png";

export const OurStory = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#FAFAFA] px-6 md:px-16 lg:px-30 py-16">
      {/* LEFT: TEXT */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-1 bg-blue-400" />
          <h1 className="text-button-yellow text-sm md:text-base">
            A loving home, a brighter tomorrow
          </h1>
        </div>

        <h1 className="font-bold text-3xl md:text-5xl mb-5">Who We Are</h1>

        <p className="mb-10 text-sm md:text-base leading-relaxed">
          <span className="font-bold">Hameau des Jeunes Saint Kizito </span>
          is a youth village with a history deeply rooted in caring for Rwanda’s
          most vulnerable children. We provide residential care, education, and
          hands-on vocational training, and we partner with families and
          communities to create lasting pathways to self-reliance. Today, we
          house 70 children, have served 2,000+ children over the decades, and
          run 7 core programs that combine care, learning, and livelihood.
        </p>

        <h1 className="font-bold text-3xl md:text-5xl mb-5">Our Story</h1>

        <p className="text-sm md:text-base leading-relaxed">
          Founded more than five decades ago by Father Hermann, what began as
          informal street outreach and skill-teaching grew into a safe haven for
          children who had nowhere else to go. With early support from friends
          in Europe, the project became a youth village offering food, shelter,
          and schooling, and most importantly, purpose in life.
        </p>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="relative mx-auto md:mx-7 w-full max-w-lg">
        {/* Yellow bar – hidden on small screens */}
        <div className="hidden md:block absolute -left-2.5 top-[5%]  h-[90%] w-[10px] bg-button-yellow rounded-bl-3xl rounded-tl-3xl" />

        <img
          src={ourStoryImage}
          alt="our_story_image"
          className="w-full object-cover rounded-2xl"
        />
      </div>
    </section>
  );
};
