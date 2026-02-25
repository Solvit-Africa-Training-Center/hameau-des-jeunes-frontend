import { X, Shirt, CalendarDays, Ruler, Hash, FileText, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateIfasheDressingMutation } from "@/store/api/ifasheDressingApi";
import { toast } from "react-toastify";
import { parseApiError } from "@/utils/apiErrorParser";

interface Distribution {
  id: string;
  childName: string;
  childId: string;
  itemType: string;
  size: string;
  quantity: number;
  distributionDate: string;
  notes: string;
}

interface EditClothesDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  distribution: Distribution | null;
}

const ITEM_TYPES = [
  "Shirt", "Pants", "Shoes", "School Uniform", "Jacket", "Dress",
  "Socks", "Underwear", "Sweater", "Skirt", "Shorts", "School Bag", "Other"
];

export default function EditClothesDistributionModal({
  isOpen,
  onClose,
  distribution,
}: EditClothesDistributionModalProps) {
  const [formData, setFormData] = useState({
    item_type: "",
    size: "",
    quantity: "",
    distribution_date: "",
    notes: "",
  });

  const [updateDressing, { isLoading }] = useUpdateIfasheDressingMutation();

  // Sync form whenever distribution prop changes (when a different row is clicked)
  useEffect(() => {
    if (distribution) {
      setFormData({
        item_type: distribution.itemType === "—" ? "" : distribution.itemType,
        size: distribution.size === "—" ? "" : distribution.size,
        quantity: distribution.quantity?.toString() || "",
        distribution_date: distribution.distributionDate === "—" ? "" : distribution.distributionDate,
        notes: distribution.notes || "",
      });
    }
  }, [distribution]);

  if (!isOpen || !distribution) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // PUT requires all mandatory fields: child + distribution_date
      const payload: Record<string, any> = {
        child: distribution.childId,
        distribution_date: formData.distribution_date,
        item_type: formData.item_type || "",
        size: formData.size || "",
        quantity: formData.quantity ? parseInt(formData.quantity) : 1,
        notes: formData.notes || "",
      };
      await updateDressing({ id: distribution.id, data: payload }).unwrap();
      toast.success("Distribution updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(parseApiError(error, "Failed to update distribution."));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0 bg-emerald-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-800 rounded-xl flex items-center justify-center">
              <Shirt className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Edit Distribution</h2>
              <p className="text-emerald-200 text-xs mt-0.5">{distribution.childName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">

            {/* Distribution Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-emerald-600" />
                  Distribution Date *
                </span>
              </label>
              <input
                type="date"
                value={formData.distribution_date}
                onChange={(e) => setFormData({ ...formData, distribution_date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            {/* Item Type & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Shirt className="w-4 h-4 text-emerald-600" />
                    Item Type
                  </span>
                </label>
                <select
                  value={formData.item_type}
                  onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="">— Select Item —</option>
                  {ITEM_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-emerald-600" />
                    Size
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g. S, M, L, 36..."
                  maxLength={20}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-emerald-600" />
                  Quantity
                </span>
              </label>
              <input
                type="number"
                min={1}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Notes
                </span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Additional notes..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 sticky bottom-0 shrink-0 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
