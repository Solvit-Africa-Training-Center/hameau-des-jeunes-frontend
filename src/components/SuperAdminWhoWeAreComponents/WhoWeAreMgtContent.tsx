import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  useCreateWhoWeAreMutation,
  useDeleteWhoWeAreMutation,
  useGetWhoWeAreQuery,
  useUpdateWhoWeAreMutation,
  type WhoWeAre,
} from "@/store/api/whoWeAreApi";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Modal

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/40 " onClick={onClose} />
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

// Shared Form

interface WhoWeAreFormProps {
  initialTitle?: string;
  initialDescription: string;
  isLoading: boolean;
  submitLabel: string;
  onSubmit: (data: { title: string; description: string }) => void;
}

const WhoWeAreForm = ({
  initialTitle = "",
  initialDescription = "",
  isLoading,
  submitLabel,
  onSubmit,
}: WhoWeAreFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form_title">Title</FieldLabel>
          <Input
            id="form_title"
            type="text"
            placeholder="Enter the title of the section"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="form_description">Section content</FieldLabel>
          <Textarea
            id="form_description"
            placeholder="Enter the content of the section"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field>

        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
};

// Main content

export const WhoWeAreMgtContent = () => {
  const { data: entries, isLoading: isFetching } = useGetWhoWeAreQuery();
  const [createEntry, { isLoading: isCreating }] = useCreateWhoWeAreMutation();
  const [updateEntry, { isLoading: isUpdating }] = useUpdateWhoWeAreMutation();
  const [deleteEntry] = useDeleteWhoWeAreMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<WhoWeAre | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WhoWeAre | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (data: { title: string; description: string }) => {
    try {
      await createEntry(data).unwrap();
      toast.success("Entry added successfully!");
      setShowAddModal(false);
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to add entry.");
    }
  };

  const handleUpdate = async (data: { title: string; description: string }) => {
    if (!editTarget) return;
    try {
      await updateEntry({ id: editTarget.id, ...data }).unwrap();
      toast.success("Entry updated successfully!");
      setEditTarget(null);
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to update entry.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteEntry(deleteTarget.id).unwrap();
      toast.success("Entry deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete entry.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="md:mx-8 mx-5 mt-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Who We Are</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </Button>
      </div>

      {/* Table */}

      <Card className="p-5 md:w-3xl w-2xs">
        <CardContent className="p-0">
          {isFetching ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading entries...
            </div>
          ) : !entries?.length ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No entries yet. Add one to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Date Added
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {entry.title}
                    </TableCell>
                    <TableCell className="text-gray-600 max-w-sm truncate">
                      {entry.description}
                    </TableCell>
                    <TableCell className="text-gray-400 whitespace-nowrap">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditTarget(entry)}
                          className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(entry)}
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
        <Modal title="Add Entry" onClose={() => setShowAddModal(false)}>
          <WhoWeAreForm
            isLoading={isCreating}
            submitLabel="Add Entry"
            onSubmit={handleCreate}
            initialDescription=""
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <Modal title="Edit Entry" onClose={() => setEditTarget(null)}>
          <WhoWeAreForm
            initialTitle={editTarget.title}
            initialDescription={editTarget.description}
            isLoading={isUpdating}
            submitLabel="Save Changes"
            onSubmit={handleUpdate}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal title="Delete Entry" onClose={() => setDeleteTarget(null)}>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
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
};
