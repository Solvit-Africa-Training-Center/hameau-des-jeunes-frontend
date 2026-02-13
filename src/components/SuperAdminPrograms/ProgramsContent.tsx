import { Button } from "../ui/button";
import residentialCareImg from "@/assets/residential_care_img.png";
import famReunited from "@/assets/fam_reunited_img.png";
import ifasheTugufasheImg from "@/assets/ifashe_tugufashe_img.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const programsCards = [
  {
    id: 1,
    title: "Residential Care + Health Post",
    description: "Direct care and medical support for vulnerable children.",
    status: "Active",
    image: residentialCareImg,
    slug: "manageResidentialCare",
  },
  {
    id: 2,
    title: "Ifashe Tugufahse",
    description: "Community-based support for local families and households.",
    status: "Active",
    image: ifasheTugufasheImg,
    slug: "manageIfasheTugufashe",
  },
  {
    id: 3,
    title: "International Internship",
    description: "Direct care and medical support for vulnerable children.",
    status: "Active",
    image: famReunited,
    slug: "manageInternship",
  },
];
export const ProgramsContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-96">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Program Management</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Manage all humanitarian initiatives and their beneficiaries.
            </h1>
          </div>

          {/* Button */}

          <Button
            size="sm"
            className="md:mt-0 mt-3 md:w-[200px] bg-[#0F3D2E] rounded-lg"
          >
            Launch New Program
          </Button>
        </div>

        <div className="grid grid-cols-1 md:mx-0 mx-5 md:grid-cols-3 gap-4 mt-8">
          {programsCards.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md ">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-40 object-fit rounded-tl-lg rounded-tr-lg mb-2"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{program.title}</h2>
                <p className="text-sm text-gray-600">{program.description}</p>

                <div className="flex items-center justify-between mt-5">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                    {program.status}
                  </span>

                  <Button
                    className=" bg-transparent text-[#0F3D2E] border-none hover:bg-transparent focus:ring-0 mt-2"
                    onClick={() => navigate(`/${program.slug}`)}
                  >
                    <h1 className="text-sm">Manage</h1>
                    <IoIosArrowRoundForward size={24} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
