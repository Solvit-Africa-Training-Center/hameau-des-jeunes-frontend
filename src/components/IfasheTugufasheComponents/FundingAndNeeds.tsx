import { GoPeople } from "react-icons/go";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { PiPlant } from "react-icons/pi";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const fundingData = [
  {
    id: 1,
    icon: HiArrowTrendingUp,
    title: "Flexible Operating Funds",
    description:
      "Support for family needs including education, health insurance, and emergency assistance",
  },
  {
    id: 2,
    icon: PiPlant,
    title: "Seed Funding",
    description:
      "Capital for small businesses, livestock, and agricultural inputs to build family livelihoods",
  },
  //   {
  //     id: 3,
  //     icon: GoPeople,
  //     title: "Strategic Partnerships",
  //     description:
  //       "Collaboration opportunities for vocational training, market access, and scaling impact across more communities",
  //   },
];

export const FundingAndNeeds = () => {
  return (
    <>
      <section className="bg-[#FAFAFA]  px-6 py-14 md:px-10 lg:px-5 space-y-8">
        <div>
          <h1 className="text-2xl text-center font-bold text-[#0F3D2E]">
            Funding & Needs
          </h1>
          <div className="flex gap-2 text-sm font-light items-center justify-center">
            <h1>
              The program is supported by European partners and local
              contributions but <br /> requires additional funding to expand.
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-12 gap-x-1 gap-y-6 px-5 py-5 max-w-5xl mx-auto">
          {fundingData.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                className="bg-white drop-shadow-gray-100 rounded-xl  md:w-[500px] py-6"
                key={item.id}
              >
                <div
                  className={`bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black
                    ${item.id === 1 ? "bg-blue-200 text-blue-500" : "bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black"}
                    ${item.id === 2 ? "bg-[#FCE8B0] text-[#F6C333]" : "bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center "}`}
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

        {/* ONE CARD */}
        <div className="flex md:items-center md:justify-center md:ml-8 ml-5">
          <Card className="bg-white drop-shadow-gray-100 rounded-xl  w-[515px]  lg:w-[1030px] py-6">
            <div
              className={`bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black`}
            >
              <GoPeople size={20} />
            </div>
            <CardHeader>
              <CardTitle className="font-bold  ">
                Strategic Partnerships
              </CardTitle>
              <CardDescription className="text-sm  text-black text-justify">
                Collaboration opportunities for vocational training, market
                access, and scaling impact across more communities
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </>
  );
};
