import { useState } from "react";
import { Search, SlidersHorizontal, Download, ChevronRight, UserPlus } from "lucide-react";
import kid1 from "@/assets/kid.jpg";
import kid2 from "@/assets/kid2.jpg";
import kid3 from "@/assets/kid3.jpg";
import kid4 from "@/assets/kid4.jpg";
import kid5 from "@/assets/kid4.jpg";

export interface HealthRecord {
  id: string;
  childName: string;
  avatar: string;
  visitDate: string;
  hospital: string;
  doctor: string;
  complaint: string;
  medicines: string;
}

interface HealthRecordsViewProps {
  onRegisterClick: () => void;
}

export default function HealthRecordsView({ onRegisterClick }: HealthRecordsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const healthRecords: HealthRecord[] = [
    {
      id: "1",
      childName: "Samuel Kwizera",
      avatar: kid1,
      visitDate: "Feb 02, 2026",
      hospital: "Kigali Clinic",
      doctor: "MUTABAZI Abel",
      complaint: "General Wellness",
      medicines: "Multivitamins",
    },
    {
      id: "2",
      childName: "Aisha Kamali",
      avatar: kid2,
      visitDate: "Dec 15, 2025",
      hospital: "University Hospital",
      doctor: "KALINDA Joel",
      complaint: "Flu & Fever",
      medicines: "Paracetamol, Vitamin C",
    },
    {
      id: "3",
      childName: "David Mugisha",
      avatar: kid3,
      visitDate: "Jan 10, 2026",
      hospital: "Kigali Clinic",
      doctor: "MUTABAZI Abel",
      complaint: "Stomach Ache",
      medicines: "Antacid, ORS",
    },
    {
      id: "4",
      childName: "Umugwaneza Aline",
      avatar: kid4,
      visitDate: "Jan 22, 2026",
      hospital: "King Faisal Hospital",
      doctor: "NKUSI Patrick",
      complaint: "Eye Infection",
      medicines: "Eye Drops, Antibiotic",
    },
    {
      id: "5",
      childName: "Kayitesi Pascoline",
      avatar: kid5,
      visitDate: "Feb 01, 2026",
      hospital: "University Hospital",
      doctor: "KALINDA Joel",
      complaint: "Malaria",
      medicines: "Coartem, Paracetamol",
    },
    {
      id: "6",
      childName: "Mutize Aline",
      avatar: kid1,
      visitDate: "Nov 30, 2025",
      hospital: "Kigali Clinic",
      doctor: "UWASE Marie",
      complaint: "Skin Rash",
      medicines: "Antihistamine Cream",
    },
    {
      id: "7",
      childName: "Meza Joyce",
      avatar: kid2,
      visitDate: "Dec 05, 2025",
      hospital: "King Faisal Hospital",
      doctor: "NKUSI Patrick",
      complaint: "Leg Pain",
      medicines: "Ibuprofen, Calcium",
    },
    {
      id: "8",
      childName: "Hirwa Prince",
      avatar: kid3,
      visitDate: "Jan 15, 2026",
      hospital: "University Hospital",
      doctor: "KALINDA Joel",
      complaint: "Cold & Cough",
      medicines: "Cough Syrup, Vitamin C",
    },
    {
      id: "9",
      childName: "Muhire Eric",
      avatar: kid4,
      visitDate: "Feb 03, 2026",
      hospital: "Kigali Clinic",
      doctor: "MUTABAZI Abel",
      complaint: "Eye Check",
      medicines: "Eye Drops",
    },
  ];

  const filteredRecords = healthRecords.filter((record) =>
    record.childName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Health Records</h1>
            <p className="text-sm text-gray-600">
              Monitor health intake screenings and medical history for all children.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button
              onClick={onRegisterClick}
              className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              Register Health Visit
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex justify-end gap-3 mb-4 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b shrink-0">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child Names
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visit Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complaint / Intake Reason
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prescribed Medicines
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
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={record.avatar}
                            alt={record.childName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {record.childName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">{record.visitDate}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{record.hospital}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{record.doctor}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{record.complaint}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">{record.medicines}</td>
                      <td className="px-6 py-3">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronRight className="w-4 h-4 text-gray-500" />
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
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={record.avatar}
                    alt={record.childName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{record.childName}</h3>
                    <p className="text-xs text-gray-500">{record.visitDate}</p>
                  </div>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Hospital:</span>
                    <span className="ml-1 text-gray-900">{record.hospital}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Doctor:</span>
                    <span className="ml-1 text-gray-900">{record.doctor}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Complaint:</span>
                    <span className="ml-1 text-gray-900">{record.complaint}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Medicines:</span>
                    <span className="ml-1 text-gray-900">{record.medicines}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredRecords.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-sm">No health records found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}