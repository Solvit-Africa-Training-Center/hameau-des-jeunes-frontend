import { useGetAboutUsQuery } from "@/store/api/aboutUsApi";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaBullseye } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export const MissionAndVision = () => {
  const { data } = useGetAboutUsQuery();
  const about = data?.results?.[0];

  return (
    <section>
      <div className="flex items-center justify-center gap-5 px-7 md:grid-cols-1 py-10 sm:px-7 sm:gap-10">
        <Card className="bg-[#0F3D2E] rounded-xl w-[500px] py-10">
          <div className="bg-button-yellow rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-white">
            <FaBullseye size={20} />
          </div>
          <CardHeader>
            <CardTitle className="font-bold text-white">Our Mission</CardTitle>
            <CardDescription className="text-sm font-light text-white text-justify">
              {about?.our_mission}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-[#4DA3FF] rounded-xl  w-[500px] py-10">
          <div className="bg-button-yellow rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-white">
            <MdOutlineRemoveRedEye size={20} />
          </div>
          <CardHeader>
            <CardTitle className="font-bold text-white ">Our Mission</CardTitle>
            <CardDescription className="text-sm font-light text-white text-justify">
              {about?.our_vision}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};
