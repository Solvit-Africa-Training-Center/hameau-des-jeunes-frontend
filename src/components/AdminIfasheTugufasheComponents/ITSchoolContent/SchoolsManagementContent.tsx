import { useState } from "react";
import { Plus, Trash2, School, Search, AlertTriangle, X, Check, Phone, Mail, MapPin } from "lucide-react";
import {
  useGetInstitutionsQuery,
  useCreateInstitutionMutation,
  useDeleteInstitutionMutation,
} from "@/store/api/educationApi";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

export default function SchoolsManagementContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const { data: institutions = [], isLoading, isError } = useGetInstitutionsQuery();
  const [createInstitution, { isLoading: isCreating }] = useCreateInstitutionMutation();
  const [deleteInstitution, { isLoading: isDeleting }] = useDeleteInstitutionMutation();

  const handleAdd = async () => {
    if (!newSchool.name.trim()) {
      toast.error("School name is required");
      return;
    }
    try {
      await createInstitution({
        name: newSchool.name.trim(),
        address: newSchool.address.trim(),
        phone: newSchool.phone.trim(),
        email: newSchool.email.trim(),
        programs: [],
      }).unwrap();
      toast.success(`"${newSchool.name}" added to the registry!`);
      setNewSchool({ name: "", address: "", phone: "", email: "" });
      setShowAddForm(false);
    } catch (err) {
      toast.error(parseApiError(err, "Failed to add school."));
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteInstitution(id).unwrap();
      toast.success("School removed from registry.");
      setDeletingId(null);
    } catch (err) {
      toast.error(parseApiError(err, "Failed to delete school."));
    }
  };

  const filtered = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (inst.address || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRowActions = (id: string) => {
    if (deletingId === id) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs text-red-600 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Delete?
          </span>
          <button
            onClick={() => handleDeleteConfirm(id)}
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
      <button
        onClick={() => setDeletingId(id)}
        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
        title="Remove from registry"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    );
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Schools Registry</h1>
            <p className="text-sm text-gray-600">
              Manage educational institutions available when registering children
              {institutions.length > 0 && ` — ${institutions.length} institution${institutions.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add School
          </button>
        </div>

        {/* Add School Form */}
        {showAddForm && (
          <div className="bg-white border border-emerald-200 rounded-xl p-5 mb-5 shrink-0 shadow-sm">
            <h3 className="text-sm font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              <School className="w-4 h-4" />
              New Educational Institution
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">School / Institution Name *</label>
                <input
                  type="text"
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                  placeholder="e.g. GS Kacyiru"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              {/* Address */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Address</span>
                </label>
                <input
                  type="text"
                  value={newSchool.address}
                  onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                  placeholder="e.g. Kigali, Kacyiru"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</span>
                </label>
                <input
                  type="text"
                  value={newSchool.phone}
                  onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                  placeholder="+250 7XX XXX XXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</span>
                </label>
                <input
                  type="email"
                  value={newSchool.email}
                  onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                  placeholder="info@school.rw"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setShowAddForm(false); setNewSchool({ name: "", address: "", phone: "", email: "" }); }}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={isCreating || !newSchool.name.trim()}
                className="px-4 py-2 text-sm bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {isCreating ? "Adding..." : "Add to Registry"}
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-4 shrink-0">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or address..."
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
              <p className="text-gray-500 text-sm">Loading schools...</p>
            </div>
          )}
          {isError && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-red-500 text-sm">Failed to load institutions. Please try again.</p>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Institution Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filtered.map((inst) => (
                      <tr key={inst.id} className={`transition-colors ${deletingId === inst.id ? "bg-red-50" : "hover:bg-gray-50"}`}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                          <School className="w-4 h-4 text-emerald-600 shrink-0" />
                          {inst.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inst.address || "—"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inst.phone || "—"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inst.email || "—"}</td>
                        <td className="px-6 py-4">{renderRowActions(inst.id)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
                {filtered.map((inst) => (
                  <div key={inst.id} className={`border rounded-lg p-4 transition-shadow ${deletingId === inst.id ? "border-red-300 bg-red-50" : "border-gray-200 hover:shadow-md"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm flex items-center gap-1.5">
                          <School className="w-4 h-4 text-emerald-600" /> {inst.name}
                        </h3>
                        {inst.address && <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{inst.address}</p>}
                        {inst.phone && <p className="text-xs text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" />{inst.phone}</p>}
                        {inst.email && <p className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" />{inst.email}</p>}
                      </div>
                      <div>{renderRowActions(inst.id)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
                  <School className="w-10 h-10 text-gray-300" />
                  <p className="text-gray-500 text-sm">
                    {searchQuery ? "No schools match your search." : "No schools yet. Click \"Add School\" to get started."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
