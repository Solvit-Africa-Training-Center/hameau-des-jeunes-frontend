import { TopNavBar } from "@/components/TopNavBar";
import aboutImage from "@/assets/hameadu_des_jeunes_community.jpeg";

import { Footer } from "@/components/Footer";
import { OurStory } from "@/components/AboutUsComponents/OurStory";
import { MissionAndVision } from "@/components/AboutUsComponents/MissionAndVision";
import { OurCoreValues } from "@/components/AboutUsComponents/OurCoreValues";
import { MeetOurTeam } from "@/components/AboutUsComponents/MeetOurTeam";

export const AboutUs = () => {
  return (
    <>
      <TopNavBar />
      <header
        className="relative h-64 sm:h-80 md:h-96 lg:h-68 flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6)),url(${aboutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-2xl text-button-yellow sm:text-5xl md:text-5xl lg:text-5xl font-bold mb-2 leading-tight">
            About us
          </h1>
          <p className="justify-center text-white md:text-2xl  sm:text-sm">
            Learn about our journey, mission, and the values that guide our work
            in supporting vulnerable children and families in Rwanda.
          </p>
        </div>
      </header>
      <OurStory />
      <MissionAndVision />
      <OurCoreValues />
      <MeetOurTeam />
      <Footer />
    </>
  );
};
