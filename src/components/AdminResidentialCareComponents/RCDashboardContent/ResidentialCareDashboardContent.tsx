import { useState } from "react";
import DashboardView from "./DashboardView";
import ChildDetailView from "./ChildDetailView";
import RegisterModal from "./RegisterModal";
import type { Child } from "./DashboardView";

type ViewMode = "dashboard" | "childDetail";

export default function ResidentialCareDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleViewChild = (child: Child) => {
    setSelectedChild(child);
    setViewMode("childDetail");
  };

  const handleDeleteChild = (childId: string) => {
    console.log("Delete child:", childId);
    // Add your delete logic here
  };

  const handleBackToDashboard = () => {
    setViewMode("dashboard");
    setSelectedChild(null);
  };

  return (
    <>
      {viewMode === "dashboard" ? (
        <DashboardView
          onRegisterClick={() => setShowRegisterModal(true)}
          onViewChild={handleViewChild}
          onDeleteChild={handleDeleteChild}
        />
      ) : selectedChild ? (
        <ChildDetailView child={selectedChild} onBack={handleBackToDashboard} />
      ) : null}

      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </>
  );
}