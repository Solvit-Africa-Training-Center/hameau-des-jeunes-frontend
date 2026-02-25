import { useState } from "react";
import { X, Pencil, Trash2, Save, XCircle } from "lucide-react";
import { useGetIfasheChildrenQuery, useUpdateIfasheChildMutation, useDeleteIfasheChildMutation } from "@/store/api/ifasheChildrenApi";
import type { Family } from "./IfasheTugufasheFamilyView";
import { toast } from "react-toastify";

interface ManageFamilyChildrenModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: Family | null;
}

export default function ManageFamilyChildrenModal({ isOpen, onClose, family }: ManageFamilyChildrenModalProps) {
  const { data: fetchedChildren = [], isLoading } = useGetIfasheChildrenQuery(undefined, {
    skip: !isOpen || !family
  });
  
  const [updateChild] = useUpdateIfasheChildMutation();
  const [deleteChild] = useDeleteIfasheChildMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", school: "", educationLevel: "" });

  if (!isOpen || !family) return null;

  // Filter children that belong to this family. 
  // We match against the family ID or the family Name.
  const familyChildren = fetchedChildren.filter((c: any) => {
    // Determine the string representation of the linked family on the child object
    const famObj = typeof c.family === 'object' && c.family !== null ? c.family : c;
    const childFamilyName = String(famObj.family_name || famObj.name || c.linkedFamily || c.linked_family || c.family || "Unknown").toLowerCase();
    
    // Check if the backend id matches or the name matches
    return c.family === family.id || childFamilyName === family.fullName.toLowerCase() || childFamilyName.includes(family.parentName.toLowerCase());
  }).map((c: any) => ({
    id: String(c.id),
    childId: String(c.childId || c.child_id || c.id || "N/A").substring(0, 8),
    name: c.first_name ? `${c.first_name} ${c.last_name || ""}`.trim() : (c.name || c.fullName || c.full_name || "Unknown"),
    school: String(c.school_name || c.schoolName || c.school || "Unknown"),
    educationLevel: String(c.school_level || c.educationLevel || c.education_level || "Unknown"),
    status: String(c.support_status || c.status || "ACTIVE")
  }));

  const startEditing = (child: any) => {
    setEditingId(child.id);
    setEditForm({
      name: child.name,
      school: child.school,
      educationLevel: child.educationLevel
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: "", school: "", educationLevel: "" });
  };

  const handleSave = async (childId: string) => {
    try {
      // Create partial payload for what we're updating
      const names = editForm.name.split(" ");
      const payload = {
        first_name: names[0] || "Unknown",
        last_name: names.slice(1).join(" ") || "Unknown",
        school_name: editForm.school,
        school_level: editForm.educationLevel
      };

      await updateChild({ id: childId, data: payload }).unwrap();
      toast.success("Child updated successfully");
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update child", error);
      toast.error("Failed to update child");
    }
  };

  const handleDelete = async (childId: string) => {
    if (window.confirm("Are you sure you want to remove this child from the program?")) {
      try {
        await deleteChild(childId).unwrap();
        toast.success("Child removed successfully");
      } catch (error) {
        console.error("Failed to delete child", error);
        toast.error("Failed to delete child");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Manage Children</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Viewing children connected to family: {family.fullName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p className="text-sm text-gray-500">Loading children data...</p>
            </div>
          ) : familyChildren.length === 0 ? (
            <div className="flex justify-center py-8 text-center flex-col items-center">
              <p className="text-sm text-gray-500">No children found linked to this family.</p>
              <p className="text-xs text-gray-400 mt-1">Make sure children are registered and explicitly linked to {family.fullName}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {familyChildren.map((child) => (
                <div key={child.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm transition-all">
                  {editingId === child.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                        <input 
                          value={editForm.name} 
                          onChange={e => setEditForm({...editForm, name: e.target.value})}
                          className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">School</label>
                        <input 
                          value={editForm.school} 
                          onChange={e => setEditForm({...editForm, school: e.target.value})}
                          className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Level</label>
                        <input 
                          value={editForm.educationLevel} 
                          onChange={e => setEditForm({...editForm, educationLevel: e.target.value})}
                          className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t mt-2 flex-wrap">
                        <button onClick={() => handleSave(child.id)} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700 transition">
                          <Save className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={cancelEditing} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition">
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-emerald-600 font-medium mb-0.5">{child.childId}</p>
                          <h4 className="font-semibold text-gray-900 text-sm">{child.name}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                          child.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {child.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1 mb-4">
                        <p><span className="font-medium text-gray-500">School:</span> {child.school}</p>
                        <p><span className="font-medium text-gray-500">Level:</span> {child.educationLevel}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t flex-wrap">
                        <button onClick={() => startEditing(child)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDelete(child.id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg text-xs font-medium transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
