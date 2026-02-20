import { useState } from "react";
import InternshipApplicationsView from "./InternshipApplicationsView";
import ApplicationInfoModal from "./ApplicationInfoModal";
import RejectionReasonModal from "./RejectionReasonModal";
import RequestInfoModal from "./RequestInfoModal";
import type { Application } from "./InternshipApplicationsView";

export default function InternshipApplicationContent() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setShowInfoModal(true);
  };

  const handleReject = (application: Application) => {
    setSelectedApplication(application);
    setShowRejectModal(true);
  };

  const handleRequestInfo = (application: Application) => {
    setSelectedApplication(application);
    setShowRequestModal(true);
  };

  const handleApprove = (application: Application) => {
    console.log("Approve application:", application.id);
    // Add your approve logic here
  };

  return (
    <>
      <InternshipApplicationsView
        onViewApplication={handleViewApplication}
        onReject={handleReject}
        onRequestInfo={handleRequestInfo}
        onApprove={handleApprove}
      />

      <ApplicationInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        application={selectedApplication}
      />

      <RejectionReasonModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        application={selectedApplication}
      />

      <RequestInfoModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        application={selectedApplication}
      />
    </>
  );
}