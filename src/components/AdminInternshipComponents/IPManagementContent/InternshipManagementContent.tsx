import { useState } from "react";
import InternshipManagementView from "./InternshipManagementView";
import EditAssignmentModal from "./EditAssignmentModal";
import ApplicationInfoModal from "../IPApplicationContent/ApplicationInfoModal";
import type { ApprovedInternship } from "./InternshipManagementView";

export default function InternshipManagementContent() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<ApprovedInternship | null>(null);

  const handleEditAssignment = (internship: ApprovedInternship) => {
    setSelectedInternship(internship);
    setShowEditModal(true);
  };

  const handleViewApplication = (internship: ApprovedInternship) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  return (
    <>
      <InternshipManagementView
        onEditAssignment={handleEditAssignment}
        onViewApplication={handleViewApplication}
      />

      <EditAssignmentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        internship={selectedInternship}
      />

      <ApplicationInfoModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        application={selectedInternship}
      />
    </>
  );
}