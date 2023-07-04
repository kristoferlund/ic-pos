import { QrCode, X } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link, Navigate } from "@tanstack/router";
import Main from "../../components/Main";
import Page from "../../components/Page";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";
import Loading from "../../components/Loading";
import { formatCkBtc } from "../../utils/formatCkBtc";
import PrincipalPill from "../../components/PrincipalPill";
import SendForm from "./components/SendForm";
import useLedgerCanister from "../../canisters/ledger/hooks/useLedgerCanister";

export default function SendPage() {
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
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        Send
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <QrCode className="w-4 h-4" />
          </Button>
        </Link>
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-between p-5 pb-10 space-y-5 grow">
          <div className="grow" />
          <div>{formatCkBtc(balance)} ckBTC</div>
          <PrincipalPill principal={identity?.getPrincipal().toString()} />
          <div className="grow" />
          <SendForm />
        </div>
      </Main>
    </Page>
  );
}
