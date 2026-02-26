import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignupMutation } from "@/store/api/authApi";

const roles = [
  {
    value: "SYSTEM_ADMIN",
    label: "System Admin",
    program: "System Administration",
  },
  {
    value: "RESIDENTIAL_MANAGER",
    label: "Residential Manager",
    program: "Residential Care",
  },
  {
    value: "INTERNSHIPS_MANAGER",
    label: "Internships Manager",
    program: "Internship",
  },
  {
    value: "IFASHE_MANAGER",
    label: "Ifashe Tugufashe Manager",
    program: "Ifashe Tugufashe",
  },
];

interface AddAdministratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddAdministratorModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddAdministratorModalProps) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "System Admin",
  });

  const [signup, { isLoading, error }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role,
      }).unwrap();

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        role: "System Admin",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      console.error("Failed to create administrator", err);
    }
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      role: "System Admin",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Administrator
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F3D2E] text-white hover:bg-[#0F3D2E]/90 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-1 shadow-xl">
            {/* First Name */}
            <Field>
              <FieldLabel htmlFor="firstName" className="text-sm">
                First Name
              </FieldLabel>
              <Input
                id="firstName"
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                placeholder="Jean"
                className="mt-2"
                required
              />
            </Field>

            {/* Last Name */}
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                placeholder="Cyusa"
                className="mt-2"
                required
              />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="m@example.com"
                className="mt-2"
                required
              />
            </Field>

            {/* Phone Number */}
            <Field>
              <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
              <Input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                placeholder="+250 784 670 384"
                className="mt-2"
                required
              />
            </Field>

            {/* Assigned Role */}
            <Field>
              <FieldLabel htmlFor="assignedProgram">Role</FieldLabel>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500">
                {(error as any)?.data?.message ||
                  "Failed to create administrator"}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#0F3D2E] hover:bg-[#0F3D2E]/90"
              >
                {isLoading ? "Creating..." : "Create Administrator"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
