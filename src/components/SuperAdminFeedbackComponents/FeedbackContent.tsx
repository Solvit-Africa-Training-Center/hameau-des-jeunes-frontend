import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FiUserPlus } from "react-icons/fi";

import { useState } from "react";
import { toast } from "react-toastify";
import { FeedbackStatsCards } from "./FeedbackStatsCards";
import { AddAdministratorModal } from "../SuperAdminUsersMgtComponents/AddAdministratorModal";
import { FeedbackTable } from "./FeedbackTable";

export const FeedbackContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-96">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Feedback & Inquiries</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Manage communications from the website contact forms.
            </h1>
          </div>

          <Button
            className="w-fit bg-[#0F3D2E]"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center gap-2">
              <FiUserPlus size={20} />
              <h1>Export Feedback</h1>
            </div>
          </Button>
        </div>
        <FeedbackStatsCards />
        <Card className="mt-5">
          <FeedbackTable />
        </Card>
      </section>

      {/* Add Administrator Modal */}
      <AddAdministratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => toast.success("Administrator created successfully!")}
      />
    </>
  );
};
