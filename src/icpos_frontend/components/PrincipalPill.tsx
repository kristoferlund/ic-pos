import { Principal } from "@dfinity/principal";
import DfinityLogo from "../assets/dfinity-logo.png";
import { shortenPrincipal } from "../utils/shortenPrincipal";
import { principalToString } from "../utils/principalToString";

type PrincipalPillProps = {
  principal: string | Principal | undefined;
  className?: string;
  variant?: "short" | "full";
};

export default function PrincipalPill({
  principal,
  className,
  variant = "short",
}: PrincipalPillProps) {
  return (
    <div
      className={`py-1 px-3 bg-black rounded-full bg-opacity-10 text-[0.9rem] ${className}`}
    >
      <img src={DfinityLogo} className="inline-block w-5 m-0" />{" "}
      {variant === "short"
        ? shortenPrincipal(principal)
        : principalToString(principal)}
    </div>
  );
}
