import { FaDiamond } from "react-icons/fa6";
import program_overview_img from "@/assets/progr_overview_img.jpg";

export const ProgramOverview = () => {
  return (
    <>
      <section className="bg-[#FAFAFA]  px-6 py-14 md:px-10 lg:px-5 space-y-8">
        <div>
          <div className="flex gap-2 text-sm font-light items-center justify-center">
            <FaDiamond size={15} className="text-[#4DA3FF]" />
            <h1>Our Approach</h1>
          </div>
          <h1 className="text-2xl text-center font-bold text-[#0F3D2E]">
            Program Overview
          </h1>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 md:place-items-center md:justify-items-center md:mx-36">
          <div>
            {/* Paragraphs */}
            <div className="max-w-4xl mx-auto space-y-6 px-15">
              <p className="text-[#646B76] text-sm text-justify font-semibold md:text-base  leading-relaxed">
                Ifashe Tugufashe addresses the economic and social challenges
                that place children at risk of leaving home. Many families face
                hardship that undermines their ability to provide education,
                healthcare, and stability. This program tackles those root
                causes directly.
              </p>

              <p className="text-[#646B76] text-sm md:text-base font-semibold text-justify leading-relaxed">
                By combining practical support with family participation,
                households regain control of their lives, children remain in
                school, and families rebuild confidence and independence. The
                program also supports safe family reunification for children
                previously in residential care, when it is in the child's best
                interest.
              </p>
            </div>
          </div>

          <div className=" ">
            <img
              src={program_overview_img}
              alt="program_overview_img"
              className="object-cover rounded-xl h-[350px]"
            />
          </div>
        </div>
      </section>
    </>
  );
};
