import { useState } from "react";
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
  Eye,
  Download,
  TrendingUp,
} from "lucide-react";
import caretaker1 from "@/assets/testimonial_2_img.png";
import type { Child } from "./DashboardView";

// Types
interface HealthRecord {
  id: string;
  visitDate: string;
  hospital: string;
  doctor: string;
  complaint: string;
  medicines: string;
}

interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  status: string;
}

type ActiveTab = "overview" | "personal" | "health" | "education" | "finance" | "progress";

interface ChildDetailViewProps {
  child: Child;
  onBack: () => void;
}

export default function ChildDetailView({ child, onBack }: ChildDetailViewProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Health records data
  const healthRecords: HealthRecord[] = [
    {
      id: "1",
      visitDate: "Feb 02, 2026",
      hospital: "Kigali Clinic",
      doctor: "MUTABAZI Abel",
      complaint: "General Wellness",
      medicines: "Multivitamins",
    },
    {
      id: "2",
      visitDate: "Dec 15, 2025",
      hospital: "University Hospital",
      doctor: "KALINDA Joel",
      complaint: "Flu & Fever",
      medicines: "Paracetamol, Vitamin C",
    },
  ];

  // Transaction history data
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
                src={child.avatar}
                alt={child.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">{child.name}</h2>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    Special Care
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {child.age} Years Old • Male
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> Caretaker: Mama Beatrice
                  </span>
                </div>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Active
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

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Health & Education Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-emerald-900" />
                      </div>
                      <span className="font-medium">Health Status</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">Stable</div>
                    <p className="text-sm text-gray-600">Last checkup: Feb 3, 2026</p>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium">Education</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">Enrolled</div>
                    <p className="text-sm text-gray-600">Primary Level 2</p>
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
                        date: "May 12, 2024",
                        color: "bg-black",
                      },
                      {
                        title: "Assigned to Mama Beatrice",
                        desc: "Initial housing placement",
                        date: "June 05, 2024",
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
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          {index < 3 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Current Care Team */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-6">Current Care Team</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={caretaker1}
                    alt="Caretaker"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">Mama Beatrice</h4>
                    <p className="text-sm text-gray-600">Primary House Mother</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat nec
                    leo gravida convallis. Sed malesuada placerat tortor at placerat. Integer
                    semper nulla ac blandit sollicitudin. Praesentium condimentum ultricies eros at
                    ultricies purus aliquam ac."
                  </p>
                </div>
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
                  <p className="font-medium mt-1">Samuel Kwizera</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Date of Admission</label>
                  <p className="font-medium mt-1">2024-05-12</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Gender</label>
                  <p className="font-medium mt-1">Male</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <p className="font-medium mt-1">8 Years</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Care Type</label>
                  <p className="font-medium mt-1">Full-time Residential</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Reason for Care</label>
                  <p className="font-medium mt-1">Orphaned</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Guardian / Relative</label>
                  <p className="font-medium mt-1">Mariya Mukamunga (Aunt)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Guardian Contact</label>
                  <p className="font-medium mt-1">+250 788 123 456</p>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-sm text-gray-600">Background Information</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat nec
                    leo gravida convallis. Sed malesuada placerat tortor at placerat. Integer
                    semper nulla ac blandit sollicitudin. Praesent condimentum ultricies eros at
                    ultricies purus aliquam ac."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Health Records Tab */}
          {activeTab === "health" && (
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Health Intake Records</h3>
                <button className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Health Record
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 text-sm font-medium text-gray-600">Visit Date</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Hospital</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Doctor</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">
                        Complaint / Intake Reason
                      </th>
                      <th className="pb-3 text-sm font-medium text-gray-600">
                        Prescribed Medicines
                      </th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 text-sm">{record.visitDate}</td>
                        <td className="py-4 text-sm">{record.hospital}</td>
                        <td className="py-4 text-sm">{record.doctor}</td>
                        <td className="py-4 text-sm">{record.complaint}</td>
                        <td className="py-4 text-sm">{record.medicines}</td>
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
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Academic Info */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-6">Academic Info</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">School Name</label>
                    <p className="font-medium mt-1">St. Maria Primary School</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Education Level</label>
                    <p className="font-medium mt-1">Primary Level 2</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Competency Status</label>
                    <p className="font-medium mt-1 text-green-600">Excellent (96%)</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Current Progress</label>
                    <p className="font-medium mt-1">Steady Improvement in Literacy</p>
                  </div>
                </div>
              </div>

              {/* Documents & Reports */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-6">Documents & Reports</h3>
                <div className="space-y-3">
                  {[
                    { name: "Report Card - Term 3 2025.pdf" },
                    { name: "Admission Certificate.pdf" },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-emerald-500 hover:text-emerald-500 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Finance Tab */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              {/* Top Cards */}
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
                  <h4 className="text-sm text-gray-600 mb-2">Last Month Spend</h4>
                  <p className="text-3xl font-bold mb-2">85,400 RWF</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2.4% vs Previous</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border">
                  <h4 className="text-sm text-gray-600 mb-2">Insurance Status</h4>
                  <p className="text-3xl font-bold mb-2">Active</p>
                  <p className="text-sm text-gray-600">Expires: Dec 31, 2026</p>
                </div>
              </div>

              {/* Transaction History */}
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
                        <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Category</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Description</th>
                        <th className="pb-3 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 text-sm">{transaction.date}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {transaction.category}
                            </span>
                          </td>
                          <td className="py-4 text-sm">{transaction.description}</td>
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
                <h3 className="text-2xl font-semibold mb-4">Generate Child Progress Report</h3>
                <p className="text-gray-600 mb-8">
                  This tool compiles all current data including health, education, behavioral
                  notes, and finance into a single, professional PDF document ready for
                  stakeholders or authorities.
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