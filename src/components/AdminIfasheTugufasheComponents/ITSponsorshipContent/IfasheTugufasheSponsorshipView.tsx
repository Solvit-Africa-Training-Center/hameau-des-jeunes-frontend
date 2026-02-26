import { useState } from "react";
import { Search, Eye, Pencil, Users, UserPlus } from "lucide-react";
import { useGetIfasheSponsorshipsQuery } from "@/store/api/ifasheSponsorshipsApi";
import ViewSponsorshipModal from "./ViewSponsorshipModal";
import EditSponsorshipModal from "./EditSponsorshipModal";
import ManageSponsorshipModal from "./ManageSponsorshipModal";

export interface Sponsorship {
  id: string;
  childId: string;
  beneficiaryName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  pauseReason: string;
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

  const [sponsorshipToView, setSponsorshipToView] = useState<Sponsorship | null>(null);
  const [sponsorshipToEdit, setSponsorshipToEdit] = useState<Sponsorship | null>(null);
  const [sponsorshipToManage, setSponsorshipToManage] = useState<Sponsorship | null>(null);

  const { data: fetchedSponsorships = [], isLoading, isError } = useGetIfasheSponsorshipsQuery();

  const sponsorships: Sponsorship[] = fetchedSponsorships.map((s: any) => ({
    id: s.id || Math.random().toString(),
    childId: s.child?.substring(0, 8) || "N/A",
    beneficiaryName: s.child_name || "Unknown",
    type: s.sponsorship_type || "FULL",
    startDate: s.start_date || "Unknown",
    endDate: s.end_date || "N/A",
    status: s.status || "ACTIVE",
    pauseReason: s.pause_reason || "",
  }));

  const filteredSponsorships = sponsorships.filter((sponsorship) => {
    const matchesSearch =
      sponsorship.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsorship.childId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "all" || sponsorship.type.toLowerCase() === typeFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      sponsorship.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "SUSPENDED":
        return "bg-amber-100 text-amber-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stats = [
    {
      id: 1,
      title: "Total Sponsorships",
      value: sponsorships.length.toString(),
    },
    {
      id: 2,
      title: "Active",
      value: sponsorships.filter((s) => s.status === "ACTIVE").length.toString(),
    },
    {
      id: 3,
      title: "Suspended",
      value: sponsorships.filter((s) => s.status === "SUSPENDED").length.toString(),
    },
    {
      id: 4,
      title: "Completed",
      value: sponsorships.filter((s) => s.status === "COMPLETED").length.toString(),
    },
  ];

  return (
    <>
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
              placeholder="Search by child name or ID..."
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
            <option value="PARTIAL">Partial</option>
            <option value="FULL">Full</option>
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
          </select>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-gray-500">Loading sponsorships...</p>
            </div>
          )}
          {isError && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-red-500">Error loading sponsorships. Please try again.</p>
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
                    Child ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beneficiary
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
              <tbody className="bg-white divide-y divide-gray-100">
                  {filteredSponsorships.map((sponsorship) => (
                    <tr key={sponsorship.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{sponsorship.childId}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {sponsorship.beneficiaryName}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{sponsorship.type}</td>
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
                            onClick={() => setSponsorshipToView(sponsorship)}
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => setSponsorshipToEdit(sponsorship)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => setSponsorshipToManage(sponsorship)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            title="Manage"
                          >
                            <Users className="w-4 h-4 text-red-400" />
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
                    <span className="text-gray-500">Period:</span>
                    <span className="ml-1 text-gray-900">
                      {sponsorship.startDate} - {sponsorship.endDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t">
                  <button
                    onClick={() => setSponsorshipToView(sponsorship)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => setSponsorshipToEdit(sponsorship)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setSponsorshipToManage(sponsorship)}
                    className="p-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Users className="w-4 h-4 text-red-400" />
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
          </>
          )}
        </div>

        {/* Modals */}
        <ViewSponsorshipModal
          isOpen={!!sponsorshipToView}
          onClose={() => setSponsorshipToView(null)}
          sponsorship={sponsorshipToView}
        />
        <EditSponsorshipModal
          isOpen={!!sponsorshipToEdit}
          onClose={() => setSponsorshipToEdit(null)}
          sponsorship={sponsorshipToEdit}
        />
        <ManageSponsorshipModal
          isOpen={!!sponsorshipToManage}
          onClose={() => setSponsorshipToManage(null)}
          sponsorship={sponsorshipToManage}
        />
      </div>
    </div>
    </>
  );
}