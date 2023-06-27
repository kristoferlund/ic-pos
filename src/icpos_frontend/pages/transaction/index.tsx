import { Link, useParams } from "@tanstack/router";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import Page from "../../components/Page";
import { SingleTransaction } from "../../icrc/transaction";
import TransactionRow from "./components/TransactionRow";
import { Transactions } from "../../icrc/transactions";
import { X } from "lucide-react";
import { shortenPrincipal } from "../../utils/shorten-principal";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";
import { useRecoilValue } from "recoil";

type TransactionPageParams = {
  transactionId: string;
};

export default function TransactionPage() {
  const params = useParams();
  const transactionId = (params as any).transactionId;

  // const { merchantState } = useBackend();

  const { identity } = useAuth();
  // const principal = identity?.getPrincipal().toString();

  const principal =
    "237zc-vao7e-qxrtp-dampy-4rqvq-3eg3b-elvly-q2xnl-jqlpj-d2jpt-xqe";

  const transaction = useRecoilValue(
    SingleTransaction({
      id: principal,
      index: parseInt(transactionId),
    })
  );

  if (!transaction) return null;

  return (
    <>
      <Header>
        <Link to="/history">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        History
        <div className="w-4 h-4" />
      </Header>
      <Page>
        <div className="flex flex-col items-start justify-center w-full space-y-5">
          <div>
            <div className="text-[0.8rem]">Transaction Index</div>
            <div>{transaction.index}</div>
          </div>

          <div>
            <div className="text-[0.8rem]">From</div>
            <div>{transaction.from_accounts}</div>
          </div>

          <div>
            <div className="text-[0.8rem]">To</div>
            <div>{transaction.to_account}</div>
          </div>

          <div>
            <div className="text-[0.8rem]">Amount</div>
            <div>{transaction.amount}</div>
          </div>
        </div>
      </Page>
    </>
  );
}
