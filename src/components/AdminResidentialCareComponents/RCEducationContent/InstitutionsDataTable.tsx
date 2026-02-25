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
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

/* -------------------- Types -------------------- */

export interface Institution {
  id: number;
  name: string;
  email: string;
  phone: string;
  programs: string[];
  address: string;
}

/* -------------------- Data -------------------- */

const institutions: Institution[] = [
  {
    id: 1,
    name: "APADE",
    email: "apade@education.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 2,
    name: "Lycee de Nyaza",
    email: "lyceenyanza@gmail.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 3,
    name: "Remera High School",
    email: "remerahs@gmail.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 4,
    name: "Gikondo High School",
    email: "gikondohs@gmail.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 5,
    name: "St Joseph",
    email: "stjoseph@gmail.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 6,
    name: "Muhima High School",
    email: "muhimahs@gmail.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 7,
    name: "Lycee de Kicukiro",
    email: "lyceekicukiro@gmail.com",
    phone: "0789773293",
    programs: ["MCB", "PCB", "Networking"],
    address: "Kigali, Gasabo",
  },
  {
    id: 8,
    name: "AUCA",
    email: "auca.un@edu.com",
    phone: "0789773293",
    programs: ["SE", "Networking"],
    address: "Kigali, Gasabo",
  },
];

/* -------------------- Programs Cell -------------------- */

const ProgramsCell: React.FC<{ programs: string[] }> = ({ programs }) => {
  const MAX_VISIBLE = 2;
  const visible = programs.slice(0, MAX_VISIBLE);
  const remaining = programs.length - MAX_VISIBLE;

  return (
    <span className="text-sm text-gray-600">
      {visible.join(", ")}
      {remaining > 0 && (
        <span className="text-gray-400">, {remaining} more..</span>
      )}
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

export const InstitutionsDataTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");

  const allAddresses = Array.from(new Set(institutions.map((r) => r.address)));
  const allPrograms = Array.from(
    new Set(institutions.flatMap((r) => r.programs)),
  );

  const filtered = useMemo(() => {
    return institutions.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAddress = !addressFilter || r.address === addressFilter;
      const matchesProgram =
        !programFilter || r.programs.includes(programFilter);
      return matchesSearch && matchesAddress && matchesProgram;
    });
  }, [searchQuery, addressFilter, programFilter]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <FilterDropdown
            label="Program"
            options={allPrograms}
            value={programFilter}
            onChange={setProgramFilter}
          />
          <FilterDropdown
            label="Address"
            options={allAddresses}
            value={addressFilter}
            onChange={setAddressFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[420px] overflow-y-auto">
        <Table className="w-full">
          <TableHeader className="bg-[#F9FAFB] sticky top-0 z-10">
            <TableRow className="border-none">
              <TableHead className="px-6 font-medium text-[#838484] text-sm">
                Institution Names
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Email
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Phone
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Programs
              </TableHead>
              <TableHead className="font-medium text-[#838484] text-sm">
                Address
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-sm text-gray-400"
                >
                  No institutions found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((record) => (
                <TableRow
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* Institution Name */}
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">
                    {record.name}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-sm text-gray-500">
                    {record.email}
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="text-sm text-gray-600">
                    {record.phone}
                  </TableCell>

                  {/* Programs */}
                  <TableCell>
                    <ProgramsCell programs={record.programs} />
                  </TableCell>

                  {/* Address */}
                  <TableCell className="text-sm text-gray-600">
                    {record.address}
                  </TableCell>

                  {/* Arrow */}
                  <TableCell>
                    <button
                      onClick={() => {}}
                      className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    >
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
        Showing {filtered.length} of {institutions.length} institutions
      </div>
    </div>
  );
};

export default InstitutionsDataTable;
