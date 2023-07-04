import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import Page from "../../components/Page";
import TransactionRow from "./components/TransactionRow";
import { X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { Transactions } from "../../icrc/transactions";

export default function HistoryPage() {
  const { identity } = useAuth();
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const principal =
    params.get("principal") || identity?.getPrincipal().toString() || "";

  const transactions = useRecoilValue(
    Transactions({ id: principal, limit: 7 })
  );

  if (!transactions) return <Loading />;

  return (
    <Page>
      <Header>
        <Link
          to={params.has("principal") ? "/receive" : "/merchant"}
          search={params.has("principal") ? { principal } : undefined}
        >
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        History
        <div className="w-4 h-4" />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-top w-full grow md:h-[30px]">
          {transactions.map((transaction, index) => (
            <TransactionRow transaction={transaction} key={index} />
          ))}
        </div>
      </Main>
    </Page>
  );
}
