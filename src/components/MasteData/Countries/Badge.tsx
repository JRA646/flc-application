import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  color?: "indigo" | "emerald" | "gray";
};

const colorClasses = {
  indigo: "bg-indigo-100 text-indigo-700",
  emerald: "bg-emerald-100 text-emerald-700",
  gray: "bg-gray-100 text-gray-700",
};

export default function Badge({
  children,
  icon,
  color = "indigo",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
}
