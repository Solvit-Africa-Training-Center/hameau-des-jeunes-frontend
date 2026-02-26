import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IfasheTugufasheChildrenView from "./IfasheTugufasheChildrenView";
import RegisterChildModal from "./RegisterChildModal";

export default function IfasheTugufasheChildrenContent() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#new") {
      setShowRegisterModal(true);
      window.history.replaceState(null, "", location.pathname);
    }
  }, [location]);

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