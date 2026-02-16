import { Download } from "lucide-react";
function FinancialsContent() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex w-full h-full">
        {/* Settings Content Area - This is the main settings content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Financial Management
              </h1>
              <p className="text-sm text-gray-600">
                Track expenses, budgets and school fees for all children.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-emerald-900 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap self-start">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Export Financial Report</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialsContent;
