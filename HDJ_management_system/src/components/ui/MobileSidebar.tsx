"use client";

import { X } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <aside
        className={cn(
          "absolute left-0 top-0 h-full w-64 bg-[#1a2e35] transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Reuse existing sidebar */}
        <Sidebar className="flex h-full w-full" />
      </aside>
    </div>
  );
}
