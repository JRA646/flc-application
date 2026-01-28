import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Main({ children, className = "" }: Props) {
  return (
    <main className={`flex-1 p-8 ${className}`}>
      {children}
    </main>
  );
}
