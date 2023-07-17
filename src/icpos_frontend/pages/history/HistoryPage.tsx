import { Button } from "../../components/ui/button";
import FullpageLoading from "../../components/FullpageLoading";
import HeaderSection from "../../components/HeaderSection";
import { Link } from "@tanstack/router";
import MainSection from "../../components/MainSection";
import Page from "../../components/Page";
import TransactionRow from "./components/TransactionRow";
import { Transactions } from "../../icrc/transactions";
import { X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useRecoilValue } from "recoil";

export default function HistoryPage() {
  const { identity, hasLoggedIn } = useAuth();
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const principal =
    params.get("principal") || identity?.getPrincipal().toString() || "";

  const transactions = useRecoilValue(
    Transactions({ id: principal, limit: 7 })
  );

  if (!transactions) return <FullpageLoading />;

  return (
    <Page>
      <HeaderSection>
        <Link
          to={hasLoggedIn ? "/merchant" : "/receive"}
          search={{ principal }}
        >
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        History
        <div className="w-4 h-4" />
      </HeaderSection>
      <MainSection>
        <div className="flex flex-col items-center justify-top w-full grow md:h-[30px]">
          {transactions.map((transaction, index) => (
            <TransactionRow transaction={transaction} key={index} />
          ))}
        </div>
      </MainSection>
    </Page>
  );
}
