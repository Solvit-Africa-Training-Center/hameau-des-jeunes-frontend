import { TopNavBar } from "@/components/TopNavBar";
import resdentialCarePageImg from "@/assets/residential_care_page_img.png";
import { OurMissionInAction } from "@/components/ResidentialCareComponents/OurMissionInAction";
import { ResidentialCarePathsWays } from "@/components/ResidentialCareComponents/ResidentialCarePathWays";
import { RotatedCards } from "@/components/ResidentialCareComponents/RotatedCards";

export const ResidentialCare = () => {
  return (
    <>
      <TopNavBar />
      <header
        className="relative h-64 sm:h-80 md:h-96 lg:h-[17rem] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6)),url(${resdentialCarePageImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center ",
        }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-2xl text-button-yellow sm:text-5xl md:text-5xl lg:text-5xl font-bold mb-2 leading-tight">
            Restoring home & purpose
          </h1>
          <p className="justify-center text-white md:text-2xl  sm:text-sm">
            Nurturing Hope. Building Futures.
          </p>
        </div>
      </header>
      <OurMissionInAction />
      <ResidentialCarePathsWays />
    </>
  );
};
