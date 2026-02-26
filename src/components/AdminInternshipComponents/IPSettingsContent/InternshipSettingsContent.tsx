import { useState } from "react";
import { Settings, Mail, BookOpen, Users, X, Plus } from "lucide-react";

// Types

interface ToggleItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface ProgramTag {
  id: string;
  label: string;
}

interface SupervisorTag {
  id: string;
  label: string;
}

// Toggle Component 

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        enabled ? "bg-emerald-900" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

//  Section Wrapper

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function SectionCard({ icon, title, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
        <span className="text-emerald-900">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

//  Tag Badge

interface TagBadgeProps {
  label: string;
}

function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-100">
      {label}
      <X className="w-3 h-3 text-emerald-600 cursor-pointer hover:text-emerald-900 transition-colors" />
    </span>
  );
}

//  Main Page 

export default function InternshipSettingsContent() {
  const [duration, setDuration] = useState<number>(12);

  const [notifications, setNotifications] = useState<ToggleItem[]>([
    {
      id: "master",
      label: "Enable Email Notifications",
      description: "Master switch for all email notifications",
      enabled: true,
    },
    {
      id: "status",
      label: "Status Change Notifications",
      description: "Notify applicants when their status changes",
      enabled: true,
    },
    {
      id: "moreinfo",
      label: "More Information Requested",
      description: "Notify when additional information is needed",
      enabled: true,
    },
    {
      id: "approval",
      label: "Approval Notifications",
      description: "Notify applicants when approved",
      enabled: true,
    },
    {
      id: "rejection",
      label: "Rejection Notifications",
      description: "Notify applicants when rejected",
      enabled: false,
    },
  ]);

  const programs: ProgramTag[] = [
    { id: "1", label: "Ifashe Tugufashe" },
    { id: "2", label: "Residential Care" },
    { id: "3", label: "Technology/High School (8/16)" },
    { id: "4", label: "Agriculture & Farming" },
    { id: "5", label: "Health Past Services" },
    { id: "6", label: "Carpentry & Garage Workshops" },
    { id: "7", label: "Tourism & Cultural Visits" },
  ];

  const supervisors: SupervisorTag[] = [
    { id: "1", label: "Jennifer Williams" },
    { id: "2", label: "Michael Chen" },
    { id: "3", label: "Sarah Johnson" },
    { id: "4", label: "David Kim" },
    { id: "5", label: "Amanda Foster" },
    { id: "6", label: "Lisa Anderson" },
    { id: "7", label: "Robert Martinez" },
  ];

  function handleToggle(id: string, val: boolean) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: val } : n))
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-5">
        {/* Page Header */}
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-emerald-900" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* ── Program Configuration ── */}
        <SectionCard
          icon={<BookOpen className="w-4 h-4" />}
          title="Program Configuration"
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600">
              Default Internship Duration (weeks)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-400 mt-1">
              This will be used as the default duration when assigning new internships.
            </p>
          </div>
        </SectionCard>

        {/* ── Email Notifications ── */}
        <SectionCard
          icon={<Mail className="w-4 h-4" />}
          title="Email Notifications"
        >
          <div className="divide-y divide-gray-50 -my-1">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3.5 gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <ToggleSwitch
                    enabled={item.enabled}
                    onChange={(val) => handleToggle(item.id, val)}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Programs ── */}
        <SectionCard
          icon={<BookOpen className="w-4 h-4" />}
          title="Programs"
        >
          <div className="space-y-3">
            {/* Input row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add new program"
                disabled
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed focus:outline-none"
              />
              <button
                disabled
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-900 text-white text-sm font-medium opacity-60 cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {programs.map((p) => (
                <TagBadge key={p.id} label={p.label} />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ── Supervisors ── */}
        <SectionCard
          icon={<Users className="w-4 h-4" />}
          title="Supervisors"
        >
          <div className="space-y-3">
            {/* Input row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add new supervisor"
                disabled
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed focus:outline-none"
              />
              <button
                disabled
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-900 text-white text-sm font-medium opacity-60 cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {supervisors.map((s) => (
                <TagBadge key={s.id} label={s.label} />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Bottom padding for breathing room */}
        <div className="pb-4" />
      </div>
    </div>
  );
}