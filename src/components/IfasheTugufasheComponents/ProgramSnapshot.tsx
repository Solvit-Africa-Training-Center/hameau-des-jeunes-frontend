import { FaDiamond } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const programData = [
  {
    id: 1,
    icon: MdOutlineLocationOn,
    title: "Location",
    description: "Musha, Rwamagana District, Rwanda",
  },
  {
    id: 2,
    icon: CiCalendar,
    title: "Founded",
    description: "1997 (originally Twese Hamwe",
  },
  {
    id: 3,
    icon: GoPeople,
    title: "Families Supported",
    description: "420 households",
  },
];

const whoWeServeCards = [
  {
    id: 1,
    title: "Who We Serve",
    description:
      "Vulnerable families in nearby communities, prioritizing families of children in residential care",
  },
  {
    id: 2,
    title: "Core Approach",
    description: "Work-for-support partnership model",
  },
];

export const ProgramSnapshot = () => {
  return (
    <>
      <section className="bg-white px-6 py-14 md:px-10 lg:px-5 space-y-8">
        <div>
          <div className="flex gap-2 text-sm font-light items-center justify-center">
            <FaDiamond size={15} className="text-[#4DA3FF]" />
            <h1>Program at a Glance</h1>
          </div>
          <h1 className="text-2xl text-center font-bold text-[#0F3D2E]">
            Program Snapshot
          </h1>
        </div>

        {/* THREE FIRST CARDS */}

        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:gap-5 gap-x-1 gap-y-6 px-5 py-5 max-w-5xl mx-auto">
          {programData.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                className="bg-white drop-shadow-gray-100 rounded-xl  md:w-[300px] py-6"
                key={item.id}
              >
                <div
                  className={`bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black
                    ${item.id === 1 ? "bg-blue-200 text-blue-500" : "bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black"}
                    ${item.id === 2 ? "bg-[#FCE8B0] text-[#F6C333]" : "bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black"}`}
                >
                  <Icon size={20} />
                </div>
                <CardHeader>
                  <CardTitle className="font-bold  ">{item.title}</CardTitle>
                  <CardDescription className="text-sm  text-black text-justify">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* TWO CARDS */}
        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center gap-x-14 gap-y-6   max-w-5xl mx-auto">
          {whoWeServeCards.map((item) => {
            return (
              <Card
                className={`bg-white drop-shadow-gray-100 rounded-xl  md:w-[450px] py-6 
                 ${item.id === 1 ? "bg-[#EDF6FF]" : "py-8 bg-[#FEF8E6]"}`}
                key={item.id}
              >
                <CardHeader>
                  <CardTitle className="font-bold  ">{item.title}</CardTitle>
                  <CardDescription className="text-sm  text-black text-justify">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* ONE CARD */}
        <div className="flex md:items-center justify-center">
          <Card className="bg-[#F3F5F4] drop-shadow-gray-100 rounded-xl w-[700px] md:w-[950px] py-6">
            <CardHeader>
              <CardTitle className="font-bold  ">Primary Goal</CardTitle>
              <CardDescription className="text-sm  text-black text-justify">
                Keep families together and prevent children from returning to
                the streets
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </>
  );
};
