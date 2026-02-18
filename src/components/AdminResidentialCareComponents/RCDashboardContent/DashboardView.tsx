import { Plus, ChevronRight, Eye, Trash2 } from "lucide-react";
import { FaUserPlus } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserMinus } from "react-icons/fa6";
import { LuBookOpenCheck } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import kid1 from "@/assets/kid.jpg";
import kid2 from "@/assets/kid2.jpg";
import kid3 from "@/assets/kid4.jpg";
import kid4 from "@/assets/kid3.jpg";
import kid5 from "@/assets/kid4.jpg";

// Types
interface Child {
  id: string;
  name: string;
  age: number;
  dateRegistered: string;
  careStatus: string;
  caretaker: string;
  avatar: string;
}

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

export default function DashboardView({
  onRegisterClick,
  onViewChild,
  onDeleteChild,
}: DashboardViewProps) {
  // Stats data
  const statsCards = [
    {
      id: 1,
      title: "Children in Care",
      icon: FaPeopleGroup ,
      content: "13",
      footer: "+2",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 2,
      title: "New Admissions",
      icon: FaUserPlus,
      content: "30",
      footer: "+5",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 3,
      title: "Released",
      icon: FaUserMinus,
      content: "10",
      footer: "+1",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 4,
      title: "Health Attention",
      icon: LuBookOpenCheck,
      content: "3",
      footer: "+1",
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
  ];

  // Children data
  const children: Child[] = [
    {
      id: "1",
      name: "Samuel Kwizera",
      age: 8,
      dateRegistered: "Feb 5, 2020",
      careStatus: "Active",
      caretaker: "Mama Beatrice",
      avatar: kid1,
    },
    {
      id: "2",
      name: "Aisha Kamali",
      age: 12,
      dateRegistered: "Sep 8, 2020",
      careStatus: "Active",
      caretaker: "Uncle Joseph",
      avatar: kid2,
    },
    {
      id: "3",
      name: "Alicia Kamali",
      age: 12,
      dateRegistered: "Sep 8, 2020",
      careStatus: "Active",
      caretaker: "Uncle Joseph",
      avatar: kid3,
    },
    {
      id: "4",
      name: "Alisha Kamali",
      age: 12,
      dateRegistered: "Sep 8, 2020",
      careStatus: "Active",
      caretaker: "Uncle Joseph",
      avatar: kid4,
    },
    {
      id: "5",
      name: "David Mugisha",
      age: 6,
      dateRegistered: "Sep 8, 2020",
      careStatus: "Active",
      caretaker: "Mama Beatrice",
      avatar: kid5,
    },
  ];

  // Recent activity data
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
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bgColor}`}
                  >
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                </div>

                {/* Main number */}
                <p className="text-3xl font-bold mb-2">{item.content}</p>

                {/* Footer */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">{item.footer}</span>
                  <span className="text-gray-500">from last month</span>
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
          {/* Children Overview - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Children Overview</h2>
                <button className="text-sm text-emerald-900 hover:text-emerald-700 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 text-sm font-medium text-gray-600">Child</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Age</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Care Status</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Caretaker</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map((child) => (
                      <tr key={child.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={child.avatar}
                              alt={child.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium text-sm">{child.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm">{child.age} yrs</td>
                        <td className="py-4 text-sm">{child.dateRegistered}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-white-100 text-emerald-900 rounded-full text-xs font-medium">
                            {child.careStatus}
                          </span>
                        </td>
                        <td className="py-4 text-sm">{child.caretaker}</td>
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
                  { label: "Health", amount: "450,000 RWF" },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                    <p className="text-xl font-bold text-emerald-900">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-2 h-2 bg-emerald-900 rounded-full mt-2 shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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

// Export the Child type for use in other components
export type { Child };