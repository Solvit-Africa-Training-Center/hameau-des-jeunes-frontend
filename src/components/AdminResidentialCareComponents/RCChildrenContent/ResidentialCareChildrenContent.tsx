import { useState } from "react";
import ChildrenRegistryView from "./ChildrenRegistryView";
import ChildDetailView from "@/components/AdminResidentialCareComponents/RCDashboardContent/ChildDetailView";
import RegisterModal from "@/components/AdminResidentialCareComponents/RCDashboardContent/RegisterModal";
import type { Child } from "@/store/api/childrenApi";
import NewHealthVisitModal from "../RCHealthRecordsContent/NewHealthVisitModal";

type ViewMode = "registry" | "childDetail";

export default function ResidentialCareChildrenContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("registry");
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);

  const handleViewChild = (child: Child) => {
    setSelectedChild(child);
    setViewMode("childDetail");
  };

  const handleBackToRegistry = () => {
    setViewMode("registry");
    setSelectedChild(null);
  };

  return (
    <>
      {viewMode === "registry" ? (
        <ChildrenRegistryView
          onViewChild={handleViewChild}
          onRegisterClick={() => setShowRegisterModal(true)}
        />
      ) : selectedChild ? (
        <ChildDetailView
          child={selectedChild}
          onBack={handleBackToRegistry}
          onNewHealthRecord={() => setShowHealthModal(true)}
        />
      ) : null}

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />

      <NewHealthVisitModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
      />
    </>
  );
}
