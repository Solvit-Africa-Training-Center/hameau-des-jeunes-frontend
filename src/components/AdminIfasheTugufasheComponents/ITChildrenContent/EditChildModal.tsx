import { X, Save, Plus, School } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateIfasheChildMutation } from "@/store/api/ifasheChildrenApi";
import type { Child } from "./IfasheTugufasheChildrenView";
import { toast } from "react-toastify";
import { useGetIfasheFamiliesQuery } from "@/store/api/ifasheFamiliesApi";
import { useGetInstitutionsQuery, useCreateInstitutionMutation } from "@/store/api/educationApi";

interface EditChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
}

export default function EditChildModal({ isOpen, onClose, child }: EditChildModalProps) {
  const { data: fetchedFamilies = [] } = useGetIfasheFamiliesQuery();
  const { data: institutions = [], refetch: refetchInstitutions } = useGetInstitutionsQuery();
  const [createInstitution] = useCreateInstitutionMutation();

  const [formData, setFormData] = useState({
    linkedFamily: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    schoolName: "",
    educationLevel: "",
    supportStatus: "Active",
    healthConditions: "",
  });
  const [showNewSchoolForm, setShowNewSchoolForm] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: "", address: "", phone: "", email: "" });
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);

  const [updateChild, { isLoading }] = useUpdateIfasheChildMutation();

  const handleAddNewSchool = async () => {
    if (!newSchool.name.trim()) { toast.error("School name is required."); return; }
    setIsCreatingSchool(true);
    try {
      await createInstitution({
        name: newSchool.name.trim(),
        address: newSchool.address.trim(),
        phone: newSchool.phone.trim(),
        email: newSchool.email.trim(),
        programs: [],
      }).unwrap();
      toast.success(`"${newSchool.name}" added to registry!`);
      setFormData((prev) => ({ ...prev, schoolName: newSchool.name.trim() }));
      setNewSchool({ name: "", address: "", phone: "", email: "" });
      setShowNewSchoolForm(false);
      refetchInstitutions();
    } catch (err: any) {
      if (err?.status === 403) {
        toast.info("School registry access pending — saving school name directly.");
        setFormData((prev) => ({ ...prev, schoolName: newSchool.name.trim() }));
        setShowNewSchoolForm(false);
      } else {
        toast.error("Failed to create school.");
      }
    } finally {
      setIsCreatingSchool(false);
    }
  };

  useEffect(() => {
    if (child) {
      setFormData({
        linkedFamily: child.linkedFamily && child.linkedFamily !== "Unknown" ? child.linkedFamily : "",
        fullName: child.fullName && child.fullName !== "Unknown" ? child.fullName : "",
        dateOfBirth: child.dateOfBirth || "",
        gender: child.gender ? child.gender.charAt(0).toUpperCase() + child.gender.slice(1).toLowerCase() : "",
        schoolName: child.schoolName && child.schoolName !== "Unknown" ? child.schoolName : "",
        educationLevel: child.educationLevel && child.educationLevel !== "Unknown" ? child.educationLevel : "",
        supportStatus: child.status || "Active",
        healthConditions: child.healthConditions || "",
      });
    }
  }, [child]);

  if (!isOpen || !child) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Try to find the actual family ID from the selected linkedFamily string
      const matchedFamily = fetchedFamilies.find(
        (f: any) => 
          (f.parents?.[0]?.first_name && f.parents?.[0]?.first_name.includes(formData.linkedFamily.split(" ")[0])) ||
          f.family_name === formData.linkedFamily ||
          f.id === formData.linkedFamily ||
          f.parents?.[0]?.id === formData.linkedFamily
      );

      // Map the "Graduated" status to "EXITED" for the backend
      let parsedStatus = formData.supportStatus.toUpperCase();
      if (parsedStatus === "GRADUATED") parsedStatus = "EXITED";
      if (parsedStatus === "TRANSFERRED") parsedStatus = "EXITED";

      const names = formData.fullName.trim().split(" ");
      const first_name = names[0] || "Unknown";
      const last_name = names.slice(1).join(" ") || "Unknown";

      const payload = {
        first_name: first_name,
        last_name: last_name,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.gender ? formData.gender.toUpperCase() : "MALE",
        school_name: formData.schoolName,
        school_level: formData.educationLevel,
        support_status: parsedStatus,
        health_conditions: formData.healthConditions,
        ...(matchedFamily && { family_id: matchedFamily.id })
      };

      await updateChild({ id: child.id, data: payload }).unwrap();
      toast.success("Child updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update child", error);
      toast.error("Failed to update child");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Child Profile</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Updating information for {child.childId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">

            {/* Linked Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Linked Family
              </label>
              <select
                value={formData.linkedFamily}
                onChange={(e) => setFormData({ ...formData, linkedFamily: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">Select Family</option>
                {fetchedFamilies.map((f: any) => {
                    const parentName = f.parents?.[0]?.first_name 
                    ? `${f.parents[0].first_name} ${f.parents[0].last_name || ""}`.trim() 
                    : (f.family_name || "Unknown Family");
                    return (
                        <option key={f.id} value={parentName}>
                            {parentName}
                        </option>
                    )
                })}
              </select>
            </div>

            {/* Full Name & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Gender & School Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>

                <select
                  value={showNewSchoolForm ? "__new__" : formData.schoolName}
                  onChange={(e) => {
                    if (e.target.value === "__new__") {
                      setShowNewSchoolForm(true);
                      setFormData({ ...formData, schoolName: "" });
                    } else {
                      setShowNewSchoolForm(false);
                      setFormData({ ...formData, schoolName: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="">— Select School —</option>
                  {institutions.map((inst) => (
                    <option key={inst.id} value={inst.name}>
                      {inst.name}{inst.address ? ` — ${inst.address}` : ""}
                    </option>
                  ))}
                  <option value="__new__">+ Add New School...</option>
                </select>

                {showNewSchoolForm && (
                  <div className="mt-3 p-4 border border-emerald-200 rounded-lg bg-emerald-50 space-y-3">
                    <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5" /> New School Details
                    </p>
                    <input type="text" placeholder="School name *" value={newSchool.name}
                      onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    <input type="text" placeholder="Address (optional)" value={newSchool.address}
                      onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Phone (optional)" value={newSchool.phone}
                        onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                      <input type="email" placeholder="Email (optional)" value={newSchool.email}
                        onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    </div>
                    <div className="flex gap-2">
                      <button type="button"
                        onClick={() => { setShowNewSchoolForm(false); setNewSchool({ name: "", address: "", phone: "", email: "" }); }}
                        className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
                      <button type="button" onClick={handleAddNewSchool}
                        disabled={isCreatingSchool || !newSchool.name.trim()}
                        className="px-3 py-1.5 text-xs bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center gap-1">
                        <Plus className="w-3 h-3" />{isCreatingSchool ? "Adding..." : "Add & Select"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Education Level & Program Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="">Select Level</option>
                  <option value="Nursery">Nursery</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary O-Level">Secondary (O-Level)</option>
                  <option value="Secondary A-Level">Secondary (A-Level)</option>
                  <option value="TVET">TVET / Vocational</option>
                  <option value="University">University</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Support Status
                </label>
                <select
                  value={formData.supportStatus}
                  onChange={(e) => setFormData({ ...formData, supportStatus: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Graduated">Graduated / Exited</option>
                  <option value="Transferred">Transferred</option>
                </select>
              </div>
            </div>

            {/* Health Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Conditions / Notes
              </label>
              <textarea
                value={formData.healthConditions}
                onChange={(e) => setFormData({ ...formData, healthConditions: e.target.value })}
                rows={3}
                placeholder="Any chronic illness, disabilities, or special needs..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 sticky bottom-0 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
