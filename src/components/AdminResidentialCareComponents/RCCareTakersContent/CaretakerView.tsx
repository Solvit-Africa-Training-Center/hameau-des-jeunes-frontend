import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  Phone,
  Mail,
  UserPlus,
  Eye,
} from "lucide-react";
import { useGetCaretakersQuery } from "@/store/api/caretakersApi";
import type { Caretaker } from "@/store/api/caretakersApi";
import kid1 from "@/assets/kid.jpg";
import kid2 from "@/assets/kid2.jpg";
import kid3 from "@/assets/kid3.jpg";
import kid4 from "@/assets/kid4.jpg";

export type { Caretaker };

export interface AssignedChild {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
}

// Placeholder assigned children until the assign API is ready
const placeholderChildren: AssignedChild[] = [
  { id: "1", name: "Samuel Kwizera", avatar: kid1, age: 8, gender: "Male" },
  { id: "2", name: "Aisha Kamali", avatar: kid2, age: 10, gender: "Female" },
  { id: "3", name: "David Mugisha", avatar: kid3, age: 13, gender: "Male" },
  { id: "4", name: "Umugwaneza Aline", avatar: kid4, age: 9, gender: "Female" },
];

interface CaretakerViewProps {
  onAddCaretaker: () => void;
  onProfile: (caretaker: Caretaker) => void;
  onAssign: (caretaker: Caretaker) => void;
}

export default function CaretakerView({
  onAddCaretaker,
  onProfile,
  onAssign,
}: CaretakerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: caretakers = [], isLoading, isError } = useGetCaretakersQuery();

  const filteredCaretakers = caretakers.filter((c) =>
    `${c.first_name} ${c.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Caretaker Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage staff and coordinate household assignments.
            </p>
          </div>
          <button
            onClick={onAddCaretaker}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Add Caretaker
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex justify-end gap-3 mb-4 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Total Staff Card */}
        <div className="shrink-0 mb-5">
          <div className="bg-emerald-900 text-white rounded-xl px-6 py-4 w-48 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Staff</p>
              <p className="text-3xl font-bold mt-0.5">
                {isLoading ? "—" : filteredCaretakers.length}
              </p>
            </div>
            <Users className="w-8 h-8 opacity-60" />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
            Loading caretakers...
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex-1 flex items-center justify-center text-sm text-red-500">
            Failed to load caretakers. Please try again.
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredCaretakers.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
            No caretakers found.
          </div>
        )}

        {/* Caretaker Cards Grid */}
        {!isLoading && !isError && filteredCaretakers.length > 0 && (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
              {filteredCaretakers.map((caretaker) => (
                <div
                  key={caretaker.id}
                  className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4"
                >
                  {/* Avatar + Name */}
                  <div className="flex flex-col items-start gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${caretaker.first_name}`}
                      alt={caretaker.full_name}
                      className="w-14 h-14 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {caretaker.full_name}
                      </h3>
                      <p className="text-sm text-blue-500 capitalize">
                        {caretaker.role.replace(/_/g, " ")}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{caretaker.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{caretaker.email}</span>
                    </div>
                  </div>

                  {/* Assigned Children */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Assigned Children ({placeholderChildren.length})
                    </p>
                    <div className="flex items-center gap-1">
                      {placeholderChildren.slice(0, 4).map((child) => (
                        <img
                          key={child.id}
                          src={child.avatar}
                          alt={child.name}
                          className="w-7 h-7 rounded-full object-cover border-2 border-white -ml-1 first:ml-0"
                          title={child.name}
                        />
                      ))}
                      {placeholderChildren.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white -ml-1 flex items-center justify-center">
                          <span className="text-xs text-gray-600 font-medium">
                            +{placeholderChildren.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex border-t pt-3 gap-2">
                    <button
                      onClick={() => onProfile(caretaker)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-emerald-900 transition-colors py-1"
                    >
                      <Eye className="w-4 h-4" />
                      Profile
                    </button>
                    <div className="w-px bg-gray-200" />
                    <button
                      onClick={() => onAssign(caretaker)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-emerald-900 transition-colors py-1"
                    >
                      <UserPlus className="w-4 h-4" />
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
