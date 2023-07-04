import { BadgeCheck, X } from "lucide-react";

import { Button } from "../../../components/ui/button";
import React from "react";
import { useAuth } from "../../../auth/hooks/useAuth";
import useIndexCanister from "../../../canisters/index/hooks/useIndexCanister";
import { useState } from "react";
import { TransactionWithId } from "@dfinity/ledger/dist/candid/icrc1_index";
import { formatCkBtc } from "../../../utils/formatCkBtc";

export default function TransactionOverlay() {
  const { identity } = useAuth();
  const indexCanister = useIndexCanister();

  const [latestTransaction, setLatestTransaction] = useState<
    TransactionWithId | undefined
  >(undefined);
  const [receivedTransaction, setReceivedTransaction] = useState<
    TransactionWithId | undefined
  >(undefined);

  const [close, setClose] = useState<boolean>(false);

  React.useEffect(() => {
    if (!indexCanister || !identity) return;
    const init = async () => {
      const principal = identity.getPrincipal();
      const response = await indexCanister.getTransactions({
        max_results: 1n,
        account: {
          owner: principal,
        },
      });
      setLatestTransaction(response.transactions[0]);
    };
    init();
  }, [indexCanister, identity]);

  React.useEffect(() => {
    if (!indexCanister || !identity) return;
    const pollTransactions = setInterval(async () => {
      const principal = identity.getPrincipal();
      const response = await indexCanister.getTransactions({
        max_results: 1n,
        account: {
          owner: principal,
        },
      });
      if (
        latestTransaction &&
        response.transactions[0].id === latestTransaction.id
      ) {
        return;
      }
      setReceivedTransaction(response.transactions[0]);
      setLatestTransaction(response.transactions[0]);
    }, 15000); // 15 seconds
    return () => clearInterval(pollTransactions);
  }, [indexCanister, identity, latestTransaction]);

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

  if (!receivedTransaction) return null;

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
      <div>
        {formatCkBtc(receivedTransaction.transaction.mint[0]?.amount)} ckBTC
      </div>
      <div className="grow" />
    </div>
  );
}
