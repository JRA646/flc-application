import type { ReactNode } from "react";

interface TdProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  variant?: "default" | "muted" | "mono";
  className?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const variantClass = {
  default: "font-medium text-gray-900",
  muted: "text-gray-600",
  mono: "font-mono text-gray-700",
};

export default function Td({
  children,
  align = "left",
  variant = "default",
  className = "",
}: TdProps) {
  return (
    <td
      className={`px-4 py-3 ${alignClass[align]} ${variantClass[variant]} ${className}`}
    >
      {children}
    </td>
  );
}
