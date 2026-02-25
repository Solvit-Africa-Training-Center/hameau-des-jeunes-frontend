import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  UserMinus,
} from "lucide-react";
import { FaUserPlus } from "react-icons/fa6";
import {
  useGetChildrenQuery,
  useDeleteChildMutation,
} from "@/store/api/childrenApi";
import type { Child } from "@/store/api/childrenApi";
import { toast } from "react-toastify";
import EditChildModal from "./EditChildmodal";

interface ChildrenRegistryViewProps {
  onRegisterClick: () => void;
  onViewChild: (child: Child) => void;
}

export default function ChildrenRegistryView({
  onRegisterClick,
  onViewChild,
}: ChildrenRegistryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  const { data: children = [], isLoading, isError } = useGetChildrenQuery();
  const [deleteChild] = useDeleteChildMutation();

  const filteredChildren = children.filter((child) =>
    child.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this child?")) return;
    try {
      await deleteChild(id).unwrap();
      toast.success("Child removed successfully.");
    } catch {
      toast.error("Failed to remove child.");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "text-green-600";
    return "text-gray-400";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Children Registry
            </h1>
            <p className="text-sm text-gray-600">
              Manage all children currently in care or previously released.
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="flex items-center gap-2 bg-emerald-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <FaUserPlus className="w-5 h-5" />
            Register New Child
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex justify-end gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Children Overview Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Children Overview</h2>
              <button className="text-sm text-emerald-900 hover:text-emerald-700 font-medium">
                View All →
              </button>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="p-12 text-center text-sm text-gray-400">
              Loading children...
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="p-12 text-center text-sm text-red-500">
              Failed to load children. Please try again.
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && filteredChildren.length === 0 && (
            <div className="p-12 text-center text-sm text-gray-500">
              No children found matching your search.
            </div>
          )}

          {/* Table — Desktop */}
          {!isLoading && !isError && filteredChildren.length > 0 && (
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Child
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Registered Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Special Needs
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Guardian
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredChildren.map((child) => (
                    <tr
                      key={child.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              child.profile_image ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`
                            }
                            alt={child.full_name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`;
                            }}
                          />
                          <span className="font-medium text-sm text-gray-900">
                            {child.full_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {child.age} yrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {child.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {child.date_of_birth}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {child.start_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {child.special_needs || "None"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {child.vigilant_contact_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${getStatusColor(child.status)}`}
                        >
                          {child.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onViewChild(child)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => setEditingChild(child)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(child.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <UserMinus className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Cards — Mobile */}
          {!isLoading && !isError && filteredChildren.length > 0 && (
            <div className="lg:hidden p-4 space-y-4">
              {filteredChildren.map((child) => (
                <div
                  key={child.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={
                        child.profile_image ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`
                      }
                      alt={child.full_name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`;
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {child.full_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {child.age} yrs • {child.gender}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium ${getStatusColor(child.status)}`}
                    >
                      {child.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">DOB:</span>
                      <span className="ml-2 text-gray-900">
                        {child.date_of_birth}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Registered:</span>
                      <span className="ml-2 text-gray-900">
                        {child.start_date}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Special Needs:</span>
                      <span className="ml-2 text-gray-900">
                        {child.special_needs || "None"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Guardian:</span>
                      <span className="ml-2 text-gray-900">
                        {child.vigilant_contact_name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <button
                      onClick={() => onViewChild(child)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => setEditingChild(child)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(child.id)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <UserMinus className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditChildModal
        isOpen={editingChild !== null}
        onClose={() => setEditingChild(null)}
        child={editingChild}
      />
    </div>
  );
}
