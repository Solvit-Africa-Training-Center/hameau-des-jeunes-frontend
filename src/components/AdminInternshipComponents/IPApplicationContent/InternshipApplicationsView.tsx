import { useState } from "react";
import { Search, SlidersHorizontal, Eye, CheckCircle, Info, XCircle } from "lucide-react";

export interface Application {
  id: string;
  applicantName: string;
  applicantEmail: string;
  country: string;
  education: string;
  program: string;
  submitted: string;
  status: "Approved" | "Under Review" | "More Information Needed" | "Rejected" | "Submitted";
  phone: string;
  availability: string;
  submissionDate: string;
  documents: {
    cv: { name: string; filename: string };
    motivationLetter: { name: string; filename: string };
    idDocument: { name: string; filename: string };
  };
}

interface InternshipApplicationsViewProps {
  onViewApplication: (application: Application) => void;
  onReject: (application: Application) => void;
  onRequestInfo: (application: Application) => void;
  onApprove: (application: Application) => void;
}

export default function InternshipApplicationsView({
  onViewApplication,
  onReject,
  onRequestInfo,
  onApprove,
}: InternshipApplicationsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const applications: Application[] = [
    {
      id: "1",
      applicantName: "Maria Santos",
      applicantEmail: "maria.santos@email.com",
      country: "Germany",
      education: "Bachelor's Degree",
      program: "Ifashe Tugufashe",
      submitted: "Jan 14, 2026",
      status: "Approved",
      phone: "+49 912 345 678",
      availability: "40 hours/week",
      submissionDate: "January 14, 2026",
      documents: {
        cv: { name: "CV / Resume", filename: "maria_santos_cv.pdf" },
        motivationLetter: { name: "Motivation Letter", filename: "motivation_letter.pdf" },
        idDocument: { name: "ID Document", filename: "passport.pdf" },
      },
    },
    {
      id: "2",
      applicantName: "Ahmed Hassan",
      applicantEmail: "ahmed.hassan@email.com",
      country: "Germany",
      education: "Master's Degree",
      program: "Residential Care",
      submitted: "Jan 27, 2026",
      status: "Under Review",
      phone: "+49 156 789 012",
      availability: "30 hours/week",
      submissionDate: "January 27, 2026",
      documents: {
        cv: { name: "CV / Resume", filename: "ahmed_hassan_cv.pdf" },
        motivationLetter: { name: "Motivation Letter", filename: "cover_letter.pdf" },
        idDocument: { name: "ID Document", filename: "id_card.pdf" },
      },
    },
    {
      id: "3",
      applicantName: "Sophie Dubois",
      applicantEmail: "sophie.dubois@email.com",
      country: "Italy",
      education: "Bachelor's Degree",
      program: "Agriculture & Farming",
      submitted: "Jan 31, 2026",
      status: "More Information Needed",
      phone: "+39 345 678 901",
      availability: "Full-time",
      submissionDate: "January 31, 2026",
      documents: {
        cv: { name: "CV / Resume", filename: "sophie_cv.pdf" },
        motivationLetter: { name: "Motivation Letter", filename: "motivation.pdf" },
        idDocument: { name: "ID Document", filename: "passport.pdf" },
      },
    },
    {
      id: "4",
      applicantName: "Yuki Tanaka",
      applicantEmail: "yuki.tanaka@email.com",
      country: "Italy",
      education: "Master's Degree",
      program: "Health Post Services",
      submitted: "Jan 21, 2026",
      status: "Rejected",
      phone: "+39 234 567 890",
      availability: "20 hours/week",
      submissionDate: "January 21, 2026",
      documents: {
        cv: { name: "CV / Resume", filename: "yuki_resume.pdf" },
        motivationLetter: { name: "Motivation Letter", filename: "letter.pdf" },
        idDocument: { name: "ID Document", filename: "id.pdf" },
      },
    },
    {
      id: "5",
      applicantName: "Carlos Rodriguez",
      applicantEmail: "carlos.rodriguez@email.com",
      country: "Germany",
      education: "Bachelor's Degree",
      program: "Tourism & Culture Visits",
      submitted: "Jan 17, 2026",
      status: "Approved",
      phone: "+49 789 012 345",
      availability: "40 hours/week",
      submissionDate: "January 17, 2026",
      documents: {
        cv: { name: "CV / Resume", filename: "carlos_cv.pdf" },
        motivationLetter: { name: "Motivation Letter", filename: "motivation.pdf" },
        idDocument: { name: "ID Document", filename: "passport.pdf" },
      },
    },
    {
      id: "6",
      applicantName: "Raj Patel",
      applicantEmail: "raj.patel@email.com",
      country: "Italy",
      education: "Bachelor's Degree",
      program: "Residential Care",
      submitted: "Feb 8, 2026",
      status: "Submitted",
      phone: "+39 123 456 789",
      availability: "35 hours/week",
      submissionDate: "February 8, 2026",
      documents: {
        cv: { name: "CV / Resume", filename: "raj_patel_cv.pdf" },
        motivationLetter: { name: "Motivation Letter", filename: "cover.pdf" },
        idDocument: { name: "ID Document", filename: "id_document.pdf" },
      },
    },
  ];

  const filteredApplications = applications.filter((app) =>
    app.applicantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Under Review":
        return "bg-blue-100 text-blue-700";
      case "More Information Needed":
        return "bg-amber-100 text-amber-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Submitted":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="shrink-0 mb-5">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Applications</h1>
          <p className="text-sm text-gray-600">Manage Applications here.</p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end gap-3 mb-4 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Application Count */}
        <p className="text-sm text-gray-600 mb-4 shrink-0">
          {filteredApplications.length} Applications.
        </p>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b shrink-0">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Education
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {application.applicantName}
                          </p>
                          <p className="text-xs text-gray-500">{application.applicantEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{application.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{application.education}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{application.program}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{application.submitted}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onViewApplication(application)}
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => onApprove(application)}
                            className="p-1.5 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </button>
                          <button
                            onClick={() => onRequestInfo(application)}
                            className="p-1.5 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Request Information"
                          >
                            <Info className="w-4 h-4 text-amber-500" />
                          </button>
                          <button
                            onClick={() => onReject(application)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {application.applicantName}
                    </h3>
                    <p className="text-xs text-gray-500">{application.applicantEmail}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Country:</span>
                    <span className="ml-1 text-gray-900">{application.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Education:</span>
                    <span className="ml-1 text-gray-900">{application.education}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Program:</span>
                    <span className="ml-1 text-gray-900">{application.program}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Submitted:</span>
                    <span className="ml-1 text-gray-900">{application.submitted}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t">
                  <button
                    onClick={() => onViewApplication(application)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => onApprove(application)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </button>
                  <button
                    onClick={() => onRequestInfo(application)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <Info className="w-4 h-4 text-amber-500" />
                  </button>
                  <button
                    onClick={() => onReject(application)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredApplications.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}