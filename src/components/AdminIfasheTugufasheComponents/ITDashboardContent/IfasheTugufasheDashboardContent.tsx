import { Users, UserPlus, Award, GraduationCap, Baby, Heart } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";

interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

export default function IfasheTugufasheDashboardContent() {
  const statsCards = [
    {
      id: 1,
      title: "Total Families Registered",
      content: "12",
      footer: "+2.5%",
      icon: Users,
      bgColor: "bg-white-400",
      iconColor: "text-emerald-900",
    },
    {
      id: 2,
      title: "Total Children Supported",
      content: "30",
      footer: "+5.3%",
      icon: Baby,
      bgColor: "bg-white-400",
      iconColor: "text-emerald-900",
    },
    {
      id: 3,
      title: "Active Sponsorship",
      content: "5",
      footer: "+1.2%",
      icon: Award,
      bgColor: "bg-white-400",
      iconColor: "text-emerald-900",
    },
    {
      id: 4,
      title: "Children Currently in School",
      content: "20",
      footer: "+3.8%",
      icon: GraduationCap,
      bgColor: "bg-white-400",
      iconColor: "text-emerald-900",
    },
  ];

  const quickActions = [
    {
      id: 1,
      label: "Register New Family",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      label: "Add a Child",
      icon: UserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      label: "Assign Sponsorship",
      icon: Heart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: "1",
      description: "New family registered: Bizimana Joseph",
      timestamp: "1/20/2026, 9:45:11 AM",
    },
    {
      id: "2",
      description: "New child registered: Bizimana Grace",
      timestamp: "1/20/2026, 9:34:11 AM",
    },
    {
      id: "3",
      description: "School support payment recorded",
      timestamp: "1/19/2026, 3:20:00 PM",
    },
    {
      id: "4",
      description: "New sponsorship assigned to Family Mukiza",
      timestamp: "1/18/2026, 11:15:00 AM",
    },
    {
      id: "5",
      description: "Medical checkup completed for 5 children",
      timestamp: "1/17/2026, 2:30:00 PM",
    },
  ];

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="shrink-0 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-600">
            Welcome to the ifashe Tugufashe Program Management System
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto space-y-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <span className="text-gray-500">from last month</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <FaArrowTrendUp className="w-3 h-3 text-emerald-900" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 ${action.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${action.iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-900 rounded-full mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.timestamp}</p>
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