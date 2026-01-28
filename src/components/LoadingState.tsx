interface LoadingStateProps {
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export default function LoadingState({
  label = "Loading…",
  size = "md",
  className = "",
}: LoadingStateProps) {
  const spinnerSize =
    size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <div
      className={`flex items-center justify-center py-16 text-sm text-gray-500 ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        <span
          className={`${spinnerSize} animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600`}
        />
        {label}
      </span>
    </div>
  );
}
