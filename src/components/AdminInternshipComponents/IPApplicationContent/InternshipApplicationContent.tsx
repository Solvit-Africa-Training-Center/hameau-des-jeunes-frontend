import { useState } from "react";
import InternshipApplicationsView from "./InternshipApplicationsView";
import ApplicationInfoModal from "./ApplicationInfoModal";
import RejectionReasonModal from "./RejectionReasonModal";
import RequestInfoModal from "./RequestInfoModal";
import type { Application } from "./InternshipApplicationsView";
import { useUpdateApplicationMutation } from "@/store/api/internshipApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InternshipApplicationContent() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updateApplication] = useUpdateApplicationMutation();

  const handleUpdateStatus = async (id: string, status: any, admin_notes?: string) => {
    try {
      await updateApplication({ id, data: { status, admin_notes } }).unwrap();
      toast.success(`Application updated to ${status}`);
      setShowRejectModal(false);
      setShowRequestModal(false);
    } catch (err: any) {
      toast.error(err?.data?.detail || "Failed to update application");
    }
  };

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
    handleUpdateStatus(application.id, "APPROVED");
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
        onConfirm={(reason) => handleUpdateStatus(selectedApplication!.id, "REJECTED", reason)}
      />

      <RequestInfoModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        application={selectedApplication}
        onConfirm={(notes) => handleUpdateStatus(selectedApplication!.id, "MORE_INFO_NEEDED", notes)}
      />
    </>
  );
}
