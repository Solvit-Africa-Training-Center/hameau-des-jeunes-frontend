import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";

export interface SchoolPayment {
  id: string;
  childName: string;
  school: string;
  amountPaid: string;
  materials: string;
  paymentDate: string;
  // Full data for the form
  childId: string;
  schoolFeesPaid: string;
  learningMaterialsProvided: string;
}

interface IfasheTugufasheSchoolSupportViewProps {
  onAddPayment: () => void;
}

export default function IfasheTugufasheSchoolSupportView({
  onAddPayment,
}: IfasheTugufasheSchoolSupportViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const overdueChildren = [
    "Uwase Sarah - Remera Nursery School",
    "Niyonzima Desire - Nyamirambo Primary School",
    "Niyonzima Junior - Nyamirambo Primary School",
    "Ndabane Faith - Gikondo Primary School",
    "Mukamuzi Stella - Kimironko Primary School",
    "...and 8 more",
  ];

  const payments: SchoolPayment[] = [
    {
      id: "1",
      childName: "Ishimwe Marie",
      school: "Remera Primary School",
      amountPaid: "45,000 RWF",
      materials: "Books, Uniform",
      paymentDate: "1/28/2026",
      childId: "Ishimwe Marie",
      schoolFeesPaid: "45000",
      learningMaterialsProvided: "Books, Uniform",
    },
    {
      id: "2",
      childName: "Mugisha Eric",
      school: "Remera Primary School",
      amountPaid: "40,000 RWF",
      materials: "Books, Stationery",
      paymentDate: "1/29/2026",
      childId: "Mugisha Eric",
      schoolFeesPaid: "40000",
      learningMaterialsProvided: "Books, Stationery",
    },
    {
      id: "3",
      childName: "Niyonzima Desire",
      school: "Nyamirambo Secondary School",
      amountPaid: "80,000 RWF",
      materials: "Uniform, Books, Calculator",
      paymentDate: "1/26/2026",
      childId: "Niyonzima Desire",
      schoolFeesPaid: "80000",
      learningMaterialsProvided: "Uniform, Books, Calculator",
    },
    {
      id: "4",
      childName: "Niyonzima Peace",
      school: "Nyamirambo Primary School",
      amountPaid: "45,000 RWF",
      materials: "Books",
      paymentDate: "1/24/2026",
      childId: "Niyonzima Peace",
      schoolFeesPaid: "45000",
      learningMaterialsProvided: "Books",
    },
    {
      id: "5",
      childName: "Umutoni Ange",
      school: "Gikondo Primary School",
      amountPaid: "42,000 RWF",
      materials: "Books, Stationery",
      paymentDate: "1/19/2026",
      childId: "Umutoni Ange",
      schoolFeesPaid: "42000",
      learningMaterialsProvided: "Books, Stationery",
    },
    {
      id: "6",
      childName: "Habimana Kevin",
      school: "Kimironko Secondary School",
      amountPaid: "75,000 RWF",
      materials: "Uniform, Books",
      paymentDate: "1/14/2026",
      childId: "Habimana Kevin",
      schoolFeesPaid: "75000",
      learningMaterialsProvided: "Uniform, Books",
    },
  ];

  const filteredPayments = payments.filter(
    (payment) =>
      payment.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">School Support</h1>
            <p className="text-sm text-gray-600">Manage education-related assistance</p>
          </div>
          <button
            onClick={onAddPayment}
            className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Payment
          </button>
        </div>

        {/* Overdue Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-5 shrink-0">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-amber-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-amber-800 mb-1">
                13 children with overdue fee payments
              </p>
              <ul className="text-xs text-amber-700 space-y-0.5">
                {overdueChildren.map((child, index) => (
                  <li key={index}>• {child}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 shrink-0">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by child name or school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b shrink-0">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Paid
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Materials
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.childName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{payment.school}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{payment.amountPaid}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{payment.materials}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{payment.paymentDate}</td>
                      <td className="px-6 py-4">
                        <button
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden overflow-auto flex-1 p-4 space-y-3">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{payment.childName}</h3>
                    <p className="text-xs text-gray-500">{payment.school}</p>
                  </div>
                  <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-500">Amount Paid:</span>
                    <span className="ml-1 text-gray-900 font-medium">{payment.amountPaid}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Materials:</span>
                    <span className="ml-1 text-gray-900">{payment.materials}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment Date:</span>
                    <span className="ml-1 text-gray-900">{payment.paymentDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPayments.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No payments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}