import { Download } from "lucide-react";
import { BiSolidInstitution } from "react-icons/bi";
import EducationDataTable from "./RCEducationContent/EducationDataTable";
import { useNavigate } from "react-router-dom";

export const EducationContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Education Management
            </h1>
            <p className="text-sm text-gray-600">
              Track school enrollment, attendance and academic progress.
            </p>
          </div>
          <button className="flex items-center gap-2 border broder-emerald-900 bg-white text-emerald-900 px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-800 hover:text-white transition-colors whitespace-nowrap self-start">
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4">
          <button
            onClick={() => navigate("/educationalInstitutions")}
            className="flex items-center gap-2 bg-emerald-900 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap self-start"
          >
            <BiSolidInstitution className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Institutions</span>
          </button>
        </div>

        <EducationDataTable />
      </section>
    </>
  );
};
