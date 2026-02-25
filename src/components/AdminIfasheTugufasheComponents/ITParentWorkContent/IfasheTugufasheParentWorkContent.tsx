import { useState } from "react";
import IfasheTugufasheParentWorkView from "./IfasheTugufasheParentWorkView";
import AssignParentWorkModal from "./AssignParentWorkModal";

export default function IfasheTugufasheParentWorkContent() {
  const [showAssignModal, setShowAssignModal] = useState(false);

  return (
    <>
      <IfasheTugufasheParentWorkView onAssignParent={() => setShowAssignModal(true)} />
      <AssignParentWorkModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
      />
    </>
  );
}