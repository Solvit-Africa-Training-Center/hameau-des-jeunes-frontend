import { FaDiamond } from "react-icons/fa6";
import testimonial_1_img from "@/assets/testimonial_1_img.png";
import testimonial_2_img from "@/assets/testimonial_2_img.png";
import testimonial_3_img from "@/assets/testimonial_3_img.jpg";
import testimonial_4_img from "@/assets/testimonial_4_img.jpg";
import { Card } from "../ui/card";

const testimonialsCards = [
  {
    id: 1,
    name: "Jean-claude",
    status: "Former Resident, Now University Student",
    image: testimonial_1_img,
    testimony:
      "When I arrived, I had lost hope. The caregivers here gave me structure, education, and belief in myself. Today I'm studying engineering and want to give back to other children like me.",
  },
  {
    id: 2,
    name: "Marie",
    status: "Former Resident, Now University Student",
    image: testimonial_2_img,
    testimony:
      "The tailoring skills I learned here changed my life. I now run my own small business and support my family. I'm grateful for the patience and training I received.",
  },
  {
    id: 3,
    name: "Jennifer",
    status: "Former Resident, Now University Student",
    image: testimonial_3_img,
    testimony:
      "When I arrived, I had lost hope. The caregivers here gave me structure, education, and belief in myself. Today I'm studying engineering and want to give back to other children like me.",
  },
  {
    id: 4,
    name: "Grace Uwimana",
    status: "Lead Caregiver",
    image: testimonial_4_img,
    testimony:
      "When I arrived, I had lost hope. The caregivers here gave me structure, education, and belief in myself. Today I'm studying engineering and want to give back to other children like me.",
  },
  {
    id: 5,
    name: "David",
    status: "Former Resident, Now University Student",
    image: testimonial_1_img,
    testimony:
      "This program saved my life. I learned I was worthy of love and capable of achieving my dreams.",
  },
];

export const VoicesOfTransformation = () => {
  return (
    <>
      <section className="bg-[#FAFAFA] px-6 py-14 md:px-16 lg:px-24 space-y-10">
        <div>
          <div className="flex gap-2 text-sm font-light items-center justify-center">
            <FaDiamond size={15} className="text-[#4DA3FF]" />
            <h1>Real Stories, Real Change</h1>
          </div>
          <h1 className="text-2xl text-center font-bold text-[#0F3D2E]">
            Voices of Transformation
          </h1>
        </div>

        {/* Testimonials cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsCards.map((item) => {
            const isPortrait = item.id === 3;
            const isWide = item.id === 4;

            return (
              <Card
                key={item.id}
                className={`
    relative overflow-hidden rounded-2xl
    ${isWide ? "md:col-span-2 h-[260px] bg-cover bg-center" : ""}
    ${isPortrait ? "h-[320px]" : "p-10"}
    ${item.id === 1 || item.id === 5 ? "bg-blue-100" : ""}
    ${item.id === 2 ? "bg-[#FFF8E6]" : ""}
  `}
                style={
                  isWide || isPortrait
                    ? { backgroundImage: `url(${item.image})` }
                    : undefined
                }
              >
                {/* overlay ONLY if wide */}
                {isWide ||
                  (isPortrait && (
                    <div className="absolute inset-0 bg-black/40" />
                  ))}

                {/* CONTENT */}
                <div
                  className={`
      relative z-10 h-full
      ${isWide || isPortrait ? "flex flex-col justify-end p-6 text-white" : ""}
    `}
                >
                  {isWide ? (
                    <>
                      <p className="italic text-sm max-w-xl">
                        "Every child who comes here carries a story of pain, but
                        also incredible resilience. Watching them heal, learn,
                        and grow into confident young adults is the greatest
                        privilege of my life."
                      </p>

                      <div className="mt-4">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm opacity-90">{item.status}</p>
                      </div>
                    </>
                  ) : isPortrait ? (
                    <div className="mt-4">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm opacity-90">{item.status}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-between space-y-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-600">{item.status}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {item.testimony}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};
