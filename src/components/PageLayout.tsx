import type {
  ReactNode,
  ComponentType,
  SVGProps,
} from "react";
import Header from "./Header";
import Main from "./Main";

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
};

export default function PageLayout({
  title,
  subtitle,
  actions,
  icon,
  children,
}: Props) {
  return (
    <Main className="space-y-8">
      <Header
        headerName={title}
        subHeader={subtitle}
        rightSlot={actions}
        icon={icon}
      />

      {/* Page content */}
      <div className="space-y-6">
        {children}
      </div>
    </Main>
  );
}
