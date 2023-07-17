import { Cog, LogOut } from "lucide-react";
import { Link, Navigate } from "@tanstack/router";

import { Button } from "../../components/ui/button";
import FullpageLoading from "../../components/FullpageLoading";
import HeaderSection from "../../components/HeaderSection";
import HistoryButton from "../../components/HistoryButton";
import MainSection from "../../components/MainSection";
import Page from "../../components/Page";
import PrincipalPill from "../../components/PrincipalPill";
import ReceiveButton from "./components/ReceiveButton";
import SendButton from "./components/SendButton";
import { formatCkBtc } from "../../utils/formatCkBtc";
import { useAuth } from "../../auth/hooks/useAuth";
import useCkBtcLedger from "../../canisters/ckbtc-ledger/hooks/useCkBtcLedger";
import { useIcPos } from "../../canisters/ic-pos/hooks/useIcPos";

export default function MerchantPage() {
  const { merchantState } = useIcPos();
  const { identity, hasLoggedIn, logout } = useAuth();
  const { balance } = useCkBtcLedger();

  // This page requires authentication
  if (!hasLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!merchantState || !merchantState.merchant || !identity)
    return <FullpageLoading />;

  return (
    <Page>
      <HeaderSection>
        <Link to="/">
          <Button variant="ghost" size="icon">
            <LogOut
              className="w-4 h-4"
              onClick={() => {
                logout && logout();
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
      </HeaderSection>
      <MainSection>
        <div className="flex flex-col items-center justify-between pb-10 space-y-5 grow">
          <div className="grow" />
          <div>{formatCkBtc(balance)} ckBTC</div>
          <PrincipalPill principal={identity?.getPrincipal().toString()} />
          <div className="grow" />
          <ReceiveButton />
          <SendButton />
          <div className="flex flex-col items-center justify-end grow">
            <HistoryButton principal={identity?.getPrincipal().toString()} />
          </div>
        </div>
      </MainSection>
    </Page>
  );
}
