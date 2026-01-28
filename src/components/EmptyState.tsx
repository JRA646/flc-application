import type { ComponentType, SVGProps } from "react";
import { PlusIcon } from "@/config/icon";

type EmptyStateProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  btnicon?: ComponentType<SVGProps<SVGSVGElement>>; // ✅ optional
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  btnicon: Btnicon = PlusIcon, // ✅ default icon
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-2xl bg-gray-100 p-6">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}

      {/* Action */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 cursor-pointer inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 shadow"
        >
          <Btnicon className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
