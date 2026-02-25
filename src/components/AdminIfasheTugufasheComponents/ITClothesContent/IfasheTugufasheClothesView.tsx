import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { useGetIfasheDressingsQuery, useDeleteIfasheDressingMutation } from "@/store/api/ifasheDressingApi";

export interface ClothesDistribution {
  id: string;
  childName: string;
  itemsProvided: string;
  quantity: number;
  distributionDate: string;
  // Full data for the form
  selectChild: string;
}

interface IfasheTugufasheClothesViewProps {
  onAddDistribution: () => void;
}

export default function IfasheTugufasheClothesView({
  onAddDistribution,
}: IfasheTugufasheClothesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: fetchedDistributions = [], isLoading, isError } = useGetIfasheDressingsQuery();
  const [deleteDistribution] = useDeleteIfasheDressingMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this distribution?")) {
      try {
        await deleteDistribution(id).unwrap();
      } catch (error) {
        console.error("Failed to delete distribution", error);
      }
    }
  };

  const distributions: ClothesDistribution[] = fetchedDistributions.map((d: any) => ({
    id: d.id || Math.random().toString(),
    childName: d.childName || d.child_name || d.child || "Unknown",
    itemsProvided: d.itemsProvided || d.items_provided || "None",
    quantity: d.quantity || 0,
    distributionDate: d.distributionDate || d.distribution_date || "Unknown",
    selectChild: d.selectChild || d.select_child || d.childName || d.child_name || "",
  }));

  const filteredDistributions = distributions.filter(
    (distribution) =>
      distribution.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distribution.itemsProvided.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Clothes Support</h1>
            <p className="text-sm text-gray-600">
              Track clothing and essential items distribution
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

        {/* Search Bar */}
        <div className="mb-4 shrink-0">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by child name or school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-gray-500">Loading distributions...</p>
            </div>
          )}
          {isError && (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-red-500">Error loading distributions. Please try again.</p>
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
                    Child name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Provided
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distribution Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                  {filteredDistributions.map((distribution) => (
                    <tr key={distribution.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {distribution.childName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {distribution.itemsProvided}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {distribution.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {distribution.distributionDate}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(distribution.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
            {filteredDistributions.map((distribution) => (
              <div
                key={distribution.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {distribution.childName}
                    </h3>
                    <p className="text-xs text-gray-500">{distribution.itemsProvided}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(distribution.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <span className="ml-1 text-gray-900 font-medium">
                      {distribution.quantity}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Distribution Date:</span>
                    <span className="ml-1 text-gray-900">{distribution.distributionDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

              {/* No Results */}
              {filteredDistributions.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">No distributions found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}