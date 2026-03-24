import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ── Form & value type
interface Value {
  id: string;
  title: string;
  description: string;
}

interface FormState {
  title: string;
  description: string;
}

const emptyForm = (): FormState => ({ title: "", description: "" });

// ── Component
export const OurValuesMgtContent = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const resetModal = () => {
    setForm(emptyForm());
    setFormError(null);
    setModalOpen(false);
  };

  const handleSubmit = () => {
    setFormError(null);

    if (!form.title.trim() || !form.description.trim()) {
      setFormError("Both title and description are required.");
      return;
    }

    setValues((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim(),
      },
    ]);
    resetModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setValues((prev) => prev.filter((v) => v.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <section className="mx-3 md:mx-0 mt-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Our Values</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your values titles and descriptions
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white gap-2"
        >
          <Plus className="w-4 h-4" /> Add Value
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {values.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              No values yet. Click <strong>Add Value</strong> to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {values.map((value) => (
                  <TableRow key={value.id}>
                    <TableCell>{value.title}</TableCell>
                    <TableCell>{value.description}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() =>
                          setDeleteTarget({ id: value.id, label: value.title })
                        }
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Value Modal */}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && resetModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Add Value
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {formError && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                {formError}
              </p>
            )}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="value-title">Title</FieldLabel>
                <Input
                  id="value-title"
                  placeholder="Enter title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="value-description">Description</FieldLabel>
                <Textarea
                  id="value-description"
                  placeholder="Enter description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-teal-700 hover:bg-teal-800 text-white gap-2"
            >
              Save Value
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{deleteTarget?.label}</strong>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
