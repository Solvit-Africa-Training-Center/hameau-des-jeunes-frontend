import { useState } from "react";
import { Search, UserPlus, Trash2, ClipboardList, AlertTriangle, X, Check } from "lucide-react";
import {
  useGetIfasheParentContractsQuery,
  useDeleteIfasheParentContractMutation,
} from "@/store/api/ifasheParentsApi";
import RecordAttendanceModal from "./RecordAttendanceModal";
import { toast } from "react-toastify";

export interface ParentContract {
  id: string;
  parentName: string;
  jobRole: string;
  contractStartDate: string;
  contractEndDate: string;
  status: string;
  notes: string;
  parentId: string;
}

interface IfasheTugufasheParentWorkViewProps {
  onAssignParent: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  SUSPENDED: "bg-amber-100 text-amber-700",
  TERMINATED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

export default function IfasheTugufasheParentWorkView({ onAssignParent }: IfasheTugufasheParentWorkViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [contractForAttendance, setContractForAttendance] = useState<ParentContract | null>(null);

  const { data: fetchedContracts = [], isLoading, isError } = useGetIfasheParentContractsQuery();
  const [deleteContract, { isLoading: isDeleting }] = useDeleteIfasheParentContractMutation();

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteContract(id).unwrap();
      toast.success("Assignment deleted.");
      setDeletingId(null);
    } catch {
      toast.error("Failed to delete assignment.");
    }
  };

  const contracts: ParentContract[] = fetchedContracts.map((c: any) => ({
    id: c.id,
    parentName: c.parent_name || "Unknown",
    jobRole: c.job_role || "—",
    contractStartDate: c.contract_start_date || "—",
    contractEndDate: c.contract_end_date || "—",
    status: c.status || "ACTIVE",
    notes: c.notes || "",
    parentId: c.parent || "",
  }));

  const filtered = contracts.filter((c) => {
    const matchesSearch =
      c.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.jobRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderActions = (c: ParentContract) => {
    if (deletingId === c.id) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs text-red-600 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Delete?
          </span>
          <button
            onClick={() => handleDeleteConfirm(c.id)}
            disabled={isDeleting}
            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg flex items-center gap-1 disabled:opacity-50"
          >
            <Check className="w-3 h-3" /> Yes
          </button>
          <button onClick={() => setDeletingId(null)} className="px-2.5 py-1 border border-gray-300 text-xs rounded-lg hover:bg-gray-50 flex items-center gap-1">
            <X className="w-3 h-3" /> No
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => { setContractForAttendance(c); setDeletingId(null); }}
          className="p-1.5 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Record Attendance"
        >
          <ClipboardList className="w-4 h-4 text-emerald-600" />
        </button>
        <button
          onClick={() => { setDeletingId(c.id); setContractForAttendance(null); }}
          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    );
  };

  const activeCount = contracts.filter((w) => w.status === "ACTIVE").length;
  const suspendedCount = contracts.filter((w) => w.status === "SUSPENDED").length;
  const terminatedCount = contracts.filter((w) => w.status === "TERMINATED").length;

  return (
    <>
      <RecordAttendanceModal
        isOpen={!!contractForAttendance}
        contract={contractForAttendance}
        onClose={() => setContractForAttendance(null)}
      />

      <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Parent Work Requirement</h1>
              <p className="text-sm text-gray-600">
                Manage parent work assignments and daily attendance
                {contracts.length > 0 && ` — ${contracts.length} contract${contracts.length !== 1 ? "s" : ""}`}
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-5 shrink-0">
            {[
              { label: "Active", count: activeCount, color: "text-green-600" },
              { label: "Suspended", count: suspendedCount, color: "text-amber-600" },
              { label: "Terminated", count: terminatedCount, color: "text-red-600" },
            ].map(({ label, count, color }) => (
              <div key={label} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{count}</p>
              </div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 shrink-0">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by parent name, job role, or supervisor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="TERMINATED">Terminated</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
            {isLoading && <div className="flex-1 flex items-center justify-center"><p className="text-gray-500 text-sm">Loading assignments...</p></div>}
            {isError && <div className="flex-1 flex items-center justify-center"><p className="text-red-500 text-sm">Error loading assignments. Please try again.</p></div>}

            {!isLoading && !isError && (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filtered.map((c) => (
                        <tr key={c.id} className={`transition-colors ${deletingId === c.id ? "bg-red-50" : "hover:bg-gray-50"}`}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.parentName}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{c.jobRole}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{c.contractStartDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{c.contractEndDate}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[c.status] || "bg-gray-100 text-gray-700"}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{renderActions(c)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
                  {filtered.map((c) => (
                    <div key={c.id} className={`border rounded-lg p-4 transition-shadow ${deletingId === c.id ? "border-red-300 bg-red-50" : "border-gray-200 hover:shadow-md"}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{c.parentName}</h3>
                          <p className="text-xs text-gray-500">{c.jobRole}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[c.status] || "bg-gray-100 text-gray-700"}`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs mb-3">
                        <div><span className="text-gray-500">End Date:</span> <span className="text-gray-900">{c.contractEndDate}</span></div>
                        <div><span className="text-gray-500">Started:</span> <span className="text-gray-900">{c.contractStartDate}</span></div>
                      </div>
                      <div className="pt-2 border-t">{renderActions(c)}</div>
                    </div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <p className="text-gray-500 text-sm">No parent work assignments found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}