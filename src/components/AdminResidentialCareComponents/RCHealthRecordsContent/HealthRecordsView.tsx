import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Download,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetHealthRecordsQuery,
  type HealthRecord,
} from "@/store/api/healthRecordsApi";

import { useGetChildrenQuery, type Child } from "@/store/api/childrenApi";

import fallbackAvatar from "@/assets/kid.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const RECORD_TYPE_LABELS: Record<HealthRecord["record_type"], string> = {
  MEDICAL_VISIT: "Medical Visit",
  VACCINATION: "Vaccination",
  ILLNESS: "Illness",
};

const RECORD_TYPE_COLORS: Record<HealthRecord["record_type"], string> = {
  MEDICAL_VISIT: "bg-blue-50 text-blue-700",
  VACCINATION: "bg-emerald-50 text-emerald-700",
  ILLNESS: "bg-red-50 text-red-700",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function Truncated({
  text,
  className = "",
}: {
  text: string | null;
  className?: string;
}) {
  const display = text || "—";
  return (
    <span className={`block truncate ${className}`} title={display}>
      {display}
    </span>
  );
}

function Avatar({
  src,
  name,
}: {
  src: string | null | undefined;
  name: string;
}) {
  return (
    <img
      src={src || fallbackAvatar}
      alt={name}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
      }}
      className="w-8 h-8 rounded-full object-cover shrink-0"
    />
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HealthRecordsViewProps {
  onRegisterClick: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HealthRecordsView({
  onRegisterClick,
}: HealthRecordsViewProps) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [recordType, setRecordType] = useState<
    HealthRecord["record_type"] | ""
  >("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // ── RTK Query ───────────────────────────────────────────────────────────────

  const {
    data: records = [],
    isLoading: recordsLoading,
    isError: recordsError,
    refetch,
  } = useGetHealthRecordsQuery();

  const { data: children = [], isLoading: childrenLoading } =
    useGetChildrenQuery();

  // Build a UUID → Child lookup map so we can join without re-scanning on every render
  const childMap = useMemo(() => {
    return children.reduce<Record<string, Child>>((acc, child) => {
      acc[child.id] = child;
      return acc;
    }, {});
  }, [children]);

  const isLoading = recordsLoading || childrenLoading;
  const isError = recordsError;

  // ── Filter + paginate ───────────────────────────────────────────────────────

  const filtered = records.filter((r) => {
    const matchSearch =
      !search ||
      r.child_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.hospital_name ?? "").toLowerCase().includes(search.toLowerCase());

    const matchType = !recordType || r.record_type === recordType;

    const visitMs = new Date(r.visit_date).getTime();
    const matchFrom = !dateFrom || visitMs >= new Date(dateFrom).getTime();
    const matchTo = !dateTo || visitMs <= new Date(dateTo).getTime();

    return matchSearch && matchType && matchFrom && matchTo;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  useEffect(() => {
    setPage(1);
  }, [search, recordType, dateFrom, dateTo]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Health Records
            </h1>
            <p className="text-sm text-gray-600">
              Monitor health intake screenings and medical history for all
              children.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button
              onClick={onRegisterClick}
              className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              Register Health Visit
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between gap-3 mb-4 shrink-0 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={recordType}
              onChange={(e) =>
                setRecordType(
                  e.target.value as HealthRecord["record_type"] | "",
                )
              }
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              <option value="">All Types</option>
              <option value="MEDICAL_VISIT">Medical Visit</option>
              <option value="VACCINATION">Vaccination</option>
              <option value="ILLNESS">Illness</option>
            </select>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              title="From date"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              title="To date"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, hospital…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => refetch()}
              className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex-1 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-700" />
              <span className="text-sm text-gray-500">
                Loading health records…
              </span>
            </div>
          )}

          {isError && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <p className="text-sm text-red-500">
                Failed to load health records.
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-emerald-900 text-white text-sm rounded-lg hover:bg-emerald-800"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
                <div className="shrink-0 border-b">
                  <Table className="table-fixed w-full">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[210px]">Child</TableHead>
                        <TableHead className="w-[110px]">Visit Date</TableHead>
                        <TableHead className="w-[120px]">Type</TableHead>
                        <TableHead className="w-[160px]">Hospital</TableHead>
                        <TableHead className="w-[175px]">Diagnosis</TableHead>
                        <TableHead className="w-[175px]">Treatment</TableHead>
                        <TableHead className="w-[110px]">Cost</TableHead>
                        <TableHead className="w-[56px]" />
                      </TableRow>
                    </TableHeader>
                  </Table>
                </div>

                <div className="overflow-y-auto flex-1">
                  <Table className="table-fixed w-full">
                    <TableBody>
                      {paginated.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-16 text-sm text-gray-400"
                          >
                            No health records found matching your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginated.map((record) => {
                          // Join child data by UUID
                          const child = childMap[record.child];

                          return (
                            <TableRow key={record.id}>
                              {/* Child */}
                              <TableCell className="w-[210px]">
                                <div className="flex items-center gap-2 min-w-0">
                                  <Avatar
                                    src={child?.profile_image}
                                    name={record.child_name}
                                  />
                                  <div className="min-w-0">
                                    <Truncated
                                      text={record.child_name}
                                      className="text-sm font-medium text-gray-900 max-w-[145px]"
                                    />
                                    {child?.age != null && (
                                      <span className="text-xs text-gray-400">
                                        Age {child.age}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </TableCell>

                              {/* Visit date */}
                              <TableCell className="w-[110px] text-sm text-gray-700 whitespace-nowrap">
                                {formatDate(record.visit_date)}
                              </TableCell>

                              {/* Record type badge */}
                              <TableCell className="w-[120px]">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${RECORD_TYPE_COLORS[record.record_type]}`}
                                >
                                  {RECORD_TYPE_LABELS[record.record_type]}
                                </span>
                              </TableCell>

                              {/* Hospital */}
                              <TableCell className="w-[160px]">
                                <Truncated
                                  text={record.hospital_name}
                                  className="text-sm text-gray-700 max-w-[148px]"
                                />
                              </TableCell>

                              {/* Diagnosis */}
                              <TableCell className="w-[175px]">
                                <Truncated
                                  text={record.diagnosis}
                                  className="text-sm text-gray-700 max-w-[163px]"
                                />
                              </TableCell>

                              {/* Treatment */}
                              <TableCell className="w-[175px]">
                                <Truncated
                                  text={record.treatment}
                                  className="text-sm text-gray-700 max-w-[163px]"
                                />
                              </TableCell>

                              {/* Cost */}
                              <TableCell className="w-[110px] text-sm text-gray-700 whitespace-nowrap">
                                {record.cost_formatted || "—"}
                              </TableCell>

                              {/* Action */}
                              <TableCell className="w-[56px]">
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                  <ChevronRight className="w-4 h-4 text-gray-500" />
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
                {paginated.length === 0 && (
                  <p className="text-center text-sm text-gray-400 pt-10">
                    No health records found.
                  </p>
                )}
                {paginated.map((record) => {
                  const child = childMap[record.child];

                  return (
                    <div
                      key={record.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar
                          src={child?.profile_image}
                          name={record.child_name}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {record.child_name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {formatDate(record.visit_date)}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${RECORD_TYPE_COLORS[record.record_type]}`}
                        >
                          {RECORD_TYPE_LABELS[record.record_type]}
                        </span>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg shrink-0">
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { label: "Hospital", value: record.hospital_name },
                          { label: "Diagnosis", value: record.diagnosis },
                          { label: "Treatment", value: record.treatment },
                          { label: "Cost", value: record.cost_formatted },
                        ].map(({ label, value }) => (
                          <div key={label} className="min-w-0">
                            <span className="text-gray-500">{label}: </span>
                            <span
                              className="text-gray-900 truncate block"
                              title={value ?? "—"}
                            >
                              {value || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {filtered.length > PAGE_SIZE && (
                <div className="border-t px-6 py-3 flex items-center justify-between shrink-0">
                  <p className="text-sm text-gray-500">
                    Page {page} of {totalPages} &middot; {filtered.length}{" "}
                    records
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => p - 1)}
                      disabled={!hasPrev}
                      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={!hasNext}
                      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
