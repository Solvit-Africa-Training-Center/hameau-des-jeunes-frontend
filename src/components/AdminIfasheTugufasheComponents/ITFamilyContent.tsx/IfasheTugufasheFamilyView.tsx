import { useState } from "react";
import { Search, Download, Eye, Pencil, UserPlus, Users } from "lucide-react";

export interface Family {
  id: string;
  familyId: string;
  parentName: string;
  phoneNumber: string;
  children: number;
  vulnerability: "Low" | "Medium" | "High" | "Critical";
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

  const families: Family[] = [
    {
      id: "1",
      familyId: "FML73522",
      parentName: "Mukemama Vestine",
      phoneNumber: "+250798123456",
      children: 3,
      vulnerability: "High",
      fullName: "Mukemama Vestine",
      gender: "Female",
      dob: "1985-03-15",
      nationalId: "1198580012345678",
      educationLevel: "Secondary",
      maritalStatus: "Single",
      address: "Kigali, Gasabo District",
      previousEmployment: "Farmer",
      monthlyIncome: "50000",
      housingCondition: "Rented Apartment",
      vulnerabilityLevel: "High",
      assessmentNotes: "Single mother with limited income. Needs support for children's education.",
    },
    {
      id: "2",
      familyId: "FML73522",
      parentName: "Niyonzima Jean Claude",
      phoneNumber: "+250788234567",
      children: 4,
      vulnerability: "High",
      fullName: "Niyonzima Jean Claude",
      gender: "Male",
      dob: "1980-07-22",
      nationalId: "1198080034567890",
      educationLevel: "Primary",
      maritalStatus: "Married",
      address: "Kigali, Kicukiro District",
      previousEmployment: "Teacher",
      monthlyIncome: "30000",
      housingCondition: "Own House",
      vulnerabilityLevel: "High",
      assessmentNotes: "Large family with very limited resources. Urgent need for food support.",
    },
    {
      id: "3",
      familyId: "FML73522",
      parentName: "Uwihana Grace",
      phoneNumber: "+250787345678",
      children: 2,
      vulnerability: "Critical",
      fullName: "Uwihana Grace",
      gender: "Female",
      dob: "1992-11-10",
      nationalId: "1199280056789012",
      educationLevel: "No Education",
      maritalStatus: "Widowed",
      address: "Kigali, Nyarugenge District",
      previousEmployment: "Unemployed",
      monthlyIncome: "0",
      housingCondition: "Shared Housing",
      vulnerabilityLevel: "Critical",
      assessmentNotes: "Recent widow with no income. Children at risk of malnutrition.",
    },
    {
      id: "4",
      familyId: "FML73522",
      parentName: "Habimana Patrick",
      phoneNumber: "+250786456789",
      children: 2,
      vulnerability: "High",
      fullName: "Habimana Patrick",
      gender: "Male",
      dob: "1988-05-18",
      nationalId: "1198880078901234",
      educationLevel: "Bachelor's Degree",
      maritalStatus: "Divorced",
      address: "Kigali, Gasabo District",
      previousEmployment: "Driver",
      monthlyIncome: "80000",
      housingCondition: "Rented Apartment",
      vulnerabilityLevel: "High",
      assessmentNotes: "Struggling with child custody payments. Needs temporary financial assistance.",
    },
    {
      id: "5",
      familyId: "FML73522",
      parentName: "Nyirahabimana Angelique",
      phoneNumber: "+250785567890",
      children: 3,
      vulnerability: "Medium",
      fullName: "Nyirahabimana Angelique",
      gender: "Female",
      dob: "1987-09-25",
      nationalId: "1198780090123456",
      educationLevel: "Secondary",
      maritalStatus: "Married",
      address: "Kigali, Kicukiro District",
      previousEmployment: "Tailor",
      monthlyIncome: "120000",
      housingCondition: "Own House",
      vulnerabilityLevel: "Medium",
      assessmentNotes: "Stable income but needs support for medical expenses.",
    },
    {
      id: "6",
      familyId: "FML73522",
      parentName: "Ndayisaba Emmanuel",
      phoneNumber: "+250784678901",
      children: 2,
      vulnerability: "Low",
      fullName: "Ndayisaba Emmanuel",
      gender: "Male",
      dob: "1990-02-14",
      nationalId: "1199080012345678",
      educationLevel: "Master's Degree",
      maritalStatus: "Married",
      address: "Kigali, Gasabo District",
      previousEmployment: "Engineer",
      monthlyIncome: "250000",
      housingCondition: "Own House",
      vulnerabilityLevel: "Low",
      assessmentNotes: "Financially stable. Enrolled for community development programs.",
    },
    {
      id: "7",
      familyId: "FML73522",
      parentName: "Mukamazimpaka Claudine",
      phoneNumber: "+250783789012",
      children: 1,
      vulnerability: "Medium",
      fullName: "Mukamazimpaka Claudine",
      gender: "Female",
      dob: "1995-06-30",
      nationalId: "1199580034567890",
      educationLevel: "Bachelor's Degree",
      maritalStatus: "Single",
      address: "Kigali, Nyarugenge District",
      previousEmployment: "Nurse",
      monthlyIncome: "150000",
      housingCondition: "Rented Apartment",
      vulnerabilityLevel: "Medium",
      assessmentNotes: "Young mother pursuing career. Needs childcare support.",
    },
    {
      id: "8",
      familyId: "FML73522",
      parentName: "Bizimana Joseph",
      phoneNumber: "+250788890123",
      children: 5,
      vulnerability: "High",
      fullName: "Bizimana Joseph",
      gender: "Male",
      dob: "1983-12-05",
      nationalId: "1198380056789012",
      educationLevel: "Primary",
      maritalStatus: "Married",
      address: "Kigali, Kicukiro District",
      previousEmployment: "Construction Worker",
      monthlyIncome: "70000",
      housingCondition: "Shared Housing",
      vulnerabilityLevel: "High",
      assessmentNotes: "Large family in cramped housing. Needs housing and food support.",
    },
  ];

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

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export to CSV
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b shrink-0">
                <tr className="text-left">
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
            </table>
            <div className="overflow-auto flex-1">
              <table className="w-full">
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
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
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
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Users className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFamilies.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No families found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}