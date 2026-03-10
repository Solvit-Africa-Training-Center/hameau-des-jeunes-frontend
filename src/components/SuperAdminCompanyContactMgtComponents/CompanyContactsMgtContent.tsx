import { useRef, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2, X, Building2 } from "lucide-react";

import {
  useGetCompanyInfoQuery,
  useCreateCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
  useGetWorkingDaysQuery,
  useCreateWorkingDayMutation,
  useUpdateWorkingDayMutation,
  useDeleteWorkingDayMutation,
  type WorkingDay,
  type CreateWorkingDayPayload,
} from "@/store/api/companyInfoApi";
import { toast } from "react-toastify";

// ── Types ─────────────────────────────────────────────────────────────────

type WorkingDayFormMode = "create" | "edit";

interface CompanyInfoForm {
  company_name: string;
  company_description: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: File | null;
}

interface WorkingDayForm {
  day: string;
  start_hours: string;
  end_hours: string;
  close_days: boolean;
}

const emptyCompanyForm: CompanyInfoForm = {
  company_name: "",
  company_description: "",
  company_address: "",
  company_phone: "",
  company_email: "",
  company_website: "",
  company_logo: null,
};

const emptyWorkingDayForm: WorkingDayForm = {
  day: "",
  start_hours: "",
  end_hours: "",
  close_days: false,
};

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// ── Component ─────────────────────────────────────────────────────────────

