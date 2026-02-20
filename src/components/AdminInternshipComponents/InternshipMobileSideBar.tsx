"use client";

import { X } from "lucide-react";
import { InternshipSideBar } from "@/components/AdminInternshipComponents/InternshipSideBar";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function InternshipMobileSideBar({ open, onClose }: MobileSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-54 z-50 md:hidden transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#0F3D2E] z-10 hover:bg-gray-100 rounded-full p-1 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Sidebar content */}
        <InternshipSideBar className="relative" />
      </div>
    </>
  );
}
