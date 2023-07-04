import { Principal } from "@dfinity/principal";
import DfinityLogo from "../assets/dfinity-logo.png";
import { shortenPrincipal } from "../utils/shortenPrincipal";

type PrincipalPillProps = {
  principal: string | Principal | undefined;
};

export default function PrincipalPill({ principal }: PrincipalPillProps) {
  return (
    <div className="py-1 px-3 bg-black rounded-full bg-opacity-10 text-[0.9rem]">
      <img src={DfinityLogo} className="inline-block w-5 m-0" />{" "}
      {shortenPrincipal(principal)}
    </div>
  );
}
