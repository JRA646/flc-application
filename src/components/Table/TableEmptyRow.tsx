import EmptyState from "@/components/EmptyState";
import type { ComponentType } from "react";
import type { SVGProps } from "react";

interface TableEmptyRowProps {
  colSpan: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function TableEmptyRow({
  colSpan,
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: TableEmptyRowProps) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <EmptyState
          icon={icon}
          title={title}
          description={description}
          actionLabel={actionLabel}
          onAction={onAction}
        />
      </td>
    </tr>
  );
}
