import { useState } from "react";
import ChildrenRegistryView from "./ChildrenRegistryView";
import ChildDetailView from "@/components/AdminResidentialCareComponents/RCDashboardContent/ChildDetailView";
import type { ChildRegistry } from "./ChildrenRegistryView";
import RegisterModal from "@/components/AdminResidentialCareComponents/RCDashboardContent/RegisterModal";


type ViewMode = "registry" | "childDetail";

// Helper function to convert ChildRegistry to Child type for ChildDetailView
const convertToChild = (child: ChildRegistry) => ({
  id: child.id,
  name: child.name,
  age: child.age,
  dateRegistered: child.registeredDate,
  careStatus: child.careStatus,
  caretaker: child.caretaker,
  avatar: child.avatar,
});

export default function ResidentialCareChildrenContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("registry");
  const [selectedChild, setSelectedChild] = useState<ChildRegistry | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleViewChild = (child: ChildRegistry) => {
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
        <ChildrenRegistryView onViewChild={handleViewChild}
        onRegisterClick={() => setShowRegisterModal(true)}
     />
      ) : selectedChild ? (
        <ChildDetailView child={convertToChild(selectedChild)} onBack={handleBackToRegistry} />
      ) : null}
      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </>
  );
}