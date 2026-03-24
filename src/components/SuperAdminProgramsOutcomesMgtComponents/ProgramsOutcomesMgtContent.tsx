import { useState } from "react";
import { Plus, Trash2, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";

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

import {
  useGetOutcomesQuery,
  useCreateOutcomeMutation,
  useDeleteOutcomeMutation,
  useCreateOutcomeDescriptionMutation,
  useDeleteOutcomeDescriptionMutation,
  type Outcome,
  type OutcomeDescription,
} from "@/store/api/outcomesApi";

// ── Form state
interface FormState {
  title: string;
  descriptions: string[];
}
const emptyForm = (): FormState => ({ title: "", descriptions: [""] });

// ── Main Component
export const ProgramsOutcomesMgtContent = () => {
  const { data: outcomes = [], isLoading } = useGetOutcomesQuery();

  const [createOutcome, { isLoading: creatingOutcome }] =
    useCreateOutcomeMutation();
  const [deleteOutcome] = useDeleteOutcomeMutation();
  const [createDescription, { isLoading: creatingDesc }] =
    useCreateOutcomeDescriptionMutation();
  const [deleteDescription] = useDeleteOutcomeDescriptionMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "outcome" | "description";
    id: string;
    label: string;
  } | null>(null);

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // ── Form helpers
  const addDescriptionRow = () =>
    setForm((f) => ({ ...f, descriptions: [...f.descriptions, ""] }));
  const removeDescriptionRow = (i: number) =>
    setForm((f) => ({
      ...f,
      descriptions: f.descriptions.filter((_, idx) => idx !== i),
    }));
  const updateDescription = (i: number, value: string) =>
    setForm((f) => {
      const descriptions = [...f.descriptions];
      descriptions[i] = value;
      return { ...f, descriptions };
    });
  const resetModal = () => {
    setForm(emptyForm());
    setFormError(null);
    setModalOpen(false);
  };

  // ── Submit
  const handleSubmit = async () => {
    setFormError(null);
    if (!form.title.trim()) {
      setFormError("Title is required.");
      return;
    }

    const filledDescs = form.descriptions.filter((d) => d.trim());

    try {
      // 1. Create outcome
      const outcome = await createOutcome({
        title: form.title.trim(),
      }).unwrap();

      if (!outcome.id) {
        throw new Error("Outcome ID missing after creation!");
      }

      // 2. Create descriptions
      for (const desc of filledDescs) {
        await createDescription({
          outcome: outcome.id, // REQUIRED by backend
          description: desc.trim(),
        }).unwrap();
      }

      resetModal();
    } catch (err: any) {
      console.error("Error creating outcome + descriptions:", err);
      setFormError(JSON.stringify(err?.data || err.message));
    }
  };

  // ── Delete handler
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "outcome") {
        await deleteOutcome(deleteTarget.id).unwrap();
      } else {
        await deleteDescription(deleteTarget.id).unwrap();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  // ── Expand row
  const toggleRow = (id: string) =>
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ── Render
  return (
    <section className="mx-3 md:mx-0 mt-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Programs Outcomes
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage outcome titles and their descriptions
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white gap-2"
        >
          <Plus className="w-4 h-4" /> Add Outcome
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading outcomes…</span>
            </div>
          ) : outcomes.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              No outcomes yet. Click <strong>Add Outcome</strong> to get
              started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-8" />
                  <TableHead>Title</TableHead>
                  <TableHead>Descriptions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outcomes.map((outcome: Outcome) => {
                  const isExpanded = expandedRows.has(outcome.id);
                  const descCount = outcome.descriptions?.length ?? 0;

                  return (
                    <>
                      <TableRow key={outcome.id}>
                        <TableCell>
                          {descCount > 0 && (
                            <button
                              onClick={() => toggleRow(outcome.id)}
                              className="text-gray-400 hover:text-gray-700"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {outcome.title}
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-gray-500">
                            {descCount} description{descCount !== 1 ? "s" : ""}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                type: "outcome",
                                id: outcome.id,
                                label: outcome.title,
                              })
                            }
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>

                      {isExpanded &&
                        outcome.descriptions?.map(
                          (desc: OutcomeDescription) => (
                            <TableRow
                              key={desc.id}
                              className="bg-teal-50/40 border-l-2 border-teal-400"
                            >
                              <TableCell />
                              <TableCell
                                colSpan={2}
                                className="text-sm text-gray-600 pl-6"
                              >
                                {desc.description}
                              </TableCell>
                              <TableCell className="text-right">
                                <button
                                  onClick={() =>
                                    setDeleteTarget({
                                      type: "description",
                                      id: desc.id,
                                      label: desc.description.slice(0, 40),
                                    })
                                  }
                                  className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ── Add Outcome Modal ── */}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && resetModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Add Program Outcome
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
                <FieldLabel htmlFor="outcome-title">
                  Title <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="outcome-title"
                  placeholder="e.g. Education"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </Field>

              <Field>
                <FieldLabel>Descriptions</FieldLabel>
                <div className="space-y-2">
                  {form.descriptions.map((desc, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <Textarea
                        placeholder={`Description ${i + 1}`}
                        value={desc}
                        onChange={(e) => updateDescription(i, e.target.value)}
                        rows={2}
                        className="flex-1 resize-none"
                      />
                      {form.descriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescriptionRow(i)}
                          className="mt-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDescriptionRow}
                    className="gap-1 text-teal-700 border-teal-300 hover:bg-teal-50"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add description row
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={creatingOutcome || creatingDesc}
              className="bg-teal-700 hover:bg-teal-800 text-white gap-2"
            >
              {(creatingOutcome || creatingDesc) && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              Save Outcome
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete confirmation ── */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>
                {deleteTarget?.type === "outcome" ? "outcome" : "description"}
              </strong>
              : <em>{deleteTarget?.label}</em>. This action cannot be undone.
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
