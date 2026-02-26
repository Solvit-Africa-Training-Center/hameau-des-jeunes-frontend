import { useState } from "react";
import { Download } from "lucide-react";
import { BiUserPlus } from "react-icons/bi";
import InstitutionsDataTable from "./InstitutionsDataTable";
import AddInstitutionModal from "./AddInstitutionModal";

export const InstitutionsContent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full md:px-5 py-14">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Institution Management
            </h1>
            <p className="text-sm text-gray-600">
              Track school enrollment, attendance and academic progress.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-emerald-900 bg-white text-emerald-900 px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-900 hover:text-white transition-colors whitespace-nowrap self-start">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 border border-emerald-900 bg-emerald-900 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap self-start"
            >
              <BiUserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Add New Institution</span>
            </button>
          </div>
        </div>

        <InstitutionsDataTable />

        <AddInstitutionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={(data) => console.log(data)}
        />
      </section>
    </>
  );
};
