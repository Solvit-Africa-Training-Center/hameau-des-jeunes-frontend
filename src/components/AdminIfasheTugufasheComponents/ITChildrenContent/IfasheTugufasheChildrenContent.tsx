import { useState } from "react";
import IfasheTugufasheChildrenView from "./IfasheTugufasheChildrenView";
import RegisterChildModal from "./RegisterChildModal";

export default function IfasheTugufasheChildrenContent() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <IfasheTugufasheChildrenView onRegisterChild={() => setShowRegisterModal(true)} />
      <RegisterChildModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </>
  );
}