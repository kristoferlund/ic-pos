import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between w-full px-5 py-5 m-0 text-white bg-black md:rounded-t-lg">
      {children}
    </div>
  );
}
