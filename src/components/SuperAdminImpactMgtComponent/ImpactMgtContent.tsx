import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useCreateCompanyImpactMutation,
  useDeleteCompanyImpactMutation,
  useGetCompanyImpactQuery,
  useUpdateCompanyImpactMutation,
  type CompanyImpact,
  type CreateCompanyImpactPayload,
} from "@/store/api/companyImpact";
import { useState } from "react";
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
import { toast } from "react-toastify";

// Types

type FormMode = "create" | "edit";

interface FormState {
  children_supported: string;
  years_of_service: string;
  families_strengthened: string;
  communities_impacted: string;
  schools_supported: string;
  youth_trained: string;
  success_rate: string;
}

const emptyForm: FormState = {
  children_supported: "",
  years_of_service: "",
  families_strengthened: "",
  communities_impacted: "",
  schools_supported: "",
  youth_trained: "",
  success_rate: "",
};

// Table columns config

const COLUMNS: { label: string; key: keyof CompanyImpact }[] = [
  { label: "Children Supported", key: "children_supported" },
  { label: "Years of Service", key: "years_of_service" },
  { label: "Families", key: "families_strengthened" },
  { label: "Communities", key: "communities_impacted" },
  { label: "Schools", key: "schools_supported" },
  { label: "Youth Trained", key: "youth_trained" },
  { label: "Success Rate", key: "success_rate" },
];

// Component

export const ImpactMgtContent = () => {
  const { data: impactList = [], isLoading: isFetching } =
    useGetCompanyImpactQuery();
  const [createImpact, { isLoading: isCreating }] =
    useCreateCompanyImpactMutation();
  const [updateImpact, { isLoading: isUpdating }] =
    useUpdateCompanyImpactMutation();
  const [deleteImpact, { isLoading: isDeleting }] =
    useDeleteCompanyImpactMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isBusy = isCreating || isUpdating;

  // Modal helpers

  const openCreate = () => {
    setForm(emptyForm);
    setMode("create");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (record: CompanyImpact) => {
    setForm({
      children_supported: record.children_supported,
      years_of_service: record.years_of_service,
      families_strengthened: record.families_strengthened,
      communities_impacted: record.communities_impacted,
      schools_supported: record.schools_supported,
      youth_trained: record.youth_trained,
      success_rate: record.success_rate,
    });
    setMode("edit");
    setEditingId(record.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // Form change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit

  const handleSubmit = async () => {
    const payload: CreateCompanyImpactPayload = { ...form };
    if (mode === "create") {
      await createImpact(payload);
      toast.success("Impact record created successfully.");
    } else if (editingId) {
      await updateImpact({ id: editingId, ...payload });
      toast.success("Impact record updated successfully.");
    }
    closeModal();
  };

  // Delete

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteImpact(id);
    toast.success("Impact record deleted.");
    setDeletingId(null);
  };

  // Render

  return (
    <>
      <section className="md:mx-8 mx-5 mt-8">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Impact data</CardTitle>
            <Button onClick={openCreate} className="flex items-center gap-2">
              <Plus size={16} />
              Add Record
            </Button>
          </div>

          <CardContent className="p-0">
            {isFetching ? (
              <p className="text-sm text-gray-500 py-6 text-center">Loading…</p>
            ) : impactList.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                No impact records yet. Click <strong>Add Record</strong> to get
                started.
              </p>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {COLUMNS.map((col) => (
                        <TableHead key={col.key} className="whitespace-nowrap">
                          {col.label}
                        </TableHead>
                      ))}
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {impactList.map((record) => (
                      <TableRow key={record.id}>
                        {COLUMNS.map((col) => (
                          <TableCell
                            key={col.key}
                            className="whitespace-nowrap"
                          >
                            {record[col.key] ?? "-"}
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(record)}
                              className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(record.id)}
                              disabled={isDeleting && deletingId === record.id}
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

          {/* Panel - stop clicks propagating to the overlay */}
          <div
            className="relative z-10 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <CardTitle className="text-lg">
                  {mode === "create"
                    ? "Add Impact Record"
                    : "Edit Impact Record"}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Field>
                        <FieldLabel htmlFor="children_supported">
                          Children supported
                        </FieldLabel>
                        <Input
                          id="children_supported"
                          name="children_supported"
                          type="number"
                          placeholder="500"
                          value={form.children_supported}
                          onChange={handleChange}
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="years_of_service">
                          Years in Service
                        </FieldLabel>
                        <Input
                          id="years_of_service"
                          name="years_of_service"
                          type="number"
                          placeholder="15"
                          value={form.years_of_service}
                          onChange={handleChange}
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="families_strengthened">
                          Families strengthened
                        </FieldLabel>
                        <Input
                          id="families_strengthened"
                          name="families_strengthened"
                          type="number"
                          placeholder="20"
                          value={form.families_strengthened}
                          onChange={handleChange}
                        />
                      </Field>
                    </div>

                    <div className="space-y-3">
                      <Field>
                        <FieldLabel htmlFor="schools_supported">
                          School enrollment
                        </FieldLabel>
                        <Input
                          id="schools_supported"
                          name="schools_supported"
                          type="number"
                          placeholder="500"
                          value={form.schools_supported}
                          onChange={handleChange}
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="youth_trained">
                          Youths trained
                        </FieldLabel>
                        <Input
                          id="youth_trained"
                          name="youth_trained"
                          type="number"
                          placeholder="15"
                          value={form.youth_trained}
                          onChange={handleChange}
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="success_rate">
                          Success rate
                        </FieldLabel>
                        <Input
                          id="success_rate"
                          name="success_rate"
                          type="number"
                          placeholder="20"
                          value={form.success_rate}
                          onChange={handleChange}
                        />
                      </Field>
                    </div>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="communities_impacted">
                      Commitment to impact
                    </FieldLabel>
                    <Input
                      id="communities_impacted"
                      name="communities_impacted"
                      type="number"
                      placeholder="85"
                      value={form.communities_impacted}
                      onChange={handleChange}
                    />
                  </Field>
                </FieldGroup>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isBusy}>
                    {isBusy
                      ? mode === "create"
                        ? "Saving…"
                        : "Updating…"
                      : mode === "create"
                        ? "Save Record"
                        : "Update Record"}
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
