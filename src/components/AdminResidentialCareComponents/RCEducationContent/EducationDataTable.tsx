import { IoPersonCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SlidersHorizontal, ChevronDown, Loader2 } from "lucide-react";
import { useGetEnrollmentsQuery } from "@/store/api/enrollmentApi";

/* -------------------- Types -------------------- */

type EducationStatus = "ACTIVE" | "COMPLETED" | "DISCONTINUED";

/* -------------------- Status Badge -------------------- */

const StatusBadge: React.FC<{ status: EducationStatus }> = ({ status }) => {
  const styles: Record<EducationStatus, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    DISCONTINUED: "bg-gray-100 text-gray-600",
    COMPLETED: "bg-blue-100 text-blue-700",
  };
  const labels: Record<EducationStatus, string> = {
    ACTIVE: "Active",
    DISCONTINUED: "Inactive",
    COMPLETED: "Completed",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

/* -------------------- Filter Dropdown -------------------- */

const FilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 bg-white"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {value || label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
          >
            All
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* -------------------- Component -------------------- */

export const EducationDataTable: React.FC = () => {
  const { data, isLoading, isError } = useGetEnrollmentsQuery();

  const records = data?.results ?? [];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const allStatuses = useMemo(
    () => Array.from(new Set(records.map((r) => r.status))),
    [records],
  );

  const allLevels = useMemo(
    () => Array.from(new Set(records.map((r) => r.level).filter(Boolean))),
    [records],
  );

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const childName = r.child?.full_name ?? "";
      const institution = r.program?.institution?.name ?? "";
      const matchesSearch =
        childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || r.status === statusFilter;
      const matchesLevel = !levelFilter || r.level === levelFilter;
      return matchesSearch && matchesStatus && matchesLevel;
    });
  }, [records, searchQuery, statusFilter, levelFilter]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <FilterDropdown
            label="Level"
            options={allLevels}
            value={levelFilter}
            onChange={setLevelFilter}
          />
          <FilterDropdown
            label="Status"
            options={allStatuses}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[420px] overflow-y-auto">
        <Table className="w-full">
          <TableHeader className="bg-[#F9FAFB] sticky top-0 z-10">
            <TableRow className="border-none">
              <TableHead className="px-6 font-medium text-[#838484] text-sm">
                Child Name
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Institution
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Program
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Level
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Start Date
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                End Date
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Cost
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Status
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading enrollments...
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-10 text-sm text-red-500"
                >
                  Failed to load enrollments.
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-10 text-sm text-gray-400"
                >
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((record) => (
                <TableRow
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* Child Name */}
                  <TableCell className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        {record.child?.profile_image ? (
                          <AvatarImage src={record.child.profile_image} />
                        ) : (
                          <AvatarFallback className="bg-teal-100">
                            <IoPersonCircleOutline
                              size={28}
                              className="text-teal-600"
                            />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm font-medium text-gray-800">
                        {record.child?.full_name ?? "—"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-700">
                    {record.program?.institution?.name ?? "—"}
                  </TableCell>

                  <TableCell className="text-sm text-gray-700">
                    {record.program?.program_name ?? "—"}
                  </TableCell>

                  <TableCell className="text-sm text-gray-700">
                    {record.level ?? "—"}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {record.start_date}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {record.end_date}
                  </TableCell>

                  <TableCell className="text-sm text-gray-700">
                    {record.cost}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>

                  <TableCell>
                    <button className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                      <MdKeyboardArrowRight size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Result count */}
      <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {filtered.length} of {records.length} records
      </div>
    </div>
  );
};

export default EducationDataTable;
