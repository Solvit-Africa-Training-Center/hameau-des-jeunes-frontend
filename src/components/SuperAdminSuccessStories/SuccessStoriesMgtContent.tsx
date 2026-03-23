import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

import { useGetAllSuccessStoriesQuery, useCreateSuccessStoryMutation, useUpdateSuccessStoryMutation, useDeleteSuccessStoryMutation, type CreateSuccessStoryPayload, type SuccessStory, type UpdateSuccessStoryPayload } from "@/store/api/successStoryApi";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Pencil, Trash2, X, Plus } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface SuccessStoryFormProps {
  initialTitle?: string;
  initialDescription?: string;
  isLoading: boolean;
  submitLabel: string;
  imageRequired?: boolean;
  onSubmit: (data: {
    title: string;
    description: string;
    image: File | null;
  }) => void;
}

const SuccessStoryForm = ({
  initialTitle = "",
  initialDescription = "",
  isLoading,
  submitLabel,
  imageRequired = true,
  onSubmit,
}: SuccessStoryFormProps) => {
  const [title, setTitle] = useState(initialTitle);
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
    onSubmit({ title, description, image });
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

export const SuccessStoriesMgtContent = () => {

    const { data: successStories, isLoading: isFetching, refetch } = useGetAllSuccessStoriesQuery();
    const [createSuccessStory, { isLoading: isCreating }] = useCreateSuccessStoryMutation();
    const [updateSuccessStory, { isLoading: isUpdating }] = useUpdateSuccessStoryMutation();
    const [deleteSuccessStory, { isLoading: isDeleting }] = useDeleteSuccessStoryMutation();

    const [showAddModal, setShowAddModal] = useState(false);
    const [editTarget, setEditTarget] = useState<SuccessStory | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SuccessStory | null>(null);

    const handleCreate = async (data: { title: string; description: string; image: File | null }) => {
        if (!data.image) return;

        try {
            await createSuccessStory({
                title: data.title,
                description: data.description,
                image: data.image
            }).unwrap();
            toast.success("Success story created successfully");
            setShowAddModal(false);
            refetch();
        } catch (error) {
            toast.error("Failed to create success story");
        }
    };

    const handleUpdate = async (data: { title: string; description: string; image: File | null }) => {
      
        try {
            await updateSuccessStory({
                id: editTarget!.id,
                title: data.title,
                description: data.description,
                image: data.image ? data.image : undefined
            }).unwrap();
            toast.success("Success story updated successfully");
            setEditTarget(null);
            refetch();
        } catch (error) {
            toast.error("Failed to update success story");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteSuccessStory(deleteTarget!.id).unwrap();
            toast.success("Success story deleted successfully");
            setDeleteTarget(null);
            refetch();
        } catch (error) {
            toast.error("Failed to delete success story");
        }
    };
    
    return (
        <section className="md:mx-8 mx-5 mt-8">
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-[#0F3D2E] text-center font-bold text-2xl">Success Stories Management</h1>
            <div className="flex flex-col items-center gap-6">
                <button onClick={() => setShowAddModal(true)} className="bg-[#2E454C] text-white px-4 py-2 rounded-2xl">Add Success Story</button>
            </div>
        </div>

{/* Shadcn Table */}
      <Card className="mt-2">
        <CardContent className="p-0">
          {isFetching ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading testimonials...
            </div>
          ) : !successStories?.length ? (
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
                {successStories.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <img
                        src={t.image}
                        alt={t.title}
                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      />
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {t.title}
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
          <SuccessStoryForm
            isLoading={isCreating}
            submitLabel="Add Story"
            imageRequired={true}
            onSubmit={handleCreate}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <Modal title="Edit Testimonial" onClose={() => setEditTarget(null)}>
          <SuccessStoryForm
            initialTitle={editTarget.title}
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
                {deleteTarget.title}
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
}