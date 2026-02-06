import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaHandsHelping, FaUsers } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { AiOutlineSafety } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";

const coreValuesCards = [
  {
    id: 1,
    icon: MdOutlineRemoveRedEye,
    title: "Respect & Dignity",
    description:
      "Every child deserves to be treated with respect and to live with dignity.",
  },

  {
    id: 2,
    icon: AiOutlineSafety,
    title: "Transparency",
    description:
      "We operate with full accountability and openness to our stakeholders.",
  },

  {
    id: 3,
    icon: BsHeart,
    title: "Compassion",
    description:
      "We approach our work with empathy and genuine care for those we serve.",
  },

  {
    id: 4,
    icon: FaHandsHelping,
    title: "Responsiblity",
    description:
      "We take ownership of our actions and their impact on children and families.",
  },

  {
    id: 5,
    icon: FaUsers,
    title: "Community Empowerment",
    description:
      "We believe in strengthening communities to create lasting change.",
  },

  {
    id: 6,
    icon: HiOutlineSparkles,
    title: "And More...",
    description:
      "Every decision we make is rooted in our commitment to children, families, and sustainable impact.",
  },
];
export const OurCoreValues = () => {
  return (
    <section className="bg-[#FAFAFA] py-10">
      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-5xl mb-5 text-[#0F3D2E]">
          Our Core Values
        </h1>
        <h1 className="text-base ">
          The principles that guide everything we do
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-6 px-5 py-10 max-w-5xl mx-auto">
        {coreValuesCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              className="bg-white drop-shadow-gray-100 rounded-xl  md:w-[300px] py-6"
              key={item.id}
            >
              <div className="bg-[#E7ECEA] rounded-lg w-10 h-10 mx-5 flex items-center justify-center text-black">
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
    </section>
  );
};
