import { X, Save } from "lucide-react";
import { useState } from "react";
import { useCreateIfasheFamilyMutation } from "@/store/api/ifasheFamiliesApi";

interface RegisterFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterFamilyModal({ isOpen, onClose }: RegisterFamilyModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    nationalId: "",
    phone: "",
    educationLevel: "",
    maritalStatus: "",
    address: "",
    province: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
    previousEmployment: "",
    monthlyIncome: "",
    housingCondition: "",
    vulnerabilityLevel: "",
    assessmentNotes: "",
  });

  const [createFamily, { isLoading }] = useCreateIfasheFamilyMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mapHousing = (val: string) => {
        if (val === "Own House") return "OWNED";
        if (val === "Rented Apartment") return "RENTED";
        return "TEMPORARY";
      };

      const payload = {
        family_name: formData.fullName || "Family",
        address: formData.address || "N/A",
        province: formData.province || "N/A",
        district: formData.district || "N/A",
        sector: formData.sector || "N/A",
        cell: formData.cell || "N/A",
        village: formData.village || "N/A",
        vulnerability_level: formData.vulnerabilityLevel ? formData.vulnerabilityLevel.toUpperCase() : "LOW",
        housing_condition: mapHousing(formData.housingCondition),
        social_worker_assessment: formData.assessmentNotes,
        parents: [
          {
            first_name: formData.fullName.split(' ')[0] || "Unknown",
            last_name: formData.fullName.split(' ').slice(1).join(' ') || "Unknown",
            gender: formData.gender ? formData.gender.toUpperCase() : "MALE",
            phone: formData.phone || "0000000000",
            national_id: formData.nationalId || null,
            date_of_birth: formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : null,
            education_level: formData.educationLevel || "None",
            marital_status: formData.maritalStatus ? formData.maritalStatus.toUpperCase() : "SINGLE",
            previous_employment: formData.previousEmployment || "",
            monthly_income: formData.monthlyIncome ? parseInt(formData.monthlyIncome) : 0,
          }
        ]
      };
      await createFamily(payload).unwrap();
      setFormData({
        fullName: "",
        gender: "",
        dob: "",
        nationalId: "",
        phone: "",
        educationLevel: "",
        maritalStatus: "",
        address: "",
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
        previousEmployment: "",
        monthlyIncome: "",
        housingCondition: "",
        vulnerabilityLevel: "",
        assessmentNotes: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to register family", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Register New Family</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Enter family details to register them in the program
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-6">

            {/* Parent / Guardian Information */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Parent / Guardian Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender*
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    placeholder="DD/MM/YYY"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National ID Number*
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    placeholder="ID"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number*
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+250..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Educational Level*
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Level</option>
                    <option value="No Education">No Education</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status*
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province*
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District*
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector*
                  </label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cell*
                  </label>
                  <input
                    type="text"
                    value={formData.cell}
                    onChange={(e) => setFormData({ ...formData, cell: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village*
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Social-Economic Data */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Social-Economic Data
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Employment
                  </label>
                  <input
                    type="text"
                    value={formData.previousEmployment}
                    onChange={(e) =>
                      setFormData({ ...formData, previousEmployment: e.target.value })
                    }
                    placeholder="e.g Farmer, Teacher, Unemployed"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income Before Joining (RWF)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Housing Condition
                  </label>
                  <select
                    value={formData.housingCondition}
                    onChange={(e) =>
                      setFormData({ ...formData, housingCondition: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Condition</option>
                    <option value="Own House">Own House</option>
                    <option value="Rented Apartment">Rented Apartment</option>
                    <option value="Shared Housing">Shared Housing</option>
                    <option value="Homeless">Homeless</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Social Worker Assessment */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Social Worker Assessment
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vulnerability Level *
                  </label>
                  <select
                    value={formData.vulnerabilityLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, vulnerabilityLevel: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Notes
                  </label>
                  <textarea
                    value={formData.assessmentNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, assessmentNotes: e.target.value })
                    }
                    rows={4}
                    placeholder="Notes about family situation, special needs etc..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 border-t shrink-0 flex gap-3 bg-gray-50 sticky bottom-0">
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
              {isLoading ? "Saving..." : "Save Family"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}