export const CompanyContactsMgtContent = () => {
  // Queries
  const { data: companyList = [], isLoading: loadingInfo } =
    useGetCompanyInfoQuery();
  const { data: workingDays = [], isLoading: loadingDays } =
    useGetWorkingDaysQuery();
  const existingInfo = companyList[0] ?? null;

  // Mutations
  const [createInfo, { isLoading: creatingInfo }] =
    useCreateCompanyInfoMutation();
  const [updateInfo, { isLoading: updatingInfo }] =
    useUpdateCompanyInfoMutation();
  const [createDay, { isLoading: creatingDay }] = useCreateWorkingDayMutation();
  const [updateDay, { isLoading: updatingDay }] = useUpdateWorkingDayMutation();
  const [deleteDay, { isLoading: deletingDay }] = useDeleteWorkingDayMutation();

  // Company modal state
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [companyForm, setCompanyForm] =
    useState<CompanyInfoForm>(emptyCompanyForm);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  // Working day modal state
  const [dayModalOpen, setDayModalOpen] = useState(false);
  const [dayMode, setDayMode] = useState<WorkingDayFormMode>("create");
  const [editingDayId, setEditingDayId] = useState<string | null>(null);
  const [dayForm, setDayForm] = useState<WorkingDayForm>(emptyWorkingDayForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isInfoBusy = creatingInfo || updatingInfo;
  const isDayBusy = creatingDay || updatingDay;

  // ── Company Info modal ────────────────────────────────────────────────────

  const openCompanyModal = () => {
    setCompanyForm({
      company_name: existingInfo?.company_name ?? "",
      company_description: existingInfo?.company_description ?? "",
      company_address: existingInfo?.company_address ?? "",
      company_phone: existingInfo?.company_phone ?? "",
      company_email: existingInfo?.company_email ?? "",
      company_website: existingInfo?.company_website ?? "",
      company_logo: null,
    });
    setLogoPreview(existingInfo?.company_logo ?? null);
    setCompanyModalOpen(true);
  };

  const closeCompanyModal = () => {
    setCompanyModalOpen(false);
    setLogoPreview(null);
    if (logoRef.current) logoRef.current.value = "";
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCompanyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCompanyForm((prev) => ({ ...prev, company_logo: file }));
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleCompanySubmit = async () => {
    try {
      if (existingInfo) {
        await updateInfo({
          id: existingInfo.id,
          company_name: companyForm.company_name,
          company_description: companyForm.company_description,
          company_address: companyForm.company_address,
          company_phone: companyForm.company_phone,
          company_email: companyForm.company_email,
          company_website: companyForm.company_website,
          ...(companyForm.company_logo instanceof File && {
            company_logo: companyForm.company_logo,
          }),
        }).unwrap();
        toast.success("Company info updated.");
      } else {
        if (!companyForm.company_logo) {
          toast.error("Please select a company logo.");
          return;
        }
        await createInfo({
          company_name: companyForm.company_name,
          company_description: companyForm.company_description,
          company_address: companyForm.company_address,
          company_phone: companyForm.company_phone,
          company_email: companyForm.company_email,
          company_website: companyForm.company_website,
          company_logo: companyForm.company_logo,
        }).unwrap();
        toast.success("Company info saved.");
      }
      closeCompanyModal();
    } catch (err) {
      const message =
        err && typeof err === "object"
          ? Object.entries(err)
              .map(
                ([field, msgs]) =>
                  `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`,
              )
              .join(" | ")
          : "Failed to save company info.";
      console.log(message);
      toast.error("Failed to save company info.");
    }
  };

  // ── Working Day modal ─────────────────────────────────────────────────────

  const openCreateDay = () => {
    setDayForm(emptyWorkingDayForm);
    setDayMode("create");
    setEditingDayId(null);
    setDayModalOpen(true);
  };

  const openEditDay = (record: WorkingDay) => {
    setDayForm({
      day: record.day,
      start_hours: record.start_hours,
      end_hours: record.end_hours,
      close_days: record.close_days,
    });
    setDayMode("edit");
    setEditingDayId(record.id);
    setDayModalOpen(true);
  };

  const closeDayModal = () => {
    setDayModalOpen(false);
    setEditingDayId(null);
    setDayForm(emptyWorkingDayForm);
  };

  const handleDayChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setDayForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDaySubmit = async () => {
    // Basic validation before hitting the API
    if (!dayForm.day) {
      toast.error("Please select a day.");
      return;
    }
    if (!dayForm.close_days && (!dayForm.start_hours || !dayForm.end_hours)) {
      toast.error("Please set opneing and closing hours.");
      return;
    }

    try {
      const payload: CreateWorkingDayPayload = {
        ...dayForm,
        start_hours: dayForm.close_days
          ? "00:00:00"
          : dayForm.start_hours.length === 5
            ? `${dayForm.start_hours}:00`
            : dayForm.start_hours,
        end_hours: dayForm.close_days
          ? "00:00:00"
          : dayForm.end_hours.length === 5
            ? `${dayForm.end_hours}:00`
            : dayForm.end_hours,
      };

      if (dayMode === "create") {
        await createDay(payload).unwrap();
        toast.success("Working hours added.");
      } else if (editingDayId) {
        await updateDay({ id: editingDayId, ...payload }).unwrap();
        toast.success("Working hours updated.");
      }
      closeDayModal();
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in (err as object)
          ? Object.entries((err as { data: Record<string, string[]> }).data)
              .map(
                ([field, msgs]) =>
                  `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`,
              )
              .join(" | ")
          : "Failed to save working hours";
      console.log(message);
      toast.error("Failed to save working hours.");
    }
  };

  const handleDeleteDay = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteDay(id).unwrap();
      toast.success("Working hours deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <section className="md:mx-8 mx-5 mt-8 space-y-6">
        {/* Company Info Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Company Information</CardTitle>
            <Button
              onClick={openCompanyModal}
              className="flex items-center gap-2"
            >
              <Building2 size={16} />
              {existingInfo ? "Edit Info" : "Add Info"}
            </Button>
          </div>

          <CardContent className="p-0">
            {loadingInfo ? (
              <p className="text-sm text-gray-500 py-4">Loading…</p>
            ) : existingInfo ? (
              <div className="flex gap-6 items-start">
                {existingInfo.company_logo && (
                  <img
                    src={existingInfo.company_logo}
                    alt="Company logo"
                    className="w-16 h-16 rounded-lg object-contain border"
                  />
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm flex-1">
                  {[
                    { label: "Name", value: existingInfo.company_name },
                    { label: "Email", value: existingInfo.company_email },
                    { label: "Phone", value: existingInfo.company_phone },
                    { label: "Address", value: existingInfo.company_address },
                    { label: "Website", value: existingInfo.company_website },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      <p className="text-gray-800 font-medium">
                        {value || "—"}
                      </p>
                    </div>
                  ))}
                  {existingInfo.company_description && (
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                        Description
                      </p>
                      <p className="text-gray-700">
                        {existingInfo.company_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 py-4">
                No company info yet. Click <strong>Add Info</strong> to get
                started.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Working Hours Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Office Working Hours</CardTitle>
            <Button onClick={openCreateDay} className="flex items-center gap-2">
              <Plus size={16} />
              Add Hours
            </Button>
          </div>

          <CardContent className="p-0">
            {loadingDays ? (
              <p className="text-sm text-gray-500 py-4">Loading…</p>
            ) : workingDays.length === 0 ? (
              <p className="text-sm text-gray-400 py-4">
                No working hours yet. Click <strong>Add Hours</strong> to get
                started.
              </p>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Opens</TableHead>
                      <TableHead>Closes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workingDays.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {record.day}
                        </TableCell>
                        <TableCell>
                          {record.close_days ? "—" : record.start_hours}
                        </TableCell>
                        <TableCell>
                          {record.close_days ? "—" : record.end_hours}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              record.close_days
                                ? "bg-red-50 text-red-600"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {record.close_days ? "Closed" : "Open"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditDay(record)}
                              className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteDay(record.id)}
                              disabled={deletingDay && deletingId === record.id}
                              className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
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

      {/* ── Company Info Modal ─────────────────────────────────────────────── */}

      {companyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeCompanyModal}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <CardTitle className="text-lg">
                  {existingInfo ? "Edit Company Info" : "Add Company Info"}
                </CardTitle>
                <button
                  onClick={closeCompanyModal}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <CardContent className="p-0">
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="company_name">
                        Company name
                      </FieldLabel>
                      <Input
                        id="company_name"
                        name="company_name"
                        type="text"
                        placeholder="Acme Corp"
                        value={companyForm.company_name}
                        onChange={handleCompanyChange}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="company_email">Email</FieldLabel>
                      <Input
                        id="company_email"
                        name="company_email"
                        type="email"
                        placeholder="info@company.com"
                        value={companyForm.company_email}
                        onChange={handleCompanyChange}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="company_phone">Phone</FieldLabel>
                      <Input
                        id="company_phone"
                        name="company_phone"
                        type="text"
                        placeholder="+250 785 954 785"
                        value={companyForm.company_phone}
                        onChange={handleCompanyChange}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="company_website">Website</FieldLabel>
                      <Input
                        id="company_website"
                        name="company_website"
                        type="text"
                        placeholder="https://company.com"
                        value={companyForm.company_website}
                        onChange={handleCompanyChange}
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="company_address">Address</FieldLabel>
                    <Input
                      id="company_address"
                      name="company_address"
                      type="text"
                      placeholder="Eastern Province, Rwamagana"
                      value={companyForm.company_address}
                      onChange={handleCompanyChange}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="company_logo">
                      Company logo
                      {existingInfo && (
                        <span className="text-gray-400 font-normal ml-1">
                          (leave blank to keep current)
                        </span>
                      )}
                    </FieldLabel>
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-16 h-16 rounded-lg object-contain border mb-2"
                      />
                    )}
                    <Input
                      id="company_logo"
                      name="company_logo"
                      type="file"
                      accept="image/*"
                      ref={logoRef}
                      onChange={handleLogoChange}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="company_description">
                      Description
                    </FieldLabel>
                    <textarea
                      id="company_description"
                      name="company_description"
                      rows={3}
                      placeholder="Brief description of the company…"
                      value={companyForm.company_description}
                      onChange={handleCompanyChange}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </Field>
                </FieldGroup>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeCompanyModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleCompanySubmit} disabled={isInfoBusy}>
                    {isInfoBusy
                      ? "Saving…"
                      : existingInfo
                        ? "Update Info"
                        : "Save Info"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── Working Day Modal ──────────────────────────────────────────────── */}

      {dayModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeDayModal}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative z-10 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <CardTitle className="text-lg">
                  {dayMode === "create"
                    ? "Add Working Hours"
                    : "Edit Working Hours"}
                </CardTitle>
                <button
                  onClick={closeDayModal}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <CardContent className="p-0">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="day">Day</FieldLabel>
                    <select
                      id="day"
                      name="day"
                      value={dayForm.day}
                      onChange={handleDayChange}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Select a day</option>
                      {DAYS_OF_WEEK.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="flex items-center gap-3 py-1">
                    <input
                      id="close_days"
                      name="close_days"
                      type="checkbox"
                      checked={dayForm.close_days}
                      onChange={handleDayChange}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                    <label
                      htmlFor="close_days"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mark as closed day
                    </label>
                  </div>

                  {!dayForm.close_days && (
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="start_hours">Opens at</FieldLabel>
                        <Input
                          id="start_hours"
                          name="start_hours"
                          type="time"
                          value={dayForm.start_hours}
                          onChange={handleDayChange}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="end_hours">Closes at</FieldLabel>
                        <Input
                          id="end_hours"
                          name="end_hours"
                          type="time"
                          value={dayForm.end_hours}
                          onChange={handleDayChange}
                        />
                      </Field>
                    </div>
                  )}
                </FieldGroup>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeDayModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleDaySubmit} disabled={isDayBusy}>
                    {isDayBusy
                      ? dayMode === "create"
                        ? "Saving…"
                        : "Updating…"
                      : dayMode === "create"
                        ? "Save Hours"
                        : "Update Hours"}
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
