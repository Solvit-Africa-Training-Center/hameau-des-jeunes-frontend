import { useState } from "react";
import HealthRecordsView from "./HealthRecordsView";
import NewHealthVisitModal from "./NewHealthVisitModal";

export default function HealthRecordsContent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HealthRecordsView onRegisterClick={() => setShowModal(true)} />
      <NewHealthVisitModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}