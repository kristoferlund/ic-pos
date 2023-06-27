import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <div className="p-5">{children}</div>;
}
