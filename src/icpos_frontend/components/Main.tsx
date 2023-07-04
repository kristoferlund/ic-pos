import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <div className="flex flex-col grow">{children}</div>;
}
