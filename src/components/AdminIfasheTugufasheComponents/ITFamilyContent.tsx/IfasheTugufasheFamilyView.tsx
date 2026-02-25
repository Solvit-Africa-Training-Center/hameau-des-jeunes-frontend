import { useState } from "react";
import { Search, Download, Eye, Pencil, UserPlus, Users } from "lucide-react";
import { useGetIfasheFamiliesQuery } from "@/store/api/ifasheFamiliesApi";
import { toast } from "react-toastify";
import ViewFamilyModal from "./ViewFamilyModal";
import EditFamilyModal from "./EditFamilyModal";
import ManageFamilyChildrenModal from "./ManageFamilyChildrenModal";

export interface Family {
  id: string;
  familyId: string;
  parentName: string;
  phoneNumber: string;
  vulnerability: "Low" | "Medium" | "High" | "Critical";
  parentId?: string;
  // Full data for the form
  fullName: string;
  gender: string;
  dob: string;
  nationalId: string;
  educationLevel: string;
  maritalStatus: string;
  address: string;
  previousEmployment: string;
  monthlyIncome: string;
  housingCondition: string;
  vulnerabilityLevel: string;
  assessmentNotes: string;
}

interface IfasheTugufasheFamilyViewProps {
  onRegisterFamily: () => void;
}

export default function IfasheTugufasheFamilyView({
  onRegisterFamily,
}: IfasheTugufasheFamilyViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [vulnerabilityFilter, setVulnerabilityFilter] = useState("all");

  const [familyToView, setFamilyToView] = useState<Family | null>(null);
  const [familyToEdit, setFamilyToEdit] = useState<Family | null>(null);
  const [familyToManageChildren, setFamilyToManageChildren] = useState<Family | null>(null);

  const { data: fetchedFamilies = [], isLoading, isError } = useGetIfasheFamiliesQuery();

  const families: Family[] = fetchedFamilies.map((f: any) => {
    const mainParent = f.parents?.[0] || {};
    const parentFullName = mainParent.first_name 
      ? `${mainParent.first_name} ${mainParent.last_name || ""}`.trim() 
      : (f.parentName || f.parent_name || f.fullName || f.full_name || f.family_name || "Unknown");
    
    // Safely calculate children count, avoiding NaN if it's an array
    const childrenCount = Array.isArray(f.children) 
      ? f.children.length 
      : Number(f.children || f.children_count || f.family_members || 0);

    return {
      id: String(f.id || Math.random().toString()),
      familyId: String(f.familyId || f.family_id || f.id || "N/A").substring(0, 8),
      parentId: String(mainParent.id || ""),
      parentName: String(parentFullName),
      phoneNumber: String(mainParent.phone || f.phoneNumber || f.phone_number || f.phone || "Not given"),
      children: childrenCount,
      vulnerability: String(f.vulnerability_level || f.vulnerabilityLevel || f.vulnerability || "Unknown") as Family["vulnerability"],
      fullName: String(parentFullName),
      gender: String(mainParent.gender || f.gender || ""),
      dob: String(mainParent.date_of_birth || f.dob || f.date_of_birth || ""),
      nationalId: String(mainParent.national_id || f.nationalId || f.national_id || ""),
      educationLevel: String(mainParent.education_level || f.educationLevel || f.education_level || ""),
      maritalStatus: String(mainParent.marital_status || f.maritalStatus || f.marital_status || ""),
      address: String(f.address || ""),
      previousEmployment: String(mainParent.previous_employment || f.previousEmployment || f.previous_employment || ""),
      monthlyIncome: String(mainParent.monthly_income || f.monthlyIncome || f.monthly_income || ""),
      housingCondition: String(f.housing_condition || f.housingCondition || ""),
      vulnerabilityLevel: String(f.vulnerability_level || f.vulnerabilityLevel || f.vulnerability || ""),
      assessmentNotes: String(f.social_worker_assessment || f.assessmentNotes || f.assessment_notes || ""),
    };
  });

  const filteredFamilies = families.filter((family) => {
    const matchesSearch =
      family.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      family.familyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      family.phoneNumber.includes(searchQuery);

    const matchesVulnerability =
      vulnerabilityFilter === "all" ||
      family.vulnerability.toLowerCase() === vulnerabilityFilter.toLowerCase();

    return matchesSearch && matchesVulnerability;
  });

  const getVulnerabilityColor = (vulnerability: Family["vulnerability"]) => {
    switch (vulnerability) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-amber-100 text-amber-700";
      case "Low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleExportCSV = () => {
    if (filteredFamilies.length === 0) return;
    const headers = ["Family ID", "Parent", "Phone Name", "Children", "Vulnerability"];
    const csvContent = [
      headers.join(","),
      ...filteredFamilies.map(f => 
        [f.familyId, f.parentName, f.phoneNumber, f.children, f.vulnerability].map(val => `"${val}"`).join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "family_records.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Family Management</h1>
            <p className="text-sm text-gray-600">Manage family records</p>
          </div>
          <button
            onClick={onRegisterFamily}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Register New Family
          </button>
        </div>

        {/* Search, Filter, and Export */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <select
              value={vulnerabilityFilter}
              onChange={(e) => setVulnerabilityFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white appearance-none min-w-45"
            >
              <option value="all">All Vulnerability Levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export to CSV
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {isLoading && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-gray-500">Loading families...</p>
            </div>
          )}
          {isError && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-red-500">Error loading families. Please try again.</p>
            </div>
          )}
          {!isLoading && !isError && (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Family ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Children
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vulnerability
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                  {filteredFamilies.map((family) => (
                    <tr key={family.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{family.familyId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{family.parentName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{family.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{family.children}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getVulnerabilityColor(
                            family.vulnerability
                          )}`}
                        >
                          {family.vulnerability}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setFamilyToView(family)}
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => setFamilyToEdit(family)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => setFamilyToManageChildren(family)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Manage Children"
                          >
                            <Users className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          {/* Mobile Cards */}
          <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
            {filteredFamilies.map((family) => (
              <div
                key={family.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">{family.familyId}</p>
                    <h3 className="font-medium text-gray-900 text-sm">{family.parentName}</h3>
                    <p className="text-xs text-gray-500">{family.phoneNumber}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getVulnerabilityColor(
                      family.vulnerability
                    )}`}
                  >
                    {family.vulnerability}
                  </span>
                </div>

                <div className="text-xs mb-3">
                  <span className="text-gray-500">Children:</span>
                  <span className="ml-1 text-gray-900">{family.children}</span>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t">
                  <button onClick={() => setFamilyToView(family)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button onClick={() => setFamilyToEdit(family)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => setFamilyToManageChildren(family)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Users className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {!isLoading && !isError && filteredFamilies.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No families found.</p>
            </div>
          )}
            </>
          )}
        </div>
      </div>

      {/* Action Modals */}
      <ViewFamilyModal
        isOpen={!!familyToView}
        onClose={() => setFamilyToView(null)}
        family={familyToView}
      />
      <EditFamilyModal
        isOpen={!!familyToEdit}
        onClose={() => setFamilyToEdit(null)}
        family={familyToEdit}
      />
      <ManageFamilyChildrenModal
        isOpen={!!familyToManageChildren}
        onClose={() => setFamilyToManageChildren(null)}
        family={familyToManageChildren}
      />

    </div>
  );
}