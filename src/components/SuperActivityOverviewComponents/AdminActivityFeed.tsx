import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineUpload } from "react-icons/hi";
import { FaPenClip } from "react-icons/fa6";
import type { AdminRole } from "./AdminActivityDetailsTable";
import { LuClock4 } from "react-icons/lu";

type ActivityStatus = "completed" | "pending" | "needs_attention";

type ActivityFilter = "all" | "pending" | "needs_attention" | "completed";

interface Activity {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  program: string;
  timestamp: string;
  icon: "document" | "edit" | "upload";
}

//  Filter Buttons config

const filterButtons = [
  {
    value: "all" as ActivityFilter,
    buttonLabel: "All",
  },
  {
    value: "pending" as ActivityFilter,
    buttonLabel: "Pending",
  },
  {
    value: "needs_attention" as ActivityFilter,
    buttonLabel: "Needs attention",
  },
  {
    value: "completed" as ActivityFilter,
    buttonLabel: "Completed",
  },
];

// Data

const activities: Activity[] = [
  {
    id: "1",
    title: "Beneficiary Health Report",
    description:
      "Updated monthly checkup records for 15 children in the residential wing.",
    status: "completed",
    program: "Residential Care",
    timestamp: "Today, 10:45 AM",
    icon: "document",
  },
  {
    id: "2",
    title: "Registration Form Edit",
    description:
      "Corrected primary caregiver information for beneficiary ID HK-2024-089.",
    status: "completed",
    program: "Residential Care",
    timestamp: "Today, 09:15 AM",
    icon: "edit",
  },
  {
    id: "3",
    title: "Document Upload",
    description:
      "Uploaded verified birth certificates for 3 new intake residents.",
    status: "pending",
    program: "Residential Care",
    timestamp: "Yesterday, 03:30 PM",
    icon: "upload",
  },
  {
    id: "4",
    title: "Medical Records Update",
    description: "Vaccination records need verification for 5 beneficiaries.",
    status: "needs_attention",
    program: "Health Post",
    timestamp: "Yesterday, 11:20 AM",
    icon: "document",
  },
  {
    id: "5",
    title: "Training Certificate Upload",
    description: "Submitted completion certificates for intern cohort 2024-A.",
    status: "completed",
    program: "Internship",
    timestamp: "2 days ago",
    icon: "upload",
  },
  {
    id: "6",
    title: "Family Assessment Form",
    description: "Pending approval for new family enrollment in the program.",
    status: "pending",
    program: "Ifashe Tugufashe",
    timestamp: "2 days ago",
    icon: "edit",
  },
];

// props
interface AdminActivityFeedProps {
  adminRole: AdminRole | null;
}

// Component

export const AdminActivityFeed: React.FC<AdminActivityFeedProps> = ({
  adminRole,
}) => {
  const [active, setActive] = useState<ActivityFilter>("all");

  const handleClick = (value: ActivityFilter) => {
    setActive(value);
  };

  // Filter activities based on selected tab
  const filteredActivities = activities.filter((activity) => {
    if (active === "all") return true;
    return activity.status === active;
  });

  // Get icon component
  const getIcon = (iconType: Activity["icon"]) => {
    switch (iconType) {
      case "document":
        return <IoDocumentTextOutline size={24} className="text-gray-600" />;
      case "upload":
        return <HiOutlineUpload size={24} className="text-yellow-600" />;
      case "edit":
        return <FaPenClip size={20} className="text-gray-600" />;
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case "completed":
        return (
          <div className="bg-green-100 px-2 py-1 rounded-xl text-green-700 hover:bg-green-100">
            Completed
          </div>
        );
      case "pending":
        return (
          <div className="bg-yellow-100 px-2 py-1 rounded-xl text-yellow-700 hover:bg-yellow-100">
            Pending
          </div>
        );
      case "needs_attention":
        return (
          <div className="bg-red-100 px-2 py-1 rounded-xl text-red-700 hover:bg-red-100">
            Needs Attention
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Filter Buttons - Black Background Bar */}

      <div className="flex gap-2 mb-6 items-center ">
        <h1>View:</h1>
        {filterButtons.map((item) => (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`py-1 text-sm rounded-full font-light transition-colors flex-1  ${
              active === item.value
                ? "bg-[#0F3D2E] text-white"
                : "bg-[#E7ECEA] text-[#0F3D2E]"
            }`}
          >
            {item.buttonLabel}
          </button>
        ))}
      </div>

      {/* Gray Container with Activity Cards */}
      <div className="bg-gray-100 rounded-lg p-6 h-175  md:h-64 overflow-y-auto scrollbar-hide">
        <div className=" space-y-4">
          {filteredActivities.map((activity) => (
            <div className="flex gap-2">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                {getIcon(activity.icon)}
              </div>
              <div
                key={activity.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 text-sm">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {activity.title}
                    </h3>
                    {getStatusBadge(activity.status)}
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    {activity.description}
                  </p>

                  <div className="w-full h-[1px] m-3 bg-[#83848421]"></div>

                  <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
                    <h1 className="mr-2">{adminRole}</h1>

                    <div className="flex items-center gap-2">
                      <LuClock4 />
                      <h1>{activity.timestamp}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Empty State */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No activities found for this filter.
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-sm bg-white w-full p-4 rounded-lg mt-6 text-center text-gray-500">
          *This overview is for executive review only. All actions are logged
          and verifiable for audit purpose.*
        </div>
      </div>
    </div>
  );
};
