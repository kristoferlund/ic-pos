import { BadgeCheck, X } from "lucide-react";

import { Button } from "../../../components/ui/button";
import PrincipalPill from "../../../components/PrincipalPill";
import React from "react";
import { Transaction } from "../../../icrc/types/transaction.type";
import { fetchTransactions } from "../../../icrc/transactions";
import { formatCkBtc } from "../../../utils/formatCkBtc";
import { isResponseOk } from "../../../axios/axios";
import { useAuth } from "../../../auth/hooks/useAuth";
import useSound from "use-sound";
import { useState } from "react";

export default function TransactionOverlay() {
  const { identity } = useAuth();
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const principal =
    params.get("principal") || identity?.getPrincipal().toString() || "";

  const [latestTransaction, setLatestTransaction] = useState<
    Transaction | undefined
  >(undefined);
  const [receivedTransaction, setReceivedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const [close, setClose] = useState<boolean>(false);

  React.useEffect(() => {
    if (!principal) return;
    const init = async () => {
      const response = await fetchTransactions(principal, 1);
      if (isResponseOk(response)) {
        setLatestTransaction(response.data.data[0]);
      }
    };
    init();
  }, [principal]);

  React.useEffect(() => {
    if (!principal || !latestTransaction) return;
    const pollTransactions = setInterval(async () => {
      const response = await fetchTransactions(principal, 1);
      if (latestTransaction && isResponseOk(response)) {
        const t = response.data.data[0];
        if (
          t.index !== latestTransaction.index &&
          t.kind === "transfer" &&
          t.from_owner !== principal
        ) {
          setReceivedTransaction(t);
          setLatestTransaction(t);
        }
      }
    }, 15000); // 15 seconds
    return () => clearInterval(pollTransactions);
  }, [principal, latestTransaction]);

  let classNames =
    "absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full space-y-10 text-white bg-cyan-800 md:rounded-lg";
  classNames += close
    ? " animate-out slide-out-to-top duration-150"
    : " animate-in slide-in-from-top";

  const closeAnimation = () => {
    setClose(true);
    const interval = setTimeout(async () => {
      setReceivedTransaction(undefined);
      setClose(false);
    }, 150);
    return () => clearInterval(interval);
  };

  const [playSound] = useSound("/cash-register.mp3");

  // Only show if there is a received transaction
  if (!receivedTransaction) {
    return null;
  }

  !close && playSound();

  return (
    <div className={classNames}>
      <div className="flex justify-end w-full grow">
        <div className="p-5">
          <Button variant="ghost" size="icon" onClick={closeAnimation}>
            <X className="w-4 h-4 hover:text-black" />
          </Button>
        </div>
      </div>
      <BadgeCheck className="w-36 h-36" />
      <div className="text-4xl font-bold">Payment Received!</div>
      <PrincipalPill principal={receivedTransaction.from_owner} />
      <div>{formatCkBtc(receivedTransaction.amount)} ckBTC</div>
      <div className="grow" />
    </div>
  );
}
