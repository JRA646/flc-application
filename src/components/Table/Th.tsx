import type { ReactNode } from "react";

interface ThProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Th({
  children,
  align = "left",
  className = "",
}: ThProps) {
  return (
    <th
      className={`px-4 py-3 font-medium ${alignClass[align]} ${className}`}
    >
      {children}
    </th>
  );
}
