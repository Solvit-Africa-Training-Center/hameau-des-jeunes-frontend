import { useState } from "react";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

export interface ParentWork {
  id: string;
  parentName: string;
  department: string;
  supervisor: string;
  status: "Active" | "Warning Issued" | "Suspended";
  performanceNotes: string;
  // Full data for the form
  assignedDepartment: string;
}

interface IfasheTugufasheParentWorkViewProps {
  onAssignParent: () => void;
}

export default function IfasheTugufasheParentWorkView({
  onAssignParent,
}: IfasheTugufasheParentWorkViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const parentWorks: ParentWork[] = [
    {
      id: "1",
      parentName: "Mukamana Vestine",
      department: "Kitchen",
      supervisor: "Uwera Christine",
      status: "Active",
      performanceNotes: "Excellent performance. Very punctual and dedicated.",
      assignedDepartment: "Kitchen",
    },
    {
      id: "2",
      parentName: "Niyonzima Jean Claude",
      department: "Farm",
      supervisor: "Mugisha John",
      status: "Warning Issued",
      performanceNotes: "Good worker but has been absent due to injury recently.",
      assignedDepartment: "Farm",
    },
    {
      id: "3",
      parentName: "Uwihana Grace",
      department: "Cleaning",
      supervisor: "Mukamana Rose",
      status: "Active",
      performanceNotes: "Reliable and thorough. Takes pride in work.",
      assignedDepartment: "Cleaning",
    },
    {
      id: "4",
      parentName: "Habimana Patrick",
      department: "Maintenance",
      supervisor: "Niyonzima Eric",
      status: "Active",
      performanceNotes: "Skilled in basic repairs. Good attendance.",
      assignedDepartment: "Maintenance",
    },
    {
      id: "5",
      parentName: "Nyirahabimana Angelique",
      department: "Admin Support",
      supervisor: "Inakundwa Marie",
      status: "Active",
      performanceNotes: "Helps with filing and basic office tasks. Very organized.",
      assignedDepartment: "Admin Support",
    },
    {
      id: "6",
      parentName: "Ndayisaba Emmanuel",
      department: "IT Support",
      supervisor: "Kayitezi Alice",
      status: "Active",
      performanceNotes: "Uses accounting background to help with data entry. Excellent",
      assignedDepartment: "IT Support",
    },
    {
      id: "7",
      parentName: "Mukamazimpaka Claudine",
      department: "Kitchen",
      supervisor: "Uwera Christine",
      status: "Active",
      performanceNotes: "Good worker, learning quickly.",
      assignedDepartment: "Kitchen",
    },
    {
      id: "8",
      parentName: "Bizimana Joseph",
      department: "Farm",
      supervisor: "Mugisha John",
      status: "Suspended",
      performanceNotes: "Multiple absences without notice. Needs improvement.",
      assignedDepartment: "Farm",
    },
  ];

  const filteredParentWorks = parentWorks.filter((work) => {
    const matchesSearch =
      work.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.supervisor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || work.status.toLowerCase().replace(" ", "-") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: ParentWork["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Warning Issued":
        return "bg-amber-100 text-amber-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const activeCount = parentWorks.filter((w) => w.status === "Active").length;
  const warningCount = parentWorks.filter((w) => w.status === "Warning Issued").length;
  const suspendedCount = parentWorks.filter((w) => w.status === "Suspended").length;

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Parent Work Requirement
            </h1>
            <p className="text-sm text-gray-600">
              Track parent participation in organizational work
            </p>
          </div>
          <button
            onClick={onAssignParent}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Assign Parent
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 mb-1">Active Assignments</p>
            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 mb-1">Warning Issued</p>
            <p className="text-2xl font-bold text-gray-900">{warningCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 mb-1">Suspended</p>
            <p className="text-2xl font-bold text-gray-900">{suspendedCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 shrink-0">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by parent name, department or supervisor..."
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
            <option value="warning-issued">Warning Issued</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b shrink-0">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance Notes
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
                  {filteredParentWorks.map((work) => (
                    <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{work.parentName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{work.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{work.supervisor}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            work.status
                          )}`}
                        >
                          {work.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{work.performanceNotes}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
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
            {filteredParentWorks.map((work) => (
              <div
                key={work.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{work.parentName}</h3>
                    <p className="text-xs text-gray-500">{work.department}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      work.status
                    )}`}
                  >
                    {work.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Supervisor:</span>
                    <span className="ml-1 text-gray-900">{work.supervisor}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Performance:</span>
                    <p className="text-gray-900 mt-1">{work.performanceNotes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors">
                    <Edit className="w-4 h-4 text-blue-500" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredParentWorks.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No parent work assignments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}