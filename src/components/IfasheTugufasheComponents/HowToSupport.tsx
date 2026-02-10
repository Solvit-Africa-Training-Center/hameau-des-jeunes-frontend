import { BsPersonHeart } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { RiHandHeartLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "react-router-dom";

const howToSupportCards = [
  {
    id: 1,
    icon: RiHandHeartLine,
    title: "Donate",
    description: "Flexible gifts allow rapid response to family needs",
    action: "Give Now",
  },
  {
    id: 2,
    icon: GoPeople,
    title: "Sponsor a Family",
    description: "Support education, food, or livelihoods",
    action: "Sponsor Now",
  },
  {
    id: 3,
    icon: BsPersonHeart,
    title: "Volunteer",
    description: "Share skills in agriculture, business, or outreach",
    action: "Get Involved",
  },
  {
    id: 4,
    icon: FaRegHandshake,
    title: "Partner",
    description: "Collaborate on funding, training, or scaling impact",
    action: "Partner With Us",
  },
];

export const HowToSupport = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-[#0F3D2E]  px-6 py-14 md:px-10 lg:px-5 space-y-8">
        <div>
          <h1 className="text-2xl text-center font-bold text-white">
            How to Support
          </h1>
          <div className="flex gap-2 text-sm font-light items-center justify-center  text-white">
            <h1>
              Join us in strengthening families and preventing child abandonment
              through meaningful partnership
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:gap-5 gap-x-1 gap-y-6 px-5 py-5 max-w-5xl mx-auto">
          {howToSupportCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                className="bg-[#0E382A] border-none drop-shadow-gray-100 rounded-xl  md:w-[300px] py-6"
                key={item.id}
              >
                <div className="flex items-center justify-center rounded-full">
                  <div
                    className={` rounded-full w-10 h-10 mx-5 flex items-center justify-center 
                      ${item.id === 1 || item.id === 3 ? "bg-[#4DA3FF] text-white " : "bg-[#F4B400] text-[#0F3D2E]"}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="font-semibold text-center text-white">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm  text-white font-light text-center">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter
                  className="flex items-center justify-center hover:font-bold cursor-pointer"
                  onClick={() => {
                    if (item.id === 1) navigate("/donate");
                    if (item.id === 2) navigate("/donate");
                    if (item.id === 3) navigate("/contact");
                    if (item.id === 4) navigate("/contact");
                  }}
                >
                  <div
                    className={`flex items-center justify-center gap-2 font-light text-sm hover:font-bold
                    ${item.id === 1 || item.id === 3 ? "text-[#4DA3FF]" : "text-[#F4B400]"}`}
                  >
                    <h1>{item.action}</h1>
                    <IoIosArrowRoundForward size={20} />
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};
