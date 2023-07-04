import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import Page from "../../components/Page";
import TransactionRow from "./components/TransactionRow";
import { X } from "lucide-react";
import { useBackend } from "../../hooks/useBackend";
import { useAuth } from "../../auth/hooks/useAuth";
import useIndexCanister from "../../canisters/index/hooks/useIndexCanister";
import React from "react";
import { TransactionWithId } from "@dfinity/ledger/dist/candid/icrc1_index";

export default function HistoryPage() {
  const { merchantState } = useBackend();
  const { identity } = useAuth();
  const indexCanister = useIndexCanister();
  const [transactions, setTransactions] = React.useState<
    TransactionWithId[] | null
  >(null);

  React.useEffect(() => {
    if (!indexCanister || !identity) return;
    const getTransactions = async () => {
      const transactions = await indexCanister.getTransactions({
        max_results: 10n,
        account: {
          owner: identity.getPrincipal(),
        },
      });
      setTransactions(transactions.transactions);
      console.log(transactions);
    };
    getTransactions();
  }, [indexCanister, identity]);

  if (!merchantState || !merchantState.merchant || !transactions)
    return <Loading />;

  return (
    <Page>
      <Header>
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        History
        <div className="w-4 h-4" />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-top w-full grow md:h-[30px] md:overflow-y-scroll">
          {transactions.map((transactionWithId, index) => (
            <TransactionRow transaction={transactionWithId} key={index} />
          ))}
        </div>
      </Main>
    </Page>
  );
}
