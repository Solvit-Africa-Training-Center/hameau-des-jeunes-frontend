import { useState, useEffect, useRef } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import type { Child } from "@/store/api/childrenApi";
import { useUpdateChildMutation } from "@/store/api/childrenApi";

interface EditChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
}

export default function EditChildModal({
  isOpen,
  onClose,
  child,
}: EditChildModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateChild, { isLoading }] = useUpdateChildMutation();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "MALE" as "MALE" | "FEMALE",
    start_date: "",
    special_needs: "",
    vigilant_contact_name: "",
    vigilant_contact_phone: "",
    story: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Pre-fill form when child changes
  useEffect(() => {
    if (child) {
      setForm({
        first_name: child.first_name,
        last_name: child.last_name,
        date_of_birth: child.date_of_birth,
        gender: child.gender,
        start_date: child.start_date,
        special_needs: child.special_needs || "",
        vigilant_contact_name: child.vigilant_contact_name || "",
        vigilant_contact_phone: child.vigilant_contact_phone || "",
        story: child.story || "",
      });
      setImageFile(null);
      setImagePreview(child.profile_image || null);
    }
  }, [child]);

  if (!isOpen || !child) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("date_of_birth", form.date_of_birth);
    formData.append("gender", form.gender);
    formData.append("start_date", form.start_date);
    formData.append("special_needs", form.special_needs);
    formData.append("vigilant_contact_name", form.vigilant_contact_name);
    formData.append("vigilant_contact_phone", form.vigilant_contact_phone);
    formData.append("story", form.story);
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }

    try {
      await updateChild({ id: child.id, data: formData }).unwrap();
      toast.success(`${form.first_name}'s profile updated successfully.`);
      onClose();
    } catch (err: any) {
      const apiError =
        err?.data && typeof err.data === "object"
          ? Object.values(err.data)[0]
          : null;
      const message =
        typeof apiError === "string" ? apiError : "Failed to update child.";
      toast.error(message);
    }
  };

  const handleClose = () => {
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Child Profile
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Update information for{" "}
              <span className="font-medium text-gray-700">
                {child.full_name}
              </span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 px-6 py-5 space-y-5"
        >
          {/* Profile Image */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={
                  imagePreview ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`
                }
                alt={child.full_name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center shadow hover:bg-emerald-800 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Profile Photo</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Click the icon to upload a new photo
              </p>
              {imageFile && (
                <p className="text-xs text-emerald-700 mt-1 font-medium">
                  {imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          {/* Start Date + Special Needs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Needs
              </label>
              <input
                name="special_needs"
                value={form.special_needs}
                onChange={handleChange}
                placeholder="e.g. Hearing impairment"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guardian Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Name
              </label>
              <input
                name="vigilant_contact_name"
                value={form.vigilant_contact_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Phone
              </label>
              <input
                name="vigilant_contact_phone"
                value={form.vigilant_contact_phone}
                onChange={handleChange}
                placeholder="+250..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Story */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background / Story
            </label>
            <textarea
              name="story"
              value={form.story}
              onChange={handleChange}
              rows={3}
              placeholder="Brief background information about the child..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-900 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
