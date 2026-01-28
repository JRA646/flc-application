import type { ReactNode, ComponentType, SVGProps } from "react";

type Props = {
  headerName: string;
  subHeader?: string;
  rightSlot?: ReactNode;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function Header({
  headerName,
  subHeader,
  rightSlot,
  icon: Icon,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Icon className="w-10 h-10" />
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">{headerName}</h1>
          {subHeader && (
            <p className="text-gray-500">{subHeader}</p>
          )}
        </div>
      </div>

      {rightSlot && (
        <div className="flex items-center gap-4">
          {rightSlot}
        </div>
      )}
    </div>
  );
}
