import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IfasheTugufasheSponsorshipView from "./IfasheTugufasheSponsorshipView";
import AssignSponsorshipModal from "./AssignSponsorshipModal";

export default function IfasheTugufasheSponsorshipContent() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#new") {
      setShowAssignModal(true);
      window.history.replaceState(null, "", location.pathname);
    }
  }, [location]);

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