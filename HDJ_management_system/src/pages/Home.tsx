import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TopNavBar } from "@/components/TopNavBar";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Impact } from "@/components/Impact";
import { WhatWeDo } from "@/components/WhatWeDo";
import { StoriesOfChange } from "@/components/StoriesOfChange";
import { PhotoGallery } from "@/components/PhotoGallery";
import { MeetOurTeam } from "@/components/MeetOurTeam";
import { Fundraising } from "@/components/Fundraising";
import { GetInTouch } from "@/components/GetInTouch";

export const Home = () => {
  return (
    <>
      <TopNavBar />
      <HeroSection />
      <WhoWeAre />
      <WhatWeDo />
      <Impact />
      <StoriesOfChange />
      <PhotoGallery />
      <MeetOurTeam />
      <Fundraising />
      <GetInTouch />
      <Footer />
    </>
  );
};
