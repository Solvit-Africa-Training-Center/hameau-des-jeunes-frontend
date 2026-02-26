import { useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useGetIfasheSchoolSupportsQuery, useDeleteIfasheSchoolSupportMutation } from "@/store/api/ifasheSchoolSupportApi";
import { toast } from "react-toastify";
import ViewSchoolSupportModal from "./ViewSchoolSupportModal";
import EditSchoolSupportModal from "./EditSchoolSupportModal";

export interface SchoolSupport {
  id: string;
  childName: string;
  schoolName: string;
  academicYear: string;
  schoolFees: string;
  materialsCost: string;
  totalCost: string;
  paymentStatus: string;
  notes: string;
  totalPaid: number;
  balanceDue: number;
  isOverdue: boolean;
  // raw ids for edit
  childId: string;
  schoolId: string;
}

interface IfasheTugufasheSchoolSupportViewProps {
  onAddPayment: () => void;
}

export default function IfasheTugufasheSchoolSupportView({
  onAddPayment,
}: IfasheTugufasheSchoolSupportViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [recordToView, setRecordToView] = useState<SchoolSupport | null>(null);
  const [recordToEdit, setRecordToEdit] = useState<SchoolSupport | null>(null);

  const { data: fetchedRecords = [], isLoading, isError } = useGetIfasheSchoolSupportsQuery();
  const [deleteRecord] = useDeleteIfasheSchoolSupportMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this school support record?")) {
      try {
        await deleteRecord(id).unwrap();
        toast.success("Record deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete record");
      }
    }
  };

  const records: SchoolSupport[] = fetchedRecords.map((p: any) => ({
    id: p.id,
    childName: p.child_name || "Unknown",
    schoolName: p.school_name || "Unknown",
    academicYear: p.academic_year || "N/A",
    schoolFees: p.school_fees || "0",
    materialsCost: p.materials_cost || "0",
    totalCost: p.total_cost || "0",
    paymentStatus: p.payment_status || "PENDING",
    notes: p.notes || "",
    totalPaid: p.total_paid || 0,
    balanceDue: p.balance_due || 0,
    isOverdue: p.is_overdue || false,
    childId: p.child || "",
    schoolId: p.school || "",
  }));

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.academicYear.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-100 text-green-700";
      case "PARTIAL": return "bg-blue-100 text-blue-700";
      case "PENDING": return "bg-amber-100 text-amber-700";
      case "OVERDUE": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const overdueCount = records.filter((r) => r.isOverdue || r.paymentStatus === "OVERDUE").length;

  return (
    <>
      <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">School Support</h1>
              <p className="text-sm text-gray-600">Manage education-related assistance</p>
            </div>
            <button
              onClick={onAddPayment}
              className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add School Support
            </button>
          </div>

          {/* Overdue Warning Banner */}
          {overdueCount > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-5 shrink-0 rounded-r-lg">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    ⚠️ {overdueCount} child{overdueCount !== 1 ? "ren" : ""} with overdue fee payments
                  </p>
                  <p className="text-xs text-amber-700">Review overdue records below and follow up.</p>
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 shrink-0">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by child name or school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PARTIAL">Partial</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
            {isLoading && (
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-gray-500">Loading school support records...</p>
              </div>
            )}
            {isError && (
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-red-500">Error loading records. Please try again.</p>
              </div>
            )}
            {!isLoading && !isError && (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.childName}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{record.schoolName}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{record.academicYear}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{record.totalCost} RWF</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{record.totalPaid} RWF</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{record.balanceDue} RWF</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.paymentStatus)}`}>
                              {record.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setRecordToView(record)}
                                className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                onClick={() => setRecordToEdit(record)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4 text-gray-500" />
                              </button>
                              <button
                                onClick={() => handleDelete(record.id)}
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

                {/* Mobile Cards */}
                <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
                  {filteredRecords.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{record.childName}</h3>
                          <p className="text-xs text-gray-500">{record.schoolName} · {record.academicYear}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.paymentStatus)}`}>
                          {record.paymentStatus}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs mb-3">
                        <div>
                          <span className="text-gray-500">Total Cost:</span>
                          <span className="ml-1 text-gray-900 font-medium">{record.totalCost} RWF</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Paid:</span>
                          <span className="ml-1 text-gray-900">{record.totalPaid} RWF</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Balance:</span>
                          <span className={`ml-1 font-medium ${record.balanceDue > 0 ? "text-red-600" : "text-green-600"}`}>
                            {record.balanceDue} RWF
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <button
                          onClick={() => setRecordToView(record)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button
                          onClick={() => setRecordToEdit(record)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {filteredRecords.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No school support records found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewSchoolSupportModal
        isOpen={!!recordToView}
        onClose={() => setRecordToView(null)}
        record={recordToView}
      />
      <EditSchoolSupportModal
        isOpen={!!recordToEdit}
        onClose={() => setRecordToEdit(null)}
        record={recordToEdit}
      />
    </>
  );
}