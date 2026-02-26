import { useState } from "react";
import { Search, Eye, Pencil, Users, UserPlus } from "lucide-react";

export interface Sponsorship {
  id: string;
  childId: string;
  beneficiaryName: string;
  beneficiaryFamily: string;
  type: "Education-only" | "Partial" | "Full";
  sponsorSource: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Suspended" | "Completed" | "Pending";
  // Full data for the form
  selectFamily: string;
  selectChild: string;
  sponsorshipType: string;
  startDateFull: string;
  expectedEndDate: string;
}

interface IrasheTugufasheSponsorshipViewProps {
  onAssignSponsorship: () => void;
}

export default function IrasheTugufasheSponsorshipView({
  onAssignSponsorship,
}: IrasheTugufasheSponsorshipViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const sponsorships: Sponsorship[] = [
    {
      id: "1",
      childId: "#3001",
      beneficiaryName: "Ishimwe Marie",
      beneficiaryFamily: "Chidi",
      type: "Education-only",
      sponsorSource: "Global Education Fund",
      startDate: "8/22/2025",
      endDate: "8/22/2029",
      status: "Active",
      selectFamily: "Mukamana Vestine",
      selectChild: "Ishimwe Marie",
      sponsorshipType: "Education-only",
      startDateFull: "2025-08-22",
      expectedEndDate: "2029-08-22",
    },
    {
      id: "2",
      childId: "#3002",
      beneficiaryName: "Mukamana Vestine",
      beneficiaryFamily: "Family",
      type: "Partial",
      sponsorSource: "Individual - Sarah Johnson",
      startDate: "9/1/2025",
      endDate: "8/22/2029",
      status: "Active",
      selectFamily: "Mukamana Vestine",
      selectChild: "Family-wide sponsorship",
      sponsorshipType: "Partial",
      startDateFull: "2025-09-01",
      expectedEndDate: "2029-08-22",
    },
    {
      id: "3",
      childId: "#3003",
      beneficiaryName: "Niyonzima Desire",
      beneficiaryFamily: "Chidi",
      type: "Full",
      sponsorSource: "Hope for Rwanda Foundation",
      startDate: "9/18/2025",
      endDate: "9/18/2025",
      status: "Active",
      selectFamily: "Niyonzima Jean Claude",
      selectChild: "Niyonzima Desire",
      sponsorshipType: "Full",
      startDateFull: "2025-09-18",
      expectedEndDate: "2029-09-18",
    },
    {
      id: "4",
      childId: "#3004",
      beneficiaryName: "Uwihana Grace",
      beneficiaryFamily: "Family",
      type: "Full",
      sponsorSource: "United Relief Organization",
      startDate: "10/10/2025",
      endDate: "8/22/2029",
      status: "Active",
      selectFamily: "Uwihana Grace",
      selectChild: "Family-wide sponsorship",
      sponsorshipType: "Full",
      startDateFull: "2025-10-10",
      expectedEndDate: "2029-08-22",
    },
    {
      id: "5",
      childId: "#3005",
      beneficiaryName: "Habimana Kevin",
      beneficiaryFamily: "Chidi",
      type: "Education-only",
      sponsorSource: "Individual - Michael Brown",
      startDate: "11/15/2025",
      endDate: "8/22/2029",
      status: "Active",
      selectFamily: "Habimana Patrick",
      selectChild: "Habimana Kevin",
      sponsorshipType: "Education-only",
      startDateFull: "2025-11-15",
      expectedEndDate: "2029-08-22",
    },
    {
      id: "6",
      childId: "#3006",
      beneficiaryName: "Nyirahabimana Angelique",
      beneficiaryFamily: "Family",
      type: "Partial",
      sponsorSource: "Community Church Group",
      startDate: "12/15/2025",
      endDate: "8/22/2029",
      status: "Active",
      selectFamily: "Nyirahabimana Angelique",
      selectChild: "Family-wide sponsorship",
      sponsorshipType: "Partial",
      startDateFull: "2025-12-15",
      expectedEndDate: "2029-08-22",
    },
    {
      id: "7",
      childId: "#3007",
      beneficiaryName: "Ndayisaba Dylan",
      beneficiaryFamily: "Chidi",
      type: "Education-only",
      sponsorSource: "Individual - Emma Wilson",
      startDate: "12/30/2025",
      endDate: "8/22/2029",
      status: "Active",
      selectFamily: "Ndayisaba Emmanuel",
      selectChild: "Ndayisaba Dylan",
      sponsorshipType: "Education-only",
      startDateFull: "2025-12-30",
      expectedEndDate: "2029-08-22",
    },
    {
      id: "8",
      childId: "#3008",
      beneficiaryName: "Bizimana Joseph",
      beneficiaryFamily: "Family",
      type: "Full",
      sponsorSource: "Rwanda Development Trust",
      startDate: "1/5/2026",
      endDate: "1/5/2030",
      status: "Active",
      selectFamily: "Bizimana Joseph",
      selectChild: "Family-wide sponsorship",
      sponsorshipType: "Full",
      startDateFull: "2026-01-05",
      expectedEndDate: "2030-01-05",
    },
    {
      id: "9",
      childId: "#3009",
      beneficiaryName: "Mukamazimpaka Eric",
      beneficiaryFamily: "Chidi",
      type: "Partial",
      sponsorSource: "Individual - David Kim",
      startDate: "1/20/2026",
      endDate: "1/20/2029",
      status: "Suspended",
      selectFamily: "Mukamazimpaka Claudine",
      selectChild: "Mukamazimpaka Eric",
      sponsorshipType: "Partial",
      startDateFull: "2026-01-20",
      expectedEndDate: "2029-01-20",
    },
  ];

  const filteredSponsorships = sponsorships.filter((sponsorship) => {
    const matchesSearch =
      sponsorship.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsorship.sponsorSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsorship.beneficiaryFamily.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsorship.childId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "all" || sponsorship.type.toLowerCase() === typeFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      sponsorship.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Sponsorship["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Suspended":
        return "bg-amber-100 text-amber-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stats = [
    {
      id: 1,
      title: "Total Sponsorships",
      value: "9",
    },
    {
      id: 2,
      title: "Active",
      value: "8",
    },
    {
      id: 3,
      title: "Suspended",
      value: "1",
    },
    {
      id: 4,
      title: "Completed",
      value: "0",
    },
  ];

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Sponsorship Management
            </h1>
            <p className="text-sm text-gray-600">Track and manage sponsorships</p>
          </div>
          <button
            onClick={onAssignSponsorship}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Assign Sponsorship
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 shrink-0">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <p className="text-xs text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 shrink-0">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by child, sponsor or family..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white appearance-none min-w-35"
          >
            <option value="all">All Types</option>
            <option value="education-only">Education-only</option>
            <option value="partial">Partial</option>
            <option value="full">Full</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white appearance-none min-w-35"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
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
                    Child ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beneficiary
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sponsor Source
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start & End Date
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
                  {filteredSponsorships.map((sponsorship) => (
                    <tr key={sponsorship.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{sponsorship.childId}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {sponsorship.beneficiaryName}
                          </p>
                          <p className="text-xs text-gray-500">{sponsorship.beneficiaryFamily}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{sponsorship.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {sponsorship.sponsorSource}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {sponsorship.startDate} - {sponsorship.endDate}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            sponsorship.status
                          )}`}
                        >
                          {sponsorship.status}
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
            {filteredSponsorships.map((sponsorship) => (
              <div
                key={sponsorship.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">{sponsorship.childId}</p>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {sponsorship.beneficiaryName}
                    </h3>
                    <p className="text-xs text-gray-500">{sponsorship.beneficiaryFamily}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      sponsorship.status
                    )}`}
                  >
                    {sponsorship.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-1 text-gray-900">{sponsorship.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sponsor:</span>
                    <span className="ml-1 text-gray-900">{sponsorship.sponsorSource}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Period:</span>
                    <span className="ml-1 text-gray-900">
                      {sponsorship.startDate} - {sponsorship.endDate}
                    </span>
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
          {filteredSponsorships.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No sponsorships found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}