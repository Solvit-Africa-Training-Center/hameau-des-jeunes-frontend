import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";
import { Fundraising } from "./components/Fundraising";
import { GetInTouch } from "./components/GetInTouch";
import { Impact } from "./components/Impact";
import { MeetOurTeam } from "./components/MeetOurTeam";
import { PhotoGallery } from "./components/PhotoGallery";
import { StoriesOfChange } from "./components/StoriesOfChange";
import { WhatWeDo } from "./components/WhatWeDo";
import { WhoWeAre } from "./components/WhoWeAre";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <main className="pt-14 sm:pt-16">
          <WhoWeAre />
          <WhatWeDo />
          <Impact />
          <StoriesOfChange />
          <PhotoGallery />
          <MeetOurTeam />
          <Fundraising/>
          <GetInTouch/>
        </main>
      </div>
    </>
  );
}


export default App;
