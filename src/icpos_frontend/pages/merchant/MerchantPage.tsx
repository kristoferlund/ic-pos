import { Cog, LogOut } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import HistoryButton from "../../components/HistoryButton";
import { Link, Navigate } from "@tanstack/router";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import Page from "../../components/Page";
import PrincipalPill from "../../components/PrincipalPill";
import ReceiveButton from "./components/ReceiveButton";
import SendButton from "./components/SendButton";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";

import useLedgerCanister from "../../canisters/ledger/hooks/useLedgerCanister";
import { formatCkBtc } from "../../utils/formatCkBtc";

export default function MerchantPage() {
  const { merchantState } = useBackend();
  const { identity, hasLoggedIn } = useAuth();
  const { balance } = useLedgerCanister();

  // This page requires authentication
  if (!hasLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!merchantState || !merchantState.merchant || !identity)
    return <Loading />;

  return (
    <Page>
      <Header>
        <Link to="/">
          <Button variant="ghost" size="icon">
            <LogOut
              className="w-4 h-4"
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </Button>
        </Link>
        {merchantState?.merchant?.name}
        <Link to="/config">
          <Button variant="ghost" size="icon">
            <Cog className="w-4 h-4" />
          </Button>
        </Link>
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-between pb-10 space-y-5 grow">
          <div className="grow" />
          <div>{formatCkBtc(balance)} ckBTC</div>
          <PrincipalPill principal={identity?.getPrincipal().toString()} />
          <div className="grow" />
          <ReceiveButton />
          <SendButton />
          <div className="flex flex-col items-center justify-end grow">
            <HistoryButton />
          </div>
        </div>
      </Main>
    </Page>
  );
}
