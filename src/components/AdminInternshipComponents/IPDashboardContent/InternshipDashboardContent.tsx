import { FileText, CheckCircle, XCircle } from "lucide-react";
import { FaPeopleGroup } from "react-icons/fa6";

interface Activity {
  id: string;
  applicant: string;
  activity: string;
  dateTime: string;
  user: string;
}

export default function InternshipDashboardContent() {
  const statsCards = [
    {
      id: 1,
      title: "Total Applications",
      value: "12",
      icon: FaPeopleGroup,
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 2,
      title: "Under Review",
      value: "1",
      icon: FileText,
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 3,
      title: "Approved Internships",
      value: "2",
      icon: CheckCircle,
      bgColor: "bg-white-100",
      iconColor: "text-emerald-900",
    },
    {
      id: 4,
      title: "Rejected Applications",
      value: "20",
      icon: XCircle,
      bgColor: "bg-emerald-900",
      iconColor: "text-white",
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: "1",
      applicant: "Raj Patel",
      activity: "Application submitted",
      dateTime: "Feb 9, 11:15 PM",
      user: "Raj Patel",
    },
    {
      id: "2",
      applicant: "Sophie Dubois",
      activity: "Requested additional documentation",
      dateTime: "Feb 5, 04:20 AM",
      user: "Admin",
    },
    {
      id: "3",
      applicant: "Sophie Dubois",
      activity: "Application submitted",
      dateTime: "Feb 1, 01:30 AM",
      user: "Sophie Dubois",
    },
    {
      id: "4",
      applicant: "Ahmed Hassan",
      activity: "Application moved to Under Review",
      dateTime: "Jan 29, 02:15 AM",
      user: "Admin",
    },
    {
      id: "5",
      applicant: "Yuki Tanaka",
      activity: "Application rejected - Insufficient experience",
      dateTime: "Jan 25, 06:45 AM",
      user: "Admin",
    },
    {
      id: "6",
      applicant: "Carlos Rodriguez",
      activity: "Application approved",
      dateTime: "Jan 23, 12:30 AM",
      user: "Admin",
    },
    {
      id: "7",
      applicant: "Maria Santos",
      activity: "Application approved",
      dateTime: "Jan 20, 01:30 AM",
      user: "Admin",
    },
  ];

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="shrink-0 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-600">Welcome to the Internship Program</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 shrink-0">
          {statsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-xs text-gray-500 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`w-10 h-10 ${card.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-4 border-b shrink-0">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b shrink-0">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{activity.applicant}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{activity.activity}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{activity.dateTime}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{activity.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{activity.applicant}</h3>
                  <span className="text-xs text-gray-400">{activity.dateTime}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.activity}</p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">By:</span> {activity.user}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}