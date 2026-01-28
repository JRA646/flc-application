import type { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
}

export default function ActionButton({
  icon,
  onClick,
  title,
  className = "",
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded-md p-1.5 cursor-pointer text-gray-500
        hover:text-gray-700 hover:bg-gray-100 transition
        ${className}`}
    >
      {icon}
    </button>
  );
}
