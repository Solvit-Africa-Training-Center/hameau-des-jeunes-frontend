import { useMemo } from "react";
import { Plus, ChevronRight, Eye, Trash2 } from "lucide-react";
import {
  FaUserPlus,
  FaPeopleGroup,
  FaUserMinus,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { LuBookOpenCheck } from "react-icons/lu";
import { useGetChildrenQuery } from "@/store/api/childrenApi";
import type { Child } from "@/store/api/childrenApi";
import { useGetHealthRecordsQuery } from "@/store/api/healthRecordsApi";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface DashboardViewProps {
  onRegisterClick: () => void;
  onViewChild: (child: Child) => void;
  onDeleteChild: (childId: string) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isCurrentMonth(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardView({
  onRegisterClick,
  onViewChild,
  onDeleteChild,
}: DashboardViewProps) {
  const { data: children, isLoading, isError } = useGetChildrenQuery();
  const { data: healthRecords } = useGetHealthRecordsQuery();

  // New admissions = children whose start_date falls in the current month
  const newAdmissionsCount = useMemo(() => {
    if (!children) return 0;
    return children.filter((c) => isCurrentMonth(c.start_date)).length;
  }, [children]);

  // Released = children with INACTIVE status whose end_date falls in the current month
  // (best proxy available without a dedicated deleted-records endpoint)
  const releasedCount = useMemo(() => {
    if (!children) return 0;
    return children.filter(
      (c) => c.status === "INACTIVE" && isCurrentMonth(c.end_date),
    ).length;
  }, [children]);

  // Total health cost = sum of all health record costs
  const totalHealthCost = useMemo(() => {
    if (!healthRecords) return "—";
    const total = healthRecords.reduce((sum, r) => {
      return sum + (parseFloat(r.cost ?? "0") || 0);
    }, 0);
    return (
      total.toLocaleString("en-RW", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + " RWF"
    );
  }, [healthRecords]);

  const statsCards = [
    {
      id: 1,
      title: "Children in Care",
      icon: FaPeopleGroup,
      content: children?.length?.toString() ?? "—",
      footer: "+2",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 2,
      title: "New Admissions",
      icon: FaUserPlus,
      content: newAdmissionsCount.toString(),
      footer: `This month`,
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 3,
      title: "Released",
      icon: FaUserMinus,
      content: releasedCount.toString(),
      footer: "This month",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 4,
      title: "Health Records",
      icon: LuBookOpenCheck,
      content: healthRecords?.length?.toString() ?? "—",
      footer: "+1",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: "1",
      title: "New Health Records",
      description: "David Mugisha - Kigali Clinic",
      time: "Today, 10:30 AM",
    },
    {
      id: "2",
      title: "New Registration",
      description: "David Mugisha - Kigali Clinic",
      time: "Yesterday",
    },
    {
      id: "3",
      title: "New Health Records",
      description: "David Mugisha - Kigali Clinic",
      time: "Today, 10:30 AM",
    },
    {
      id: "4",
      title: "New Health Records",
      description: "David Mugisha - Kigali Clinic",
      time: "Today, 10:30 AM",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Good Morning, Administrator
            </h1>
            <p className="text-sm text-gray-600">
              Here's what's happening at the center today
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="flex items-center gap-2 bg-emerald-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Register New Child
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bgColor}`}
                  >
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    {item.title}
                  </h3>
                </div>
                <p className="text-3xl font-bold mb-2">{item.content}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">
                    {item.footer}
                  </span>
                  {item.id !== 2 && item.id !== 3 && (
                    <span className="text-gray-500">from last month</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                  <FaArrowTrendUp className="w-3 h-3 text-emerald-900" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Children Overview</h2>
                <button className="text-sm text-emerald-900 hover:text-emerald-700 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {isLoading && (
                <div className="py-12 text-center text-sm text-gray-500">
                  Loading children...
                </div>
              )}

              {isError && (
                <div className="py-12 text-center text-sm text-red-500">
                  Failed to load children. Please try again.
                </div>
              )}

              {!isLoading && !isError && children?.length === 0 && (
                <div className="py-12 text-center text-sm text-gray-400">
                  No children registered yet.
                </div>
              )}

              {!isLoading && !isError && children && children.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Child
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Age
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Date
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Care Status
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Guardian
                        </th>
                        <th className="pb-3 text-sm font-medium text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {children.map((child) => (
                        <tr
                          key={child.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  child.profile_image ||
                                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.first_name}`
                                }
                                alt={child.full_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <span className="font-medium text-sm">
                                {child.full_name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-sm">{child.age} yrs</td>
                          <td className="py-4 text-sm">{child.start_date}</td>
                          <td className="py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                child.status === "ACTIVE"
                                  ? "bg-green-100 text-emerald-900"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {child.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm">
                            {child.vigilant_contact_name}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onViewChild(child)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => onDeleteChild(child.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Financial Snapshot */}
            <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Financial Snapshot</h2>
                <button className="text-sm text-emerald-900 hover:text-emerald-700 font-medium flex items-center gap-1">
                  Advanced Report
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Food Costs", amount: "450,000 RWF" },
                  { label: "Clothes", amount: "450,000 RWF" },
                  { label: "Health", amount: totalHealthCost },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                    <p className="text-xl font-bold text-emerald-900">
                      {item.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-2 h-2 bg-emerald-900 rounded-full mt-2 shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { Child };
