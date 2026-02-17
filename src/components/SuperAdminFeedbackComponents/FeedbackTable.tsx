import { IoPersonCircleOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ReplyModal } from "./ReplyModal";
import { MdOutlineTune } from "react-icons/md";

/* -------------------- Types -------------------- */

export type AdminRole =
  | "Residential Care"
  | "Ifashe Tugufashe"
  | "Internship"
  | "Health Post";

type AdminStatus = "Up_to_date" | "Action_Required" | "Pending";

export interface Admin {
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  dateAndTime: string;
  messagePreview: string;
}

/* -------------------- Data -------------------- */

const admins: Admin[] = [
  {
    name: "Jean-Paul Mugisha",
    email: "jeanpaul@saintkizito.org",
    role: "Residential Care",
    status: "Up_to_date",
    dateAndTime: "2024-06-15 14:30",
    messagePreview: "I really appreciate the new features in the dashboard!",
  },
  {
    name: "Marie-Claire Umuhoza",
    email: "marieclaire@saintkizito.org",
    role: "Residential Care",
    status: "Up_to_date",
    dateAndTime: "2024-06-15 15:45",
    messagePreview: "The new dashboard is very user-friendly!",
  },
  {
    name: "Marie-Claire Umuhoza",
    email: "marieclaire@saintkizito.org",
    role: "Ifashe Tugufashe",
    status: "Action_Required",
    dateAndTime: "5 hours ago",
    messagePreview: "I have some concerns about the new features.",
  },
  {
    name: "Eric Gasana",
    email: "eric@saintkizito.org",
    role: "Internship",
    status: "Pending",
    dateAndTime: "1 day ago",
    messagePreview: "The dashboard is great, but I have a suggestion.",
  },
  {
    name: "Alice Mutoni",
    email: "alicemutoni@saintkizito.org",
    role: "Health Post",
    status: "Up_to_date",
    dateAndTime: "3 days ago",
    messagePreview: "The new features are very helpful!",
  },
];

/* -------------------- Component -------------------- */

export const FeedbackTable: React.FC = () => {
  const [adminsList] = useState<Admin[]>(admins);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProgram, setFilterProgram] = useState("");

  const handleReplyClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsReplyModalOpen(true);
  };

  const handleSaveReply = (response: string) => {
    console.log("Reply to:", selectedAdmin?.name);
    console.log("Response:", response);
    // Here you would typically send the reply to your backend
  };

  // Filter and search logic
  const filteredAdmins = adminsList.filter((admin) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase());

    // Program filter
    const matchesProgram =
      filterProgram === "" ||
      admin.role.toLowerCase().includes(filterProgram.toLowerCase());

    return matchesSearch && matchesProgram;
  });

  return (
    <>
      <div className="max-h-[225px] overflow-y-auto">
        {/* Search and Filter Fields - Outside Table */}
        <div className="flex justify-between items-center w-full px-5 py-5 bg-white">
          {/* Search Field - Left */}
          <div className="relative w-full max-w-xs">
            <Input
              id="search_field"
              type="text"
              placeholder="Search by name, email or role"
              className="border-none rounded-2xl bg-[#F5F7FA] text-[#718EBF] pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
              size={18}
            />
          </div>

          {/* Filter Field - Right */}
          <div className="relative w-full max-w-xs">
            <Input
              id="filter_field"
              type="text"
              placeholder="Filter by program"
              className="border-none rounded-2xl bg-[#F5F7FA] text-[#718EBF] pl-10"
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
            />
            <MdOutlineTune
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
              size={18}
            />
          </div>
        </div>

        <Table className="w-full">
          <TableHeader className="bg-white">
            <TableRow className="border-none bg-[#F9FAFB]">
              <TableHead className="px-5 font-normal text-[#838484] text-base">
                Sender
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Program
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Message Preview
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Date & Time
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Status
              </TableHead>
              <TableHead className="font-normal text-[#838484] text-base">
                Actions
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No feedback messages found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow
                  key={admin.email}
                  className="border-b border-gray-200"
                >
                  <TableCell className="px-5">
                    <div className="flex gap-2">
                      <Avatar size="lg">
                        <AvatarFallback>
                          <IoPersonCircleOutline size={40} />
                        </AvatarFallback>
                      </Avatar>

                      <div className="grid gap-1">
                        <span className="text-sm font-bold">{admin.name}</span>
                        <span className="text-sm text-gray-500">
                          {admin.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="grid gap-1">
                      <span className="text-sm font-bold">{admin.role}</span>
                      <span className="text-sm text-gray-500">
                        PROGRAM ADMIN
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-[#838484] truncate max-w-xs">
                    {admin.messagePreview}
                  </TableCell>

                  <TableCell>{admin.dateAndTime}</TableCell>

                  <TableCell>
                    <Badge text={admin.status} />
                  </TableCell>

                  <TableCell className="flex items-center justify-center mt-2 gap-5">
                    <button
                      onClick={() => handleReplyClick(admin)}
                      className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      Reply
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={isReplyModalOpen}
        admin={selectedAdmin}
        onClose={() => setIsReplyModalOpen(false)}
        onSave={handleSaveReply}
      />
    </>
  );
};
