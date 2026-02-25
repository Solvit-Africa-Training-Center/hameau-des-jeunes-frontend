import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Pencil,
  FileText,
  Info,
  Heart,
  GraduationCap,
  Wallet,
  BarChart3,
  Clipboard,
  Plus,
  ChevronRight,
  Download,
  TrendingUp,
  Trash2,
  Phone,
  Loader2,
} from "lucide-react";
import type { Child } from "@/store/api/childrenApi";
import { useGetCaretakersQuery } from "@/store/api/caretakersApi";
import {
  useDeleteHealthRecordMutation,
  useGetHealthRecordsByChildQuery,
} from "@/store/api/healthRecordsApi";
import {
  useGetEnrollmentsQuery,
  useDeleteEnrollmentMutation,
  type Enrollment,
  type EnrollmentStatus,
} from "@/store/api/enrollmentApi";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaGraduationCap } from "react-icons/fa";
import NewEnrollmentModal from "./NewEnrollmentModal";
import EditEnrollmentModal from "./EditEnrollmentModal";
import { Card, CardContent } from "@/components/ui/card";
import { FaPenClip } from "react-icons/fa6";
import { BiTrash } from "react-icons/bi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  status: string;
}

type ActiveTab =
  | "overview"
  | "personal"
  | "health"
  | "education"
  | "finance"
  | "progress";

