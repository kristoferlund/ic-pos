import { X } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import HistoryButton from "../../components/HistoryButton";
import { Link } from "@tanstack/router";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import Page from "../../components/Page";
import PrincipalPill from "../../components/PrincipalPill";
import { QRCodeSVG } from "qrcode.react";
import TransactionOverlay from "./components/TransactionOverlay";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";

export default function ReceivePage() {
  const { merchantState } = useBackend();
  const { identity } = useAuth();
  const s = window.location.search;
  const params = new URLSearchParams(s);

  if (!params.has("principal")) {
    if (!merchantState || !merchantState.merchant || !identity)
      return <Loading />;
  }

  const principal =
    params.get("principal") || identity?.getPrincipal().toString() || "";

  return (
    <Page>
      <div className="relative flex flex-col grow">
        <Header>
          <Link to={params.has("principal") ? "/" : "/merchant"}>
            <Button variant="ghost" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </Link>
          Receive
          <div className="w-8 h-8" />
        </Header>
        <TransactionOverlay />
        <Main>
          <div className="flex flex-col items-center justify-between flex-1 pt-10 pb-10 space-y-5 grow">
            <div className="text-4xl font-bold">Pay with ckBTC</div>
            <QRCodeSVG value={principal} height={300} width={300} />
            <div className="flex flex-col items-center justify-center space-y-3">
              {!params.has("principal") && (
                <div>{merchantState.merchant?.name}</div>
              )}
              <PrincipalPill principal={principal} />
            </div>
            <HistoryButton />
          </div>
        </Main>
      </div>
    </Page>
  );
}
