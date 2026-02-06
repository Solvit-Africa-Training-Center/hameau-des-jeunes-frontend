import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const fundingAndNeedsStats = [
  { id: 1, numbers: "420", label: "Families Supported" },
  { id: 2, numbers: "1997", label: "Year Founded" },
  { id: 3, numbers: "100%", label: "Partnership Model" },
  { id: 4, numbers: "5", label: "Core Support Areas" },
];
export const FundingStats = () => {
  return (
    <>
      <section className="bg-[#FAFAFA]  px-6 py-14 md:px-48 space-y-8">
        <Card className="bg-white py-8 px-14">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0F3D2E] text-center">
              Funding & Needs
            </CardTitle>
          </CardHeader>
          <CardDescription className="flex items-center justify-center">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
              {fundingAndNeedsStats.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <h1
                    className={` font-bold text-3xl text-center md:text-4xl
                    ${item.id === 2 ? "text-[#F4B400]" : "text-[#0F3D2E]"} 
                    ${item.id === 1 || item.id === 4 ? "text-[#4DA3FF]" : "text-[#0F3D2E]"}`}
                  >
                    {item.numbers}
                  </h1>
                  <p className="text-sm text-[#646B76] text-center">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </CardDescription>
          <div className="h-[2px] mt-5 bg-[#D5D2D2]"></div>

          {/* LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-end">
            <ul className="text-sm space-y-2">
              <li>
                <div className="flex gap-2">
                  <FaCircleCheck className="mt-1 text-[#4DA3FF]" />
                  <span className="font-bold">Program:</span> Ifashe
                  Tugusfashe{" "}
                </div>
              </li>
              <li>
                <div className="flex gap-2">
                  <FaCircleCheck className="mt-1 text-[#4DA3FF]" />
                  <span className="font-bold">Model:</span>{" "}
                  Work-for-support{" "}
                </div>
              </li>
              <li>
                <div className="flex gap-2">
                  <FaCircleCheck size={18} className="text-[#4DA3FF]" />
                  <span className="font-bold">Supports:</span> Education,
                  livelihoods, health insurance, financial aid, mentorship.
                </div>
              </li>
            </ul>

            <ul className="text-sm space-y-2">
              <li>
                <div className="flex gap-2">
                  <FaCircleCheck className="mt-1 text-[#4DA3FF]" />
                  <span className="font-bold">Location:</span> Ifashe
                  Tugusfashe{" "}
                </div>
              </li>
              <li>
                <div className="flex gap-2">
                  <FaCircleCheck className="mt-1 text-[#4DA3FF]" />
                  <span className="font-bold">Goal:</span> Work-for-support{" "}
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
};
