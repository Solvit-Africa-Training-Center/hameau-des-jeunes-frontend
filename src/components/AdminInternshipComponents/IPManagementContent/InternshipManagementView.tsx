import { useState } from "react";
import { Search, Pencil, Calendar, Users, Clock } from "lucide-react";
import { useGetApplicationsQuery } from "@/store/api/internshipApi";

export interface ApprovedInternship {
  id: string;
  applicantName: string;
  applicantEmail: string;
  country: string;
  education: string;
  program: string;
  submitted: string;
  supervisor: string;
  duration: string;
  weeks: string;
  // Assignment data - placeholders if not in program yet
  parentFullName?: string;
  parentGender?: string;
  parentDOB?: string;
  parentNationalId?: string;
  parentPhone?: string;
  parentEducationLevel?: string;
  parentMaritalStatus?: string;
  parentAddress?: string;
  previousEmployment?: string;
  monthlyIncome?: string;
  housingCondition?: string;
  vulnerabilityLevel?: string;
  assessmentNotes?: string;
  // Application info for modal
  phone: string;
  availability: string;
  submissionDate: string;
  status: "Approved" | "SUBMITTED" | "UNDER_REVIEW" | "MORE_INFO_NEEDED" | "REJECTED";
  documents: {
    cv: { name: string; filename: string };
    motivationLetter?: { name: string; filename: string };
    idDocument?: { name: string; filename: string };
  };
}

interface InternshipManagementViewProps {
  onEditAssignment: (internship: ApprovedInternship) => void;
  onViewApplication: (internship: ApprovedInternship) => void;
}

export default function InternshipManagementView({
  onEditAssignment,
  onViewApplication,
}: InternshipManagementViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetApplicationsQuery({
    status: "APPROVED",
    search: searchQuery
  });

  const approvedInternships: ApprovedInternship[] = data?.results.map((app) => ({
    id: app.id,
    applicantName: app.full_name,
    applicantEmail: app.email,
    country: app.country || "N/A",
    education: app.education_level || "N/A",
    program: app.program || "N/A",
    submitted: new Date(app.applied_on).toLocaleDateString(),
    supervisor: "TBD", // This would actually come from a separate query to InternshipProgram
    duration: "TBD",
    weeks: "TBD",
    phone: app.phone,
    availability: app.availability_hours || "N/A",
    submissionDate: new Date(app.applied_on).toLocaleDateString(),
    status: "Approved",
    documents: {
      cv: { name: "CV / Resume", filename: app.cv_url || "" },
    }
  })) || [];

  const filteredInternships = approvedInternships.filter((internship) =>
    internship.applicantName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 mb-5">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Internship Management & Review
          </h1>
          <p className="text-sm text-gray-600">
            View Approved Applications here.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end mb-4 shrink-0">
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
        </div>

        {/* Application Count */}
        <p className="text-sm text-gray-900 mb-4 shrink-0">
          {filteredInternships.length} approved applications
        </p>

        {/* Internship Cards */}
        <div className="flex-1 overflow-auto space-y-4 pb-4">
          {filteredInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Card Header - Emerald */}
              <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {internship.applicantName}
                  </h3>
                  <p className="text-sm text-emerald-100">
                    {internship.program}
                  </p>
                </div>
                <button
                  onClick={() => onViewApplication(internship)}
                  className="text-sm text-emerald-100 hover:text-white underline"
                >
                  View Application
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Applicant Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {internship.applicantName}
                    </p>
                    <p className="text-sm text-gray-900">
                      {internship.applicantEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Country</p>
                    <p className="text-sm text-gray-900">
                      {internship.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Education</p>
                    <p className="text-sm text-gray-900">
                      {internship.education}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => onEditAssignment(internship)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Assignment
                  </button>
                </div>

                {/* Internship Assignment Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-gray-400" />
                    <h4 className="text-sm font-semibold text-gray-900">
                      Internship Assignment
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Program Card */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-gray-900 " />
                        <p className="text-sm text-gray-900 font-medium">Program</p>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {internship.program}
                      </p>
                    </div>

                    {/* Supervisor Card */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-gray-900" />
                        <p className="text-sm text-gray-900 font-medium">Supervisor</p>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {internship.supervisor}
                      </p>
                    </div>

                    {/* Duration Card */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-900" />
                        <p className="text-sm text-gray-900 font-medium">Duration</p>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {internship.duration}
                      </p>
                    </div>

                    {/* Weeks Card */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-900" />
                        <p className="text-sm text-gray-900 font-medium">Weeks</p>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {internship.weeks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredInternships.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500 text-sm">
                No approved internships found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
