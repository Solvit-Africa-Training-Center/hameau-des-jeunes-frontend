import { useState } from "react";
import { Search, SlidersHorizontal, Eye, Pencil, UserMinus } from "lucide-react";
import { FaUserPlus } from "react-icons/fa6";
import kid1 from "@/assets/kid.jpg";
import kid2 from "@/assets/kid2.jpg";
import kid3 from "@/assets/kid4.jpg";
import kid4 from "@/assets/kid3.jpg";
import kid5 from "@/assets/kid4.jpg";

// Extended Child type with new fields
export interface ChildRegistry {
  id: string;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  registeredDate: string;
  disability: string;
  parents: number;
  education: string;
  healthStatus: string;
  avatar: string;
  caretaker: string;
  careStatus: string;
}

interface ChildrenRegistryViewProps {
  onRegisterClick: () => void;
  onViewChild: (child: ChildRegistry) => void;
}

export default function ChildrenRegistryView({onRegisterClick, onViewChild,}: ChildrenRegistryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Expanded children data
  const children: ChildRegistry[] = [
    {
      id: "1",
      name: "Samuel Kwizera",
      age: 8,
      gender: "Male",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 0,
      education: "No",
      healthStatus: "Special Care",
      avatar: kid1,
      caretaker: "Mama Beatrice",
      careStatus: "Active",
    },
    {
      id: "2",
      name: "Aisha Kamali",
      age: 10,
      gender: "Male",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 2,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid2,
      caretaker: "Uncle Joseph",
      careStatus: "Active",
    },
    {
      id: "3",
      name: "David Mugisha",
      age: 13,
      gender: "Male",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 1,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid3,
      caretaker: "Mama Beatrice",
      careStatus: "Active",
    },
    {
      id: "4",
      name: "Umugwaneza Aline",
      age: 10,
      gender: "Female",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 1,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid4,
      caretaker: "Mama Grace",
      careStatus: "Active",
    },
    {
      id: "5",
      name: "Kayitesi Pascoline",
      age: 8,
      gender: "Female",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 0,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid5,
      caretaker: "Mama Sarah",
      careStatus: "Active",
    },
    {
      id: "6",
      name: "Mutize Aline",
      age: 4,
      gender: "Male",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 1,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid1,
      caretaker: "Mama Beatrice",
      careStatus: "Active",
    },
    {
      id: "7",
      name: "Meza Joyce",
      age: 9,
      gender: "Female",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "Legs",
      parents: 0,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid2,
      caretaker: "Mama Grace",
      careStatus: "Active",
    },
    {
      id: "8",
      name: "Hirwa Prince",
      age: 7,
      gender: "Male",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "No",
      parents: 0,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid3,
      caretaker: "Uncle Joseph",
      careStatus: "Active",
    },
    {
      id: "9",
      name: "Muhire Eric",
      age: 11,
      gender: "Male",
      dateOfBirth: "Feb 5, 2020",
      registeredDate: "Feb 5, 2020",
      disability: "Blind",
      parents: 0,
      education: "No",
      healthStatus: "Healthy",
      avatar: kid4,
      caretaker: "Mama Beatrice",
      careStatus: "Active",
    },
  ];

  // Filter children based on search query
  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHealthStatusColor = (status: string) => {
    if (status === "Special Care") return "text-amber-600";
    return "text-green-600";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Children Registry
            </h1>
            <p className="text-sm text-gray-600">
              Manage all children currently in care or previously released.
            </p>
          </div>
          <button onClick={onRegisterClick} className="flex items-center gap-2 bg-emerald-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap">
            <FaUserPlus className="w-5 h-5"/>
            Register New Child
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex justify-end gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Children Overview Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Children Overview</h2>
              <button className="text-sm text-emerald-900 hover:text-emerald-700 font-medium">
                View All →
              </button>
            </div>
          </div>

          {/* Table - Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Child
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Registered Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Disability
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Parents
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Education
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Health Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChildren.map((child) => (
                  <tr key={child.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={child.avatar}
                          alt={child.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-sm text-gray-900">{child.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.age} yrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.registeredDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.disability}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.parents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {child.education}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getHealthStatusColor(child.healthStatus)}`}>
                        {child.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewChild(child)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <UserMinus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet View */}
          <div className="lg:hidden p-4 space-y-4">
            {filteredChildren.map((child) => (
              <div
                key={child.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* Child Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{child.name}</h3>
                    <p className="text-sm text-gray-600">
                      {child.age} yrs • {child.gender}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${getHealthStatusColor(child.healthStatus)}`}>
                    {child.healthStatus}
                  </span>
                </div>

                {/* Child Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">DOB:</span>
                    <span className="ml-2 text-gray-900">{child.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Registered:</span>
                    <span className="ml-2 text-gray-900">{child.registeredDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Disability:</span>
                    <span className="ml-2 text-gray-900">{child.disability}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Parents:</span>
                    <span className="ml-2 text-gray-900">{child.parents}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Education:</span>
                    <span className="ml-2 text-gray-900">{child.education}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t">
                  <button
                    onClick={() => onViewChild(child)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors">
                    <UserMinus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredChildren.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500">No children found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}