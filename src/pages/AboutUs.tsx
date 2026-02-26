import { TopNavBar } from "@/components/TopNavBar";
import aboutImage from "@/assets/people.jpg";

import { Footer } from "@/components/Footer";
import { OurStory } from "@/components/AboutUsComponents/OurStory";
import { MissionAndVision } from "@/components/AboutUsComponents/MissionAndVision";
import { OurCoreValues } from "@/components/AboutUsComponents/OurCoreValues";
import { MeetOurTeam } from "@/components/AboutUsComponents/MeetOurTeam";

export const AboutUs = () => {
  return (
    <>  
      <TopNavBar />
      <section className="relative h-100 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutImage})` }}
        >
          <div className="absolute inset-0 bg-teal-900/70"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 text-yellow-500">
            About us
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn about our journey, mission, and the values that guide our work
            in supporting vulnerable children and families in Rwanda.
          </p>
        </div>
      </section>
      <OurStory />
      <MissionAndVision />
      <OurCoreValues />
      <MeetOurTeam />
      <Footer />
    </>
  );
};
