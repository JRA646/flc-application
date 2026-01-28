import type { ReactNode } from "react";

type StatusVariant = "active" | "inactive";

interface StatusBadgeProps {
  status: StatusVariant | boolean;
  activeLabel?: ReactNode;
  inactiveLabel?: ReactNode;
  className?: string;
}

export default function StatusBadge({
  status,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
  className = "",
}: StatusBadgeProps) {
  const isActive = typeof status === "boolean" ? status : status === "active";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium
        ${
          isActive
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-100 text-gray-600"
        }
        ${className}
      `}
    >
      {isActive ? activeLabel : inactiveLabel}
    </span>
  );
}
