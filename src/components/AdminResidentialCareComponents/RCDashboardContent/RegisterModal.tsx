import { useState } from "react";
import { X, Plus } from "lucide-react";
import placeholderImg from "@/assets/user.png";
import { useRegisterChildMutation } from "@/store/api/childrenApi";
import { toast } from "react-toastify";
import { useGetCaretakersQuery } from "@/store/api/caretakersApi";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "MALE" as "MALE" | "FEMALE",
  start_date: "",
  special_needs: "",
  vigilant_contact_name: "",
  vigilant_contact_phone: "",
  story: "",
};

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [newChildImage, setNewChildImage] = useState<string>(placeholderImg);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [age, setAge] = useState("");

  const [registerChild, { isLoading }] = useRegisterChildMutation();
  const { data: caretakers = [] } = useGetCaretakersQuery();

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewChildImage(reader.result as string); // preview only
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "date_of_birth" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        years--;
      }
      setAge(years >= 0 ? `${years} years` : "");
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Function to fill guardian name and autofill their phone number
  const handleGuardianSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = caretakers.find((c) => c.id === selectedId);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        vigilant_contact_name: selected.full_name,
        vigilant_contact_phone: selected.phone,
      }));
    } else {
      // Reset if placeholder selected
      setForm((prev) => ({
        ...prev,
        vigilant_contact_name: "",
        vigilant_contact_phone: "",
      }));
    }
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
      await registerChild(formData).unwrap();
      toast.success("Child registered successfully!");
      setForm(EMPTY_FORM);
      setNewChildImage(placeholderImg);
      setImageFile(null);
      setAge("");
      onClose();
    } catch (err: any) {
      console.error("Failed to register child:", err);
      toast.error(err?.data?.message || "Failed to register child");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Register New Child</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={newChildImage}
                alt="Child avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-800 transition-colors">
                <Plus className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">Upload child photo</p>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* Date of Birth & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (Calculated)
              </label>
              <input
                type="text"
                disabled
                value={age}
                placeholder="Auto calculated"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Registered
            </label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Special Needs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Needs
            </label>
            <input
              type="text"
              name="special_needs"
              value={form.special_needs}
              onChange={handleChange}
              placeholder="Specify if any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Guardian - dropdown + auto-filled phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guardian Name
              </label>
              <div className="relative">
                <select
                  onChange={handleGuardianSelect}
                  defaultValue=""
                  required
                  name="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white text-gray-700"
                  id=""
                >
                  <option value="" disabled>
                    Select caretaker
                  </option>
                  {caretakers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guardian Phone
              </label>
              <input
                type="tel"
                name="vigilant_contact_phone"
                value={form.vigilant_contact_phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Story */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story
            </label>
            <textarea
              name="story"
              rows={4}
              value={form.story}
              onChange={handleChange}
              placeholder="Write the child's story..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-900 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
