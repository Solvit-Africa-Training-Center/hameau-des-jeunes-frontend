import { useState } from "react";
import { Search, Download, Eye, Pencil, UserPlus, Users } from "lucide-react";

export interface Child {
  id: string;
  childId: string;
  name: string;
  family: string;
  school: string;
  educationLevel: string;
  status: "Active" | "Inactive" | "Graduated" | "Transferred";
  // Full data for the form
  linkedFamily: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  schoolName: string;
  supportStatus: string;
  healthConditions: string;
}

interface IfasheTugufasheChildrenViewProps {
  onRegisterChild: () => void;
}

export default function IfasheTugufasheChildrenView({
  onRegisterChild,
}: IfasheTugufasheChildrenViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [schoolFilter, setSchoolFilter] = useState("all");

  const children: Child[] = [
    {
      id: "1",
      childId: "#2001",
      name: "Ishimwe Marie",
      family: "Mukamana Vestine",
      school: "Remera Primary School",
      educationLevel: "Primary 5",
      status: "Active",
      linkedFamily: "Mukamana Vestine",
      fullName: "Ishimwe Marie",
      dateOfBirth: "2014-03-15",
      gender: "Female",
      schoolName: "Remera Primary School",
      supportStatus: "Active",
      healthConditions: "None",
    },
    {
      id: "2",
      childId: "#2002",
      name: "Mugisha Eric",
      family: "Mukamana Vestine",
      school: "Remera Primary School",
      educationLevel: "Primary 3",
      status: "Active",
      linkedFamily: "Mukamana Vestine",
      fullName: "Mugisha Eric",
      dateOfBirth: "2016-07-22",
      gender: "Male",
      schoolName: "Remera Primary School",
      supportStatus: "Active",
      healthConditions: "Asthma - requires inhaler",
    },
    {
      id: "3",
      childId: "#2003",
      name: "Uwase Serah",
      family: "Mukamana Vestine",
      school: "Remera Primary School",
      educationLevel: "Nursery",
      status: "Active",
      linkedFamily: "Mukamana Vestine",
      fullName: "Uwase Serah",
      dateOfBirth: "2019-11-10",
      gender: "Female",
      schoolName: "Remera Primary School",
      supportStatus: "Active",
      healthConditions: "None",
    },
    {
      id: "4",
      childId: "#2004",
      name: "Niyonzima Desire",
      family: "Niyonzima Jean Claude",
      school: "Nyamirambo Secondary School",
      educationLevel: "Secondary 2",
      status: "Active",
      linkedFamily: "Niyonzima Jean Claude",
      fullName: "Niyonzima Desire",
      dateOfBirth: "2010-05-18",
      gender: "Male",
      schoolName: "Nyamirambo Secondary School",
      supportStatus: "Active",
      healthConditions: "None",
    },
    {
      id: "5",
      childId: "#2005",
      name: "Niyonzima Peace",
      family: "Niyonzima Jean Claude",
      school: "Nyamirambo Primary School",
      educationLevel: "Primary 5",
      status: "Active",
      linkedFamily: "Niyonzima Jean Claude",
      fullName: "Niyonzima Peace",
      dateOfBirth: "2013-09-25",
      gender: "Female",
      schoolName: "Nyamirambo Primary School",
      supportStatus: "Active",
      healthConditions: "Allergic to peanuts",
    },
    {
      id: "6",
      childId: "#2006",
      name: "Niyonzima Diane",
      family: "Niyonzima Jean Claude",
      school: "Nyamirambo Primary School",
      educationLevel: "Primary 2",
      status: "Active",
      linkedFamily: "Niyonzima Jean Claude",
      fullName: "Niyonzima Diane",
      dateOfBirth: "2016-02-14",
      gender: "Female",
      schoolName: "Nyamirambo Primary School",
      supportStatus: "Active",
      healthConditions: "None",
    },
    {
      id: "7",
      childId: "#2007",
      name: "Niyonzima Junior",
      family: "Niyonzima Jean Claude",
      school: "Nyamirambo Primary School",
      educationLevel: "Primary 1",
      status: "Active",
      linkedFamily: "Niyonzima Jean Claude",
      fullName: "Niyonzima Junior",
      dateOfBirth: "2017-06-30",
      gender: "Male",
      schoolName: "Nyamirambo Primary School",
      supportStatus: "Active",
      healthConditions: "None",
    },
    {
      id: "8",
      childId: "#2008",
      name: "Umutoni Ange",
      family: "Uwihana Grace",
      school: "Gikondo Primary School",
      educationLevel: "Primary 4",
      status: "Active",
      linkedFamily: "Uwihana Grace",
      fullName: "Umutoni Ange",
      dateOfBirth: "2014-12-05",
      gender: "Female",
      schoolName: "Gikondo Primary School",
      supportStatus: "Active",
      healthConditions: "Vision impairment - wears glasses",
    },
  ];

  const filteredChildren = children.filter((child) => {
    const matchesSearch =
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.childId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || child.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesSchool =
      schoolFilter === "all" || child.school.toLowerCase().includes(schoolFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesSchool;
  });

  const getStatusColor = (status: Child["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Graduated":
        return "bg-blue-100 text-blue-700";
      case "Transferred":
        return "bg-amber-100 text-amber-700";
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
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Child Management</h1>
            <p className="text-sm text-gray-600">Manage child records</p>
          </div>
          <button
            onClick={onRegisterChild}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Register New Child
          </button>
        </div>

        {/* Search, Filters, and Export */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, school or family..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white appearance-none min-w-35"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
              <option value="transferred">Transferred</option>
            </select>

            <select
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white appearance-none min-w-35"
            >
              <option value="all">All Schools</option>
              <option value="remera">Remera Primary School</option>
              <option value="nyamirambo">Nyamirambo Primary School</option>
              <option value="gikondo">Gikondo Primary School</option>
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
                    Child ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Names
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Family
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Education Level
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
                  {filteredChildren.map((child) => (
                    <tr key={child.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{child.childId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{child.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{child.family}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{child.school}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{child.educationLevel}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            child.status
                          )}`}
                        >
                          {child.status}
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
                            title="Manage"
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
            {filteredChildren.map((child) => (
              <div
                key={child.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">{child.childId}</p>
                    <h3 className="font-medium text-gray-900 text-sm">{child.name}</h3>
                    <p className="text-xs text-gray-500">{child.family}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      child.status
                    )}`}
                  >
                    {child.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">School:</span>
                    <span className="ml-1 text-gray-900">{child.school}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Level:</span>
                    <span className="ml-1 text-gray-900">{child.educationLevel}</span>
                  </div>
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
          {filteredChildren.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No children found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}