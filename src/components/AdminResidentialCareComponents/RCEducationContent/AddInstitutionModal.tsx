import { useCreateInstitutionMutation } from "@/store/api/educationApi";
import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: AddInstitutionFormData) => void;
}

export interface AddInstitutionFormData {
  name: string;
  email: string;
  phone: string;
  programs: string[];
  address: string;
}

const SUGGESTED_PROGRAMS = [
  "MCB",
  "PCB",
  "MEG",
  "Networking",
  "Software Development",
  "Accounting",
];

export default function AddInstitutionModal({
  isOpen,
  onClose,
}: AddInstitutionModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [programs, setPrograms] = useState<string[]>([...SUGGESTED_PROGRAMS]);
  const [programInput, setProgramInput] = useState("");

  const [createInstitution, { isLoading }] = useCreateInstitutionMutation();

  if (!isOpen) return null;

  const addProgram = () => {
    const trimmed = programInput.trim();
    if (trimmed && !programs.includes(trimmed)) {
      setPrograms((prev) => [...prev, trimmed]);
    }
    setProgramInput("");
  };

  const removeProgram = (program: string) => {
    setPrograms((prev) => prev.filter((p) => p !== program));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addProgram();
    }
  };

  const handleSave = async () => {
    if (!name || !email || !phone || !address) {
      toast.error("Please fill all required fiels.");
    }

    try {
      await createInstitution({
        name,
        email,
        phone,
        address,
        programs: programs.map((p) => ({
          program_name: p,
        })),
      }).unwrap();

      toast.success("Institution registered successfully!");

      handleClose();
    } catch (err: any) {
      console.error("Institution creation failed:", err);
      toast.error(
        err?.data?.detail ||
          "Failed to register institution. Please try again.",
      );
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPrograms([...SUGGESTED_PROGRAMS]);
    setProgramInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            New Institution
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 space-y-5">
          {/* Institution Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-800">
              Institution Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Samuel Kwizera"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g example@gmail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-800">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+250"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Programs
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={programInput}
                onChange={(e) => setProgramInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add program"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              <button
                onClick={addProgram}
                className="flex items-center gap-1.5 px-5 py-3 bg-emerald-900 text-white text-sm font-medium rounded-xl hover:bg-emerald-800 transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Program tags */}
            {programs.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {programs.map((program) => (
                  <button
                    key={program}
                    onClick={() => removeProgram(program)}
                    className="px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-sm rounded-full transition-colors group"
                  >
                    {program}
                    <span className="ml-1.5 text-gray-400 group-hover:text-red-400">
                      ×
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-800">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-6 py-3.5 border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3.5 bg-emerald-900 text-white rounded-2xl text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Institution"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
