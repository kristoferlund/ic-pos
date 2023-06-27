import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between w-full px-5 pt-5">
      {children}
    </div>
  );
}
