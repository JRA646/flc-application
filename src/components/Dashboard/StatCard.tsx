import type { ComponentType, SVGProps } from "react";

type StatCardProps = {
  title: string;
  value: number | string;
  subtitle: string;
  footerText?: string;
  footerColor?: "red" | "gray";

  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  footerText,
  footerColor = "gray",
  icon: Icon,
  gradient,
}: StatCardProps) {
  return (
    <div
      className="
       group relative overflow-hidden rounded-2xl bg-white p-6
        shadow-md shadow-gray-200/60
        transform-gpu
        transition-all 
    duration-1000 ease-out
        hover:-translate-y-1.5
        hover:shadow-xl hover:shadow-gray-300/60
        cursor-pointer
      "
    >
      {/* Decorative glow */}
      <div
        className={`pointer-events-none
    absolute -top-10 -right-10
    h-36 w-36 rounded-full
    bg-indigo-200/40
    transition-all duration-300 ease-out
    group-hover:bg-indigo-300/50
    group-hover:scale-110`}
      />

      <div className="flex items-start justify-between">
        {/* Left */}
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            {title}
          </p>

          <p className="text-3xl font-bold text-gray-900 leading-tight">
            {value}
          </p>

          <p className="text-sm text-gray-500">
            {subtitle}
          </p>

          {footerText && (
            <p
              className={`text-sm font-medium ${
                footerColor === "red"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {footerText}
            </p>
          )}
        </div>

        {/* Icon bubble */}
        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-xl
            bg-gradient-to-br ${gradient}
            shadow-md
            transition-transform duration-300 ease-out
            group-hover:scale-110
          `}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
