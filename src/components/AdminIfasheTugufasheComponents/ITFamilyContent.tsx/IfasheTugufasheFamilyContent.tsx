import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IfasheTugufasheFamilyView from "./IfasheTugufasheFamilyView";
import RegisterFamilyModal from "./RegisterFamilyModal";

export default function IfasheTugufasheFamilyContent() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#new") {
      setShowRegisterModal(true);
      // Clean up the hash
      window.history.replaceState(null, "", location.pathname);
    }
  }, [location]);

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