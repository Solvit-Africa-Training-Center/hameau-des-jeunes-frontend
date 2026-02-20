import { useState } from "react";
import InternshipFeedbackView from "./InternshipFeedbackView";
import FeedbackDetailsModal from "./FeedbackDetailsModal";
import EditFeedbackModal from "./EditFeedbackModal";
import AddFeedbackModal from "./AddFeedbackModal";
import type { Feedback } from "./InternshipFeedbackView";

export default function InternshipFeedbackContent() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailsModal(true);
  };

  const handleEditFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setShowEditModal(true);
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    console.log("Delete feedback:", feedbackId);
    // Add your delete logic here
  };

  return (
    <>
      <InternshipFeedbackView
        onAddFeedback={() => setShowAddModal(true)}
        onViewFeedback={handleViewFeedback}
        onEditFeedback={handleEditFeedback}
        onDeleteFeedback={handleDeleteFeedback}
      />

      <FeedbackDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        feedback={selectedFeedback}
      />

      <EditFeedbackModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        feedback={selectedFeedback}
      />

      <AddFeedbackModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}