import { useState } from "react";
import CaretakerView from "./CaretakerView";
import AddCaretakerModal from "./AddCaretakerModal";
import AssignChildrenModal from "./AssignChildrenModal";
import CaretakerProfilePanel from "./CaretakerProfilePanel";
import type { Caretaker } from "./CaretakerView";

export default function ResidentialCareCareTakersContent() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [selectedCaretaker, setSelectedCaretaker] = useState<Caretaker | null>(
    null,
  );
  const [assignedChildIds, setAssignedChildIds] = useState<Set<string>>(
    new Set(),
  );

  const handleProfile = (caretaker: Caretaker) => {
    setSelectedCaretaker(caretaker);
    setShowProfilePanel(true);
  };

  const handleAssign = (
    caretaker: Caretaker,
    allAssignedChildIds: Set<string>,
  ) => {
    setSelectedCaretaker(caretaker);
    setAssignedChildIds(allAssignedChildIds);
    setShowAssignModal(true);
  };

  return (
    <>
      <CaretakerView
        onAddCaretaker={() => setShowAddModal(true)}
        onProfile={handleProfile}
        onAssign={handleAssign}
      />

      <AddCaretakerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <AssignChildrenModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        caretaker={selectedCaretaker}
        assignedChildIds={assignedChildIds}
      />

      <CaretakerProfilePanel
        isOpen={showProfilePanel}
        onClose={() => setShowProfilePanel(false)}
        caretaker={selectedCaretaker}
      />
    </>
  );
}
