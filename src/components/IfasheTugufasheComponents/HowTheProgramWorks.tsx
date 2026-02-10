import { FaBookReader, FaHeartbeat } from "react-icons/fa";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { RiHandHeartLine, RiPlantLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";

const programWorksCards = [
  {
    id: 1,
    icon: RiHandHeartLine,
    title: "Work-for-Support Model",
    description:
      "Each household commits to monthly work hours supporting agricultural or community projects. In return, families receive financial assistance to meet essential needs, reinforcing dignity and responsibility.",
  },
  {
    id: 2,
    icon: FaBookReader,
    title: "Education Support",
    description:
      "School fees, uniforms, and school feeding support are provided so that every child in the family can remain in school. Education is a core priority.",
  },
  {
    id: 3,
    icon: RiPlantLine,
    title: "Livelihood Development",
    description:
      "Families receive guidance and support to start or strengthen income-generating activities such as livestock rearing, small farming, or home-based enterprises. Seed inputs and technical assistance are provided where possible.",
  },
  {
    id: 4,
    icon: FaHeartbeat,
    title: "Work-for-Support Model",
    description:
      "Families are supported to enroll in community health insurance (Mutuelle) and are referred to additional services to reduce health-related financial shocks.",
  },
  {
    id: 5,
    icon: AiFillHome,
    title: "Reintegration Support",
    description:
      "For children from residential care, the program addresses the financial and social challenges that previously pushed children to the streets, enabling safe and sustainable reunification.",
  },
];

export const HowTheProgramWorks = () => {
  return (
    <>
      <section className="bg-[#0F3D2E]  px-6 py-14 md:px-10 lg:px-5 space-y-8">
        <div>
          <h1 className="text-2xl text-center font-bold text-white">
            How the Program Works
          </h1>
          <div className="flex gap-2 text-sm font-light items-center justify-center  text-white">
            <h1>
              A comprehensive approach to family strengthning through partneship
              and practical support
            </h1>
          </div>
        </div>

        {/* THE FIVE CARDS */}

        <div className="grid grid-cols-1 gap-5 mx-8 md:mx-24">
          {programWorksCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="bg-[#0E382A] rounded-lg py-5 px-3 text-white border border-none"
              >
                <div className="flex items-center justify-center gap-3 md:gap-5">
                  <div
                    className={`rounded-full p-5 w-14 h-14 md:w-12 md:h-12 grid place-items-center ${
                      [1, 3, 5].includes(item.id)
                        ? "bg-[#71B5FF]"
                        : "bg-[#F6C333]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-white">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};