interface ChildDetailViewProps {
  child: Child;
  onBack: () => void;
  onNewHealthRecord?: () => void;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EnrollmentStatus }) {
  const styles: Record<EnrollmentStatus, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    DISCONTINUED: "bg-red-100 text-red-700",
  };
  const labels: Record<EnrollmentStatus, string> = {
    ACTIVE: "Active",
    COMPLETED: "Completed",
    DISCONTINUED: "Discontinued",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-xl text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChildDetailView({
  child,
  onBack,
  onNewHealthRecord,
}: ChildDetailViewProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isNewEnrollmentOpen, setIsNewEnrollmentOpen] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(
    null,
  );

  // ── Health ──────────────────────────────────────────────────────────────────
  const {
    data: healthRecords = [],
    isLoading: healthLoading,
    isError: healthError,
  } = useGetHealthRecordsByChildQuery(child.id);
  const [deleteHealthRecord] = useDeleteHealthRecordMutation();

  // ── Caretaker ───────────────────────────────────────────────────────────────
  const { data: caretakers = [] } = useGetCaretakersQuery();
  const matchedCaretaker = useMemo(
    () =>
      caretakers.find(
        (c) =>
          c.full_name.toLowerCase().trim() ===
          child.vigilant_contact_name.toLowerCase().trim(),
      ) ?? null,
    [caretakers, child.vigilant_contact_name],
  );

  // ── Enrollments ─────────────────────────────────────────────────────────────
  const {
    data: enrollmentsData,
    isLoading: enrollmentsLoading,
    isError: enrollmentsError,
    error: enrollmentsRawError,
  } = useGetEnrollmentsQuery();

  if (enrollmentsRawError) {
    console.error("[Enrollments] API error:", enrollmentsRawError);
  }

  const enrollments = (enrollmentsData?.results ?? []).filter(
    (e) => (e.child as any)?.id === child.id,
  );
  const [deleteEnrollment] = useDeleteEnrollmentMutation();

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleDeleteHealthRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this health record?")) return;
    try {
      await deleteHealthRecord(id).unwrap();
      toast.success("Health record deleted.");
    } catch {
      toast.error("Failed to delete health record.");
    }
  };

  const handleDeleteEnrollment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await deleteEnrollment(id).unwrap();
      toast.success("Enrollment deleted.");
    } catch {
      toast.error("Failed to delete enrollment.");
    }
  };

  // ── Derived values ──────────────────────────────────────────────────────────

  const caretakerInitials = child.vigilant_contact_name
    ? child.vigilant_contact_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "—";

  const caretakerPhone =
    matchedCaretaker?.phone || child.vigilant_contact_phone;
  const caretakerRole = matchedCaretaker?.role || "Guardian / Caretaker";
  const caretakerEmail = matchedCaretaker?.email || null;

  // ── Dummy finance data ──────────────────────────────────────────────────────
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2026-02-01",
      category: "Completed",
      description: "Monthly specialized diet supplement",
      status: "Completed",
    },
    {
      id: "2",
      date: "2026-01-15",
      category: "Completed",
      description: "New school uniforms (2 sets)",
      status: "Completed",
    },
    {
      id: "3",
      date: "2026-02-03",
      category: "Completed",
      description: "Vitamin fortified juice pack",
      status: "Completed",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "personal", label: "Personal & Care", icon: User },
    { id: "health", label: "Health Records", icon: Heart },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "finance", label: "Finance", icon: Wallet },
    { id: "progress", label: "Progress & Reports", icon: BarChart3 },
  ];

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Child Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={child.profile_image}
                alt={child.full_name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">{child.full_name}</h2>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    Special Care
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {child.age} Years Old •{" "}
                    {child.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> Caretaker:{" "}
                    {child.vigilant_contact_name}
                  </span>
                </div>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {child.status}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Pencil className="w-4 h-4" /> Edit Profile
              </button>
              <button className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" /> Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border-b mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-emerald-900 text-emerald-900"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-emerald-900" />
                      </div>
                      <span className="font-medium">Health Status</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">Stable</div>
                    <p className="text-sm text-gray-600">
                      Last checkup: Feb 3, 2026
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium">Education</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {enrollments.filter((e) => e.status === "ACTIVE").length >
                      0
                        ? "Enrolled"
                        : "Not Enrolled"}
                    </div>
                    <p className="text-sm text-gray-600">
                      {enrollments.filter((e) => e.status === "ACTIVE").length}{" "}
                      active enrollment
                      {enrollments.filter((e) => e.status === "ACTIVE")
                        .length !== 1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Care Timeline */}
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                    <Clipboard className="w-5 h-5" /> Care Timeline
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Admission to Hameau",
                        desc: "Enrolled via social services referral",
                        date: child.start_date,
                        color: "bg-black",
                      },
                      {
                        title: "Assigned Caretaker",
                        desc: child.vigilant_contact_name,
                        date: child.start_date,
                        color: "bg-blue-500",
                      },
                      {
                        title: "Education Enrollment",
                        desc: "Enrolled in St. Maria Primary School",
                        date: "Jan 10, 2025",
                        color: "bg-blue-500",
                      },
                      {
                        title: "Recent Health Check",
                        desc: "General wellness checkup - Good progress",
                        date: "Feb 03, 2026",
                        color: "bg-amber-500",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${item.color}`}
                          />
                          {index < 3 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Current Care Taker */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-6">
                  Current Care Taker
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-emerald-800 font-semibold text-lg">
                      {caretakerInitials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium">
                      {child.vigilant_contact_name || "—"}
                    </h4>
                    <p className="text-sm text-emerald-700 font-medium mt-0.5">
                      {caretakerRole}
                    </p>
                    {caretakerPhone && (
                      <a
                        href={`tel:${caretakerPhone}`}
                        className="inline-flex items-center gap-1.5 mt-2 text-sm text-gray-600 hover:text-emerald-900 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {caretakerPhone}
                      </a>
                    )}
                    {caretakerEmail && (
                      <a
                        href={`mailto:${caretakerEmail}`}
                        className="inline-flex items-center gap-1.5 mt-1 text-sm text-gray-600 hover:text-emerald-900 transition-colors truncate"
                      >
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        {caretakerEmail}
                      </a>
                    )}
                  </div>
                </div>

                <div className="border-t my-5" />

                <div className="space-y-3">
                  {[
                    { label: "Child", value: child.full_name },
                    { label: "Gender", value: child.gender },
                    { label: "Age", value: `${child.age} yrs` },
                    { label: "Admitted", value: child.start_date },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span
                      className={`font-medium ${
                        child.status === "ACTIVE"
                          ? "text-emerald-700"
                          : "text-gray-500"
                      }`}
                    >
                      {child.status}
                    </span>
                  </div>
                </div>

                {child.special_needs && (
                  <>
                    <div className="border-t my-5" />
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-xs font-semibold text-amber-700 mb-1 uppercase tracking-wide">
                        Special Needs
                      </p>
                      <p className="text-sm text-amber-800">
                        {child.special_needs}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Personal & Care Tab */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                <p className="text-sm text-gray-500">
                  Last Updated: Jan 20, 2026 by Administrator
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <p className="font-medium mt-1">{child.full_name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Date of Admission
                  </label>
                  <p className="font-medium mt-1">{child.start_date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Gender</label>
                  <p className="font-medium mt-1">{child.gender}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <p className="font-medium mt-1">{child.age} Years</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Care Type</label>
                  <p className="font-medium mt-1">Full-time Residential</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Reason for Care
                  </label>
                  <p className="font-medium mt-1">Orphaned</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Guardian / Relative
                  </label>
                  <p className="font-medium mt-1">
                    {child.vigilant_contact_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Guardian Contact
                  </label>
                  <p className="font-medium mt-1">
                    {child.vigilant_contact_phone}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <label className="text-sm text-gray-600">
                  Background Information
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{child.story}</p>
                </div>
              </div>
            </div>
          )}

          {/* Health Records Tab */}
          {activeTab === "health" && (
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Health Intake Records</h3>
                <button
                  onClick={onNewHealthRecord}
                  className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Health Record
                </button>
              </div>

              {healthLoading && (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading health records...
                </div>
              )}
              {healthError && (
                <p className="text-sm text-center text-red-500 py-10">
                  Failed to load health records. Please try again.
                </p>
              )}
              {!healthLoading && !healthError && healthRecords.length === 0 && (
                <p className="text-sm text-center text-gray-400 py-10">
                  No health records found for this child.
                </p>
              )}

              {!healthLoading && !healthError && healthRecords.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[12%]">Visit Date</TableHead>
                      <TableHead className="w-[14%]">Record Type</TableHead>
                      <TableHead className="w-[16%]">Hospital</TableHead>
                      <TableHead className="w-[16%]">Diagnosis</TableHead>
                      <TableHead className="w-[16%]">Treatment</TableHead>
                      <TableHead className="w-[12%]">Cost</TableHead>
                      <TableHead className="w-[14%]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {healthRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-sm truncate max-w-0">
                          {record.visit_date}
                        </TableCell>
                        <TableCell className="max-w-0">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium block truncate">
                            {record.record_type
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                        </TableCell>
                        <TableCell
                          className="text-sm truncate max-w-0"
                          title={record.hospital_name ?? ""}
                        >
                          {record.hospital_name ?? "—"}
                        </TableCell>
                        <TableCell
                          className="text-sm truncate max-w-0"
                          title={record.diagnosis ?? ""}
                        >
                          {record.diagnosis ?? "—"}
                        </TableCell>
                        <TableCell
                          className="text-sm truncate max-w-0"
                          title={record.treatment ?? ""}
                        >
                          {record.treatment ?? "—"}
                        </TableCell>
                        <TableCell className="text-sm truncate max-w-0">
                          {record.cost_formatted}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteHealthRecord(record.id)
                              }
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}

          {/* ── Education Tab ─────────────────────────────────────────────── */}
          {activeTab === "education" && (
            <div className="flex flex-col gap-6">
              {/* Toolbar */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsNewEnrollmentOpen(true)}
                  className="flex gap-2 bg-emerald-900 hover:bg-emerald-800"
                >
                  <FaGraduationCap size={18} />
                  <span className="text-sm text-white">New Enrollment</span>
                </Button>
              </div>

              {/* States */}
              {enrollmentsLoading && (
                <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400 bg-white rounded-3xl">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading enrollments...
                </div>
              )}

              {enrollmentsError && (
                <div className="py-16 text-center text-sm text-red-500 bg-white rounded-3xl">
                  Failed to load enrollments — check the browser console for
                  details.
                </div>
              )}

              {!enrollmentsLoading &&
                !enrollmentsError &&
                enrollments.length === 0 && (
                  <div className="py-16 text-center text-sm text-gray-400 bg-white rounded-3xl">
                    No enrollments found for this child.
                  </div>
                )}

              {/* Table */}
              {!enrollmentsLoading &&
                !enrollmentsError &&
                enrollments.length > 0 && (
                  <Card className="rounded-3xl shadow-sm">
                    <CardContent className="p-0">
                      <Table className="text-gray-500">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Institution
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Program
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Level
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Start Date
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              End Date
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Cost
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Status
                            </TableHead>
                            <TableHead className="text-gray-500 font-bold text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {enrollments.map((enrollment) => (
                            <TableRow
                              key={enrollment.id}
                              className="hover:bg-muted/40"
                            >
                              <TableCell className="text-center">
                                {enrollment.program?.institution?.name ?? "—"}
                              </TableCell>
                              <TableCell className="text-center">
                                {enrollment.program?.program_name ?? "—"}
                              </TableCell>
                              <TableCell className="text-center">
                                {enrollment.level}
                              </TableCell>
                              <TableCell className="text-center">
                                {enrollment.start_date}
                              </TableCell>
                              <TableCell className="text-center">
                                {enrollment.end_date}
                              </TableCell>
                              <TableCell className="text-center">
                                {enrollment.cost}
                              </TableCell>
                              <TableCell className="text-center">
                                <StatusBadge status={enrollment.status} />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-3">
                                  <button
                                    onClick={() =>
                                      setEditingEnrollment(enrollment)
                                    }
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Edit enrollment"
                                  >
                                    <FaPenClip className="text-gray-500" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteEnrollment(enrollment.id)
                                    }
                                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete enrollment"
                                  >
                                    <BiTrash className="text-red-600" />
                                  </button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

              {/* Modals */}
              <NewEnrollmentModal
                isOpen={isNewEnrollmentOpen}
                onClose={() => setIsNewEnrollmentOpen(false)}
                childId={child.id}
              />

              <EditEnrollmentModal
                isOpen={!!editingEnrollment}
                enrollment={editingEnrollment}
                onClose={() => setEditingEnrollment(null)}
              />
            </div>
          )}

          {/* Finance Tab */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-900 text-white rounded-xl p-6">
                  <h4 className="text-sm opacity-90 mb-2">Total Care Costs</h4>
                  <p className="text-3xl font-bold mb-4">92,000 RWF</p>
                  <button className="flex items-center gap-2 text-sm bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                    <Plus className="w-4 h-4" />
                    Record Child Expense
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <h4 className="text-sm text-gray-600 mb-2">
                    Last Month Spend
                  </h4>
                  <p className="text-3xl font-bold mb-2">85,400 RWF</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2.4% vs Previous</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <h4 className="text-sm text-gray-600 mb-2">
                    Insurance Status
                  </h4>
                  <p className="text-3xl font-bold mb-2">Active</p>
                  <p className="text-sm text-gray-600">Expires: Dec 31, 2026</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Transaction History</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View Monthly Analysis →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Date
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Category
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Description
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => (
                        <tr key={t.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 text-sm">{t.date}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {t.category}
                            </span>
                          </td>
                          <td className="py-4 text-sm">{t.description}</td>
                          <td className="py-4">
                            <button className="text-emerald-900 hover:text-emerald-700">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Progress & Reports Tab */}
          {activeTab === "progress" && (
            <div className="bg-white rounded-xl p-12">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Generate Child Progress Report
                </h3>
                <p className="text-gray-600 mb-8">
                  This tool compiles all current data including health,
                  education, behavioral notes, and finance into a single,
                  professional PDF document ready for stakeholders or
                  authorities.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 border rounded-lg text-left">
                    <h4 className="font-medium mb-2">Quarterly Progress</h4>
                    <p className="text-sm text-gray-600">
                      Standard developmental review for the last 3 months
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h4 className="font-medium mb-2">Full History Report</h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive data since the date of admission
                    </p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-emerald-900 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center gap-2 mx-auto">
                  <Download className="w-5 h-5" />
                  Preview & Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
