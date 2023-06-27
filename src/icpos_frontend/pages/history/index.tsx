import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Page from "../../components/Page";
import TransactionRow from "./components/TransactionRow";
import { Transactions } from "../../icrc/transactions";
import { X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";
import { useRecoilValue } from "recoil";

export default function HistoryPage() {
  const { merchantState } = useBackend();

  // const { identity } = useAuth();
  // const principal = identity?.getPrincipal().toString();

  const principal =
    "237zc-vao7e-qxrtp-dampy-4rqvq-3eg3b-elvly-q2xnl-jqlpj-d2jpt-xqe";
  const transactions = useRecoilValue(Transactions(principal));

  if (!merchantState || !merchantState.merchant) return null;

  return (
    <>
      <Header>
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        History
        <div className="w-4 h-4" />
      </Header>
      <Page>
        <div className="flex flex-col items-center justify-center w-full">
          {transactions.map((transaction) => (
            <TransactionRow transaction={transaction} key={transaction.index} />
          ))}
        </div>
      </Page>
    </>
  );
}
