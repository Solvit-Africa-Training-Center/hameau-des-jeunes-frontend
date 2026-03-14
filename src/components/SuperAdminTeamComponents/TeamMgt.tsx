import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetTeamQuery,
  useUpdateTeamMemberMutation,
  type TeamMember,
} from "@/store/api/teamApi";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Types

type FormMode = "create" | "edit";

interface FormState {
  full_name: string;
  position: string;
  linkedin_url: string;
  image: File | null;
}

const emptyForm: FormState = {
  full_name: "",
  position: "",
  linkedin_url: "",
  image: null,
};

// Component

export const TeamMgtContent = () => {
  const { data: teamList = [], isLoading: isFetching } = useGetTeamQuery();
  const [createMember, { isLoading: isCreating }] =
    useCreateTeamMemberMutation();
  const [updateMember, { isLoading: isUpdating }] =
    useUpdateTeamMemberMutation();
  const [deleteMember, { isLoading: isDeleting }] =
    useDeleteTeamMemberMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [previewImageModal, setPreviewImageModal] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const isBusy = isCreating || isUpdating;

  // Modal helpers

  const closePreviewImageModal = () => {
    setPreviewImageModal(false);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setImagePreview(null);
    setMode("create");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setForm({
      full_name: member.full_name,
      position: member.position,
      linkedin_url: member.linkedin_url,
      image: null,
    });
    setImagePreview(member.image ?? null);
    setMode("edit");
    setEditingId(member.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // Form handlers

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, image: file }));
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // Submit

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        if (!form.image) {
          toast.error("Please select a profile image.");
          return;
        }
        await createMember({
          full_name: form.full_name,
          position: form.position,
          linkedin_url: form.linkedin_url,
          image: form.image,
        }).unwrap();
        toast.success("Team member added successfully.");
      } else if (editingId) {
        await updateMember({
          id: editingId,
          full_name: form.full_name,
          position: form.position,
          linkedin_url: form.linkedin_url,
          ...(form.image ? { image: form.image } : {}),
        }).unwrap();
        toast.success("Team member updated successfully.");
      }
      closeModal();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Delete

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteMember(id).unwrap();
      toast.success("Team member removed.");
    } catch {
      toast.error("Failed to delete. Please try agian.");
    } finally {
      setDeletingId(null);
    }
  };

  // Render

  return (
    <>
      <section className="md:mx-8 mx-5 mt-8">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Team Members</CardTitle>
            <Button onClick={openCreate} className="flex items-center gap-2">
              <Plus size={16} />
              Add Member
            </Button>
          </div>
          <CardContent>
            {isFetching ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                Loading...
              </p>
            ) : teamList.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                No team members yet. Click <strong>Add Member</strong> to get
                started.
              </p>
            ) : (
              <div className="rounded-md border overflow-x-auto h-64 overflow-y-auto scroll-bar hide">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>LinkedIn</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamList.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.full_name}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                              N/A
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          {member.full_name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {member.position}
                        </TableCell>
                        <TableCell>
                          {member.linkedin_url ? (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline text-sm truncate max-w-[160px] block"
                            >
                              {member.linkedin_url}
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(member)}
                              className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              disabled={isDeleting && deletingId === member.id}
                              className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Modal */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <CardTitle className="text-lg">
                  {mode === "create" ? "Add Team Member" : "Edit Team Member"}
                </CardTitle>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="full_name">Full name</FieldLabel>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Enter full name"
                      value={form.full_name}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="position">Position</FieldLabel>
                    <Input
                      id="position"
                      name="position"
                      placeholder="Enter the employee's position"
                      value={form.position}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="linkedin_url">LinkedIn</FieldLabel>
                    <Input
                      id="linkedin_url"
                      name="linkedin_url"
                      type="text"
                      placeholder="Enter employee's LinkedIn profile URL"
                      value={form.linkedin_url}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="profile_image">
                      Profile image
                      {mode === "edit" && " (leave blank to keep current)"}
                    </FieldLabel>

                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => setPreviewImageModal(true)}
                        className="text-sm text-blue-600 hover:underline mb-2 inline-block"
                      >
                        Preview image
                      </button>
                    )}

                    <Input
                      id="profile_image"
                      name="profile_image"
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      onChange={handleFileChange}
                    />
                  </Field>

                  {/* Image Preview Popup */}
                  {previewImageModal && imagePreview && (
                    <div
                      className="fixed inset-0 z-[60] flex items-center justify-center"
                      onClick={closePreviewImageModal}
                    >
                      <div className="absolute inset-0 bg-black/60" />

                      <div
                        className="relative z-10 bg-white rounded-2xl p-4 shadow-2xl max-w-sm w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-700">
                            Image Preview
                          </span>
                          <button
                            onClick={closePreviewImageModal}
                            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-96 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </FieldGroup>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isBusy}>
                    {isBusy
                      ? mode === "create"
                        ? "Saving..."
                        : "Updating..."
                      : mode === "create"
                        ? "Save Member"
                        : "Update Member"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
