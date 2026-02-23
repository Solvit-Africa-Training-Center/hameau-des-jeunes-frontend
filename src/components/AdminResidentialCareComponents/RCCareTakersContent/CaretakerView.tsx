import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  Phone,
  Mail,
  UserPlus,
  Eye,
} from "lucide-react";
import {
  useGetCaretakersQuery,
  useGetAssignmentsQuery,
} from "@/store/api/caretakersApi";
import type { Caretaker } from "@/store/api/caretakersApi";
import { useGetChildrenQuery } from "@/store/api/childrenApi";

export type { Caretaker };

interface CaretakerViewProps {
  onAddCaretaker: () => void;
  onProfile: (caretaker: Caretaker) => void;
  onAssign: (caretaker: Caretaker, allAssignedChildIds: Set<string>) => void;
}

export default function CaretakerView({
  onAddCaretaker,
  onProfile,
  onAssign,
}: CaretakerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: caretakers = [], isLoading, isError } = useGetCaretakersQuery();
  const { data: assignments = [], isLoading: assignmentsLoading } =
    useGetAssignmentsQuery();
  const { data: children = [], isLoading: childrenLoading } =
    useGetChildrenQuery();

  // child UUID → child object
  const childMap = useMemo(
    () =>
      children.reduce<Record<string, (typeof children)[0]>>((acc, c) => {
        acc[c.id] = c;
        return acc;
      }, {}),
    [children],
  );

  // caretaker_name (lowercased) → array of their active assigned child objects
  const assignmentMap = useMemo(() => {
    const map: Record<string, (typeof children)[0][]> = {};

    assignments
      .filter((a) => a.is_active)
      .forEach((a) => {
        const key = a.caretaker_name?.trim().toLowerCase();
        if (!key) return;
        if (!map[key]) map[key] = [];
        const child = childMap[String(a.child)];
        if (child) map[key].push(child);
      });

    return map;
  }, [assignments, childMap]);

  // Global set of ALL actively assigned child IDs across every caretaker
  const allAssignedChildIds = useMemo(
    () =>
      new Set(
        assignments.filter((a) => a.is_active).map((a) => String(a.child)),
      ),
    [assignments],
  );

  const filteredCaretakers = caretakers.filter((c) =>
    `${c.first_name} ${c.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const isStillLoading = isLoading || assignmentsLoading || childrenLoading;

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
                {isStillLoading ? "—" : filteredCaretakers.length}
              </p>
            </div>
            <Users className="w-8 h-8 opacity-60" />
          </div>
        </div>

        {/* Loading */}
        {isStillLoading && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
            Loading caretakers...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex-1 flex items-center justify-center text-sm text-red-500">
            Failed to load caretakers. Please try again.
          </div>
        )}

        {/* Empty */}
        {!isStillLoading && !isError && filteredCaretakers.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
            No caretakers found.
          </div>
        )}

        {/* Cards Grid */}
        {!isStillLoading && !isError && filteredCaretakers.length > 0 && (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
              {filteredCaretakers.map((caretaker) => {
                const assignedChildren =
                  assignmentMap[caretaker.full_name?.trim().toLowerCase()] ??
                  [];
                const visible = assignedChildren.slice(0, 4);
                const extra = assignedChildren.length - visible.length;

                return (
                  <div
                    key={caretaker.id}
                    className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4"
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${caretaker.first_name}`}
                        alt={caretaker.full_name}
                        className="w-12 h-12 rounded-full object-cover bg-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {caretaker.full_name}
                        </h3>
                        <p className="text-sm text-blue-500 capitalize truncate">
                          {caretaker.role.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-1.5">
                      <a
                        href={`tel:${caretaker.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-900 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{caretaker.phone}</span>
                      </a>
                      <a
                        href={`mailto:${caretaker.email}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-900 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="truncate">{caretaker.email}</span>
                      </a>
                    </div>

                    {/* Assigned Children */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        Assigned Children ({assignedChildren.length})
                      </p>

                      {assignedChildren.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">
                          No children assigned yet
                        </p>
                      ) : (
                        <div className="flex items-center">
                          {visible.map((child) => (
                            <img
                              key={child.id}
                              src={
                                child.profile_image ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`
                              }
                              alt={child.full_name}
                              title={child.full_name}
                              onError={(e) => {
                                e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`;
                              }}
                              className="w-7 h-7 rounded-full object-cover border-2 border-white -ml-1 first:ml-0"
                            />
                          ))}
                          {extra > 0 && (
                            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white -ml-1 flex items-center justify-center shrink-0">
                              <span className="text-xs text-gray-600 font-medium">
                                +{extra}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          caretaker.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            caretaker.is_active ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                        {caretaker.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex border-t pt-3 gap-2 mt-auto">
                      <button
                        onClick={() => onProfile(caretaker)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-emerald-900 transition-colors py-1"
                      >
                        <Eye className="w-4 h-4" />
                        Profile
                      </button>
                      <div className="w-px bg-gray-200" />
                      <button
                        onClick={() => onAssign(caretaker, allAssignedChildIds)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-emerald-900 transition-colors py-1"
                      >
                        <UserPlus className="w-4 h-4" />
                        Assign
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
