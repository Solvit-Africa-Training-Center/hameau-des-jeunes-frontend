import { FileText, Download, Upload } from "lucide-react";
import { useState } from "react";
import {
  useLazyGetIfasheFamiliesReportQuery,
  useLazyGetIfasheParentWorkReportQuery,
  useLazyGetIfasheSummaryReportQuery,
  useLazyGetIfasheSupportReportQuery,
} from "@/store/api/ifasheReportsApi";
import { useGetIfasheFamiliesQuery } from "@/store/api/ifasheFamiliesApi";
import { useGetIfasheChildrenQuery } from "@/store/api/ifasheChildrenApi";
import { useGetIfasheSponsorshipsQuery } from "@/store/api/ifasheSponsorshipsApi";
import { useGetIfasheDressingsQuery } from "@/store/api/ifasheDressingApi";
import { useGetIfasheParentContractsQuery } from "@/store/api/ifasheParentsApi";
import { useGetIfasheSchoolSupportsQuery } from "@/store/api/ifasheSchoolSupportApi";

export default function IfasheTugufasheReportContent() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [triggerFamiliesReport] = useLazyGetIfasheFamiliesReportQuery();
  const [triggerParentWorkReport] = useLazyGetIfasheParentWorkReportQuery();
  const [triggerSummaryReport] = useLazyGetIfasheSummaryReportQuery();
  const [triggerSupportReport] = useLazyGetIfasheSupportReportQuery();
  const [isDownloading, setIsDownloading] = useState<number | null>(null);

  const handleDownload = async (reportId: number, format: "pdf" | "excel") => {
    try {
      setIsDownloading(reportId);
      let blob: Blob | undefined;
      
      switch (reportId) {
        case 1:
          blob = await triggerFamiliesReport({ format }).unwrap();
          break;
        case 2:
        case 3:
          blob = await triggerSummaryReport({ format }).unwrap();
          break;
        case 4:
          blob = await triggerParentWorkReport({ format }).unwrap();
          break;
        case 5:
          blob = await triggerSupportReport({ format }).unwrap();
          break;
        default:
          return;
      }
      
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `report_${reportId}_${new Date().toISOString().split('T')[0]}.${format === "excel" ? "xlsx" : "pdf"}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download report. Please try again.");
    } finally {
      setIsDownloading(null);
    }
  };

  const reports = [
    {
      id: 1,
      title: "Supported Families Report",
      description: "Overview list of all assigned families and their details",
      count: "8 families",
      icon: FileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      id: 2,
      title: "Children by Education Level",
      description: "Breakdown of children by their current education level",
      count: "22 children",
      icon: FileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      id: 3,
      title: "Sponsorship Status Summary",
      description: "Overview of active, suspended and completed sponsorships",
      count: "9 sponsorships",
      icon: FileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      id: 4,
      title: "Non-Compliant Families",
      description: "Families with compliance issues or warnings",
      count: "2 issues",
      icon: FileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      id: 5,
      title: "Financial Support by Period",
      description: "School fee payments and support within date range to payments",
      count: "14 payments",
      icon: FileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  const { data: familiesList = [] } = useGetIfasheFamiliesQuery();
  const { data: childrenList = [] } = useGetIfasheChildrenQuery();
  const { data: sponsorshipsList = [] } = useGetIfasheSponsorshipsQuery();
  const { data: dressingsList = [] } = useGetIfasheDressingsQuery();
  const { data: parentContractsList = [] } = useGetIfasheParentContractsQuery();
  const { data: schoolSupportsList = [] } = useGetIfasheSchoolSupportsQuery();

  const totalSchoolSupportAmount = schoolSupportsList.reduce((sum, s: any) => {
    return sum + (parseInt(s.schoolFeesPaid || s.amountPaid || s.school_fees_paid || '0') || 0);
  }, 0);

  const stats = [
    { id: 1, label: "Total Families", value: familiesList.length.toString() },
    { id: 2, label: "Total Children", value: childrenList.length.toString() },
    { id: 3, label: "Active Sponsorships", value: sponsorshipsList.filter((s: any) => s.status === "Active").length.toString() },
    { id: 4, label: "Total School Support", value: `${totalSchoolSupportAmount.toLocaleString()} RWF` },
    { id: 5, label: "Clothes Distributions", value: dressingsList.length.toString() },
    { id: 6, label: "Parent Work Assignments", value: parentContractsList.length.toString() },
    { id: 7, label: "Children in School", value: childrenList.filter((c: any) => c.school && c.school !== "N/A" && c.school !== "Unknown" && c.school !== "").length.toString() },
    { id: 8, label: "High Vulnerability", value: familiesList.filter((f: any) => f.vulnerabilityLevel === "High" || f.vulnerabilityLevel === "Critical" || f.vulnerability === "High" || f.vulnerability === "Critical").length.toString() },
  ];

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Reports</h1>
            <p className="text-sm text-gray-600">Generate and download program reports</p>
          </div>

          {/* Date Range Filter */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Date Range Filter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Report Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-10 h-10 ${report.iconBg} rounded-lg flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${report.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {report.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  </div>

                  {/* Count */}
                  <p className="text-sm text-gray-900 mb-4">{report.count}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-auto">
                    <button 
                      onClick={() => handleDownload(report.id, "excel")}
                      disabled={isDownloading === report.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                      {isDownloading === report.id ? "..." : "Excel"}
                    </button>
                    <button 
                      onClick={() => handleDownload(report.id, "pdf")}
                      disabled={isDownloading === report.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      {isDownloading === report.id ? "..." : "Generate PDF"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Program Summary Statistics */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Program Summary Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white rounded-xl shadow-sm p-5">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}