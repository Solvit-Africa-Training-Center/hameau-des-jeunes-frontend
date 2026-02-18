import { useState } from "react";
import { Eye, Download, Search, FileText, Wallet, Users, GraduationCap } from "lucide-react";

export interface Report {
  id: string;
  title: string;
  description: string;
  lastGenerated: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

interface ReportsViewProps {
  onPreview: (report: Report) => void;
}

const recentReports = [
  {
    id: "1",
    name: "Q4_2025_Financial_Review.pdf",
    category: "Finance · 2.4 MB",
    date: "Jan 12, 2026",
  },
  {
    id: "2",
    name: "Samuel_Kwizera_Progress_Annual.pdf",
    category: "Progress · 0.9 MB",
    date: "Jan 10, 2026",
  },
  {
    id: "3",
    name: "Center_Health_Audit_2025.pdf",
    category: "Health · 3.1 MB",
    date: "Dec 28, 2025",
  },
];

export default function ReportsView({ onPreview }: ReportsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const reports: Report[] = [
    {
      id: "1",
      title: "Child Progress Report",
      description:
        "Comprehensive development review including health, education, and behavioral notes.",
      lastGenerated: "Last Generated: Feb 02, 2026",
      icon: FileText,
      iconBg: "bg-emerald-900",
      iconColor: "text-white",
    },
    {
      id: "2",
      title: "Monthly Finance Summary",
      description:
        "Detailed breakdown of center expenses, child-specific costs, and budget utilization.",
      lastGenerated: "Last Generated: Jan 31, 2026",
      icon: Wallet,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: "3",
      title: "Health & Wellness Report",
      description: "Summary of all clinic visits, medication logs, and health screenings.",
      lastGenerated: "Last Generated: Feb 01, 2026",
      icon: Users,
      iconBg: "bg-amber-400",
      iconColor: "text-white",
    },
    {
      id: "4",
      title: "Academic Performance Overview",
      description:
        "Consolidated view of school attendance and progress across all enrolled children.",
      lastGenerated: "Last Generated: Jan 15, 2026",
      icon: GraduationCap,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-400",
    },
  ];

  const filteredReports = recentReports.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="shrink-0 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">
            Generate and export professional reports for center stakeholders.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto space-y-6 pb-2">

          {/* Report Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${report.iconColor}`} />
                    </div>
                    <span className="text-xs text-gray-400">{report.lastGenerated}</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => onPreview(report)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors">
                      <Download className="w-4 h-4" />
                      Generate PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Generated Reports */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Recent Generated Reports
              </h2>
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Report..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Reports List */}
            <div className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{report.name}</p>
                      <p className="text-xs text-gray-400">{report.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{report.date}</span>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredReports.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-400">No reports found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}