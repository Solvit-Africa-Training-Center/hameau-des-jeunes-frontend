import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
  type Testimonial,
} from "@/store/api/testimonialsApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Pencil, Trash2, X, Plus } from "lucide-react";

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

// ─── Modal ────────────────────────────────────────────────────────────────────
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/40" onClick={onClose} />
    <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ─── Shared Form ──────────────────────────────────────────────────────────────
interface TestimonialFormProps {
  initialName?: string;
  initialDescription?: string;
  isLoading: boolean;
  submitLabel: string;
  imageRequired?: boolean;
  onSubmit: (data: {
    name: string;
    description: string;
    image: File | null;
  }) => void;
}

const TestimonialForm = ({
  initialName = "",
  initialDescription = "",
  isLoading,
  submitLabel,
  imageRequired = true,
  onSubmit,
}: TestimonialFormProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageError(null);
    if (file && file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError(
        `Max ${MAX_IMAGE_SIZE_MB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
      );
      e.target.value = "";
      return;
    }
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageRequired && !image) return;
    if (imageError) return;
    onSubmit({ name, description, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form_name">Full name</FieldLabel>
          <Input
            id="form_name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="form_description">Message</FieldLabel>
          <Textarea
            id="form_description"
            placeholder="Enter the testimonial message"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="form_image">
            Image{" "}
            {!imageRequired && (
              <span className="text-gray-400 text-xs">
                (leave empty to keep current)
              </span>
            )}
          </FieldLabel>
          <Input
            id="form_image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={imageRequired}
          />
          {imageError ? (
            <p className="text-xs text-red-500 mt-1">{imageError}</p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">
              Max {MAX_IMAGE_SIZE_MB}MB
            </p>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isLoading || (imageRequired && !image) || !!imageError}
          className="w-full mt-2"
        >
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const TestimonialsMgtContent = () => {
  const { data: testimonials, isLoading: isFetching } =
    useGetTestimonialsQuery();
  const [createTestimonial, { isLoading: isCreating }] =
    useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] =
    useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async ({
    name,
    description,
    image,
  }: {
    name: string;
    description: string;
    image: File | null;
  }) => {
    if (!image) return;
    try {
      await createTestimonial({ name, description, image }).unwrap();
      toast.success("Testimonial added successfully!");
      setShowAddModal(false);
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to add testimonial.");
    }
  };

  const handleUpdate = async ({
    name,
    description,
    image,
  }: {
    name: string;
    description: string;
    image: File | null;
  }) => {
    if (!editTarget) return;
    try {
      await updateTestimonial({
        id: editTarget.id,
        name,
        description,
        ...(image ? { image } : {}),
      }).unwrap();
      toast.success("Testimonial updated successfully!");
      setEditTarget(null);
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to update testimonial.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteTestimonial(deleteTarget.id).unwrap();
      toast.success("Testimonial deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete testimonial.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="md:mx-8 mx-5 mt-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Shadcn Table */}
      <Card>
        <CardContent className="p-0">
          {isFetching ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading testimonials...
            </div>
          ) : !testimonials?.length ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No testimonials yet. Add one to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Date Added
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      />
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {t.name}
                    </TableCell>
                    <TableCell className="text-gray-600 max-w-xs truncate">
                      {t.description}
                    </TableCell>
                    <TableCell className="text-gray-400 whitespace-nowrap">
                      {new Date(t.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditTarget(t)}
                          className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(t)}
                          className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <Modal title="Add Testimonial" onClose={() => setShowAddModal(false)}>
          <TestimonialForm
            isLoading={isCreating}
            submitLabel="Add Testimonial"
            imageRequired={true}
            onSubmit={handleCreate}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <Modal title="Edit Testimonial" onClose={() => setEditTarget(null)}>
          <TestimonialForm
            initialName={editTarget.name}
            initialDescription={editTarget.description}
            isLoading={isUpdating}
            submitLabel="Save Changes"
            imageRequired={false}
            onSubmit={handleUpdate}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal title="Delete Testimonial" onClose={() => setDeleteTarget(null)}>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete the testimonial from{" "}
              <span className="font-semibold text-gray-900">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
