import { useState } from "react";
import IfasheTugufasheSponsorshipView from "./IfasheTugufasheSponsorshipView";
import AssignSponsorshipModal from "./AssignSponsorshipModal";

export default function IfasheTugufasheSponsorshipContent() {
  const [showAssignModal, setShowAssignModal] = useState(false);

  return (
    <>
      <IfasheTugufasheSponsorshipView
        onAssignSponsorship={() => setShowAssignModal(true)}
      />
      <AssignSponsorshipModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
      />
    </>
  );
}