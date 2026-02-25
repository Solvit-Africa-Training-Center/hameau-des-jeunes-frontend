import { useState } from "react";
import IfasheTugufasheSchoolSupportView from "../ITSchoolContent/IfasheTugufasheSchoolSupportView";
import AddSchoolPaymentModal from "./AddSchoolPaymentModal";

export default function IfasheTugufasheSchoolSupportContent() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <IfasheTugufasheSchoolSupportView onAddPayment={() => setShowAddModal(true)} />
      <AddSchoolPaymentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}