import { IcrcLedgerCanister } from "@dfinity/ledger";
import { Principal } from "@dfinity/principal";
import React from "react";
import { useAuth } from "../../../auth/hooks/useAuth";

export default function useCkBtcLedger() {
  const { identity, agent } = useAuth();
  const [ledgerCanister, setLedgerCanister] = React.useState<
    IcrcLedgerCanister | undefined
  >();
  const [balance, setBalance] = React.useState<bigint>(0n);

  React.useEffect(() => {
    if (!identity || !agent) return;
    const init = async () => {
      const ledgerCanister = IcrcLedgerCanister.create({
        agent,
        canisterId: Principal.fromText(
          import.meta.env.VITE_CANISTER_ID_CKBTC_LEDGER
        ),
      });
      setLedgerCanister(ledgerCanister);

      const balance = await ledgerCanister.balance({
        owner: identity.getPrincipal(),
        certified: false,
      });
      setBalance(balance);
    };
    init();
  }, [identity, agent]);

  const metadata = async () => {
    if (!ledgerCanister) {
      throw new Error("LedgerCanister not initialized");
    }
    return ledgerCanister.metadata({ certified: false });
  };

  return { ledgerCanister, metadata, balance };
}
