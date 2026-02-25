import { useState } from "react";
import { Search, Plus, Trash2, Pencil, Shirt, AlertTriangle, X, Check } from "lucide-react";
import {
  useGetIfasheDressingsQuery,
  useDeleteIfasheDressingMutation,
} from "@/store/api/ifasheDressingApi";
import EditClothesDistributionModal from "./EditClothesDistributionModal";
import { toast } from "react-toastify";

export interface ClothesDistribution {
  id: string;
  childName: string;
  itemType: string;
  size: string;
  quantity: number;
  distributionDate: string;
  notes: string;
  childId: string;
}

interface IfasheTugufasheClothesViewProps {
  onAddDistribution: () => void;
}

export default function IfasheTugufasheClothesView({ onAddDistribution }: IfasheTugufasheClothesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recordToEdit, setRecordToEdit] = useState<ClothesDistribution | null>(null);
  // Track which row is in "confirm delete" state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: fetchedDistributions = [], isLoading, isError } = useGetIfasheDressingsQuery();
  const [deleteDistribution, { isLoading: isDeleting }] = useDeleteIfasheDressingMutation();

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteDistribution(id).unwrap();
      toast.success("Distribution deleted.");
      setDeletingId(null);
    } catch {
      toast.error("Failed to delete distribution.");
    }
  };

  // Map API response fields correctly
  const distributions: ClothesDistribution[] = fetchedDistributions.map((d: any) => ({
    id: d.id,
    childName: d.child_name || "Unknown",
    itemType: d.item_type || "—",
    size: d.size || "—",
    quantity: d.quantity ?? 0,
    distributionDate: d.distribution_date || "—",
    notes: d.notes || "",
    childId: d.child || "",
  }));

  const filtered = distributions.filter(
    (d) =>
      d.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.itemType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActions = (d: ClothesDistribution) => {
    if (deletingId === d.id) {
      // Inline confirm row
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs text-red-600 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Delete?
          </span>
          <button
            onClick={() => handleDeleteConfirm(d.id)}
            disabled={isDeleting}
            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
          >
            <Check className="w-3 h-3" /> Yes
          </button>
          <button
            onClick={() => setDeletingId(null)}
            className="px-2.5 py-1 border border-gray-300 text-xs rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> No
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => setRecordToEdit(d)}
          className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit"
        >
          <Pencil className="w-4 h-4 text-blue-500" />
        </button>
        <button
          onClick={() => { setDeletingId(d.id); setRecordToEdit(null); }}
          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    );
  };

  return (
    <>
      <EditClothesDistributionModal
        isOpen={!!recordToEdit}
        distribution={recordToEdit}
        onClose={() => setRecordToEdit(null)}
      />

      <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Clothes Support</h1>
              <p className="text-sm text-gray-600">
                Track clothing and essential items distributed to children
                {distributions.length > 0 && ` — ${distributions.length} record${distributions.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <button
              onClick={onAddDistribution}
              className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Distribution
            </button>
          </div>

          {/* Search */}
          <div className="mb-4 shrink-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by child name or item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
            {isLoading && (
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-gray-500 text-sm">Loading distributions...</p>
              </div>
            )}
            {isError && (
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-red-500 text-sm">Error loading records. Please try again.</p>
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
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Item Type</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filtered.map((d) => (
                        <tr key={d.id} className={`transition-colors ${deletingId === d.id ? "bg-red-50" : "hover:bg-gray-50"}`}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{d.childName}</td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-sm text-gray-700">
                              <Shirt className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              {d.itemType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{d.size}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">{d.quantity}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{d.distributionDate}</td>
                          <td className="px-6 py-4">{renderActions(d)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
                  {filtered.map((d) => (
                    <div
                      key={d.id}
                      className={`border rounded-lg p-4 transition-shadow ${deletingId === d.id ? "border-red-300 bg-red-50" : "border-gray-200 hover:shadow-md"}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{d.childName}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <Shirt className="w-3 h-3 text-emerald-600" />
                            {d.itemType} {d.size !== "—" ? `(${d.size})` : ""}
                          </p>
                        </div>
                        <div>{renderActions(d)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div><span className="text-gray-500">Qty:</span> <span className="font-medium text-gray-900">{d.quantity}</span></div>
                        <div><span className="text-gray-500">Date:</span> <span className="text-gray-900">{d.distributionDate}</span></div>
                        {d.notes && <div className="col-span-2"><span className="text-gray-500">Notes:</span> <span className="text-gray-700">{d.notes}</span></div>}
                      </div>
                    </div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
                    <Shirt className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-500 text-sm">No distributions found.</p>
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