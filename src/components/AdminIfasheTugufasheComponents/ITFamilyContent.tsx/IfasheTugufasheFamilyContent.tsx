import { useState } from "react";
import IfasheTugufasheFamilyView from "./IfasheTugufasheFamilyView";
import RegisterFamilyModal from "./RegisterFamilyModal";

export default function IfasheTugufasheFamilyContent() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <IfasheTugufasheFamilyView onRegisterFamily={() => setShowRegisterModal(true)} />
      <RegisterFamilyModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </>
  );
}