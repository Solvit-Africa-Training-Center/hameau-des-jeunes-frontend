import { useState } from "react";
import IfasheTugufasheClothesView from "./IfasheTugufasheClothesView";
import AddClothesDistributionModal from "./AddClothesDistributionModal";

export default function IfasheTugufasheClothesContent() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <IfasheTugufasheClothesView onAddDistribution={() => setShowAddModal(true)} />
      <AddClothesDistributionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}