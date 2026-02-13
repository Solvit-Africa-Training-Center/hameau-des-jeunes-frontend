import { useState, useEffect } from "react";
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
import type { Admin } from "./UsersMgtTable";

interface EditAdministratorModalProps {
  isOpen: boolean;
  admin: Admin | null;
  onClose: () => void;
  onSave: (admin: Admin) => void;
}

export const EditAdministratorModal = ({
  isOpen,
  admin,
  onClose,
  onSave,
}: EditAdministratorModalProps) => {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    role: admin?.role || "",
    systemRole: "Program Administrator",
  });

  // Update form when admin changes
  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        systemRole: "Program Administrator",
      });
    }
  }, [admin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (admin) {
      onSave({
        ...admin,
        name: formData.name,
        email: formData.email,
        role: formData.role as Admin["role"],
      });
    }
    onClose();
  };

  if (!isOpen || !admin) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Administrator
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F3D2E] text-white hover:bg-[#0F3D2E]/90 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-2 shadow-xl">
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input
                id="fullName"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Jean-Paul Mugisha"
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
                placeholder="jeanpaul@saintkizito.org"
                className="mt-2"
                required
              />
            </Field>

            {/* Assigned Program */}
            <Field>
              <FieldLabel htmlFor="assignedProgram">
                Assigned Program
              </FieldLabel>
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
                  <SelectItem value="Residential Care">
                    Residential Care
                  </SelectItem>
                  <SelectItem value="Ifashe Tugufashe">
                    Ifashe Tugufashe
                  </SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Health Post">Health Post</SelectItem>
                  <SelectItem value="Residential Care + Health Post">
                    Residential Care + Health Post
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* System Role */}
            <Field>
              <FieldLabel htmlFor="systemRole">System Role</FieldLabel>
              <Select
                value={formData.systemRole}
                onValueChange={(value) =>
                  setFormData({ ...formData, systemRole: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Program Administrator">
                    Program Administrator
                  </SelectItem>
                  <SelectItem value="Super Administrator">
                    Super Administrator
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0F3D2E] hover:bg-[#0F3D2E]/90"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
