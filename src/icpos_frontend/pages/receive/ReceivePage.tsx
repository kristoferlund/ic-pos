import { Button } from "../../components/ui/button";
import FullpageLoading from "../../components/FullpageLoading";
import HeaderSection from "../../components/HeaderSection";
import HistoryButton from "../../components/HistoryButton";
import { Link } from "@tanstack/router";
import MainSection from "../../components/MainSection";
import Page from "../../components/Page";
import PrincipalPill from "../../components/PrincipalPill";
import { QRCodeSVG } from "qrcode.react";
import TransactionOverlay from "./components/TransactionOverlay";
import { X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useIcPos } from "../../canisters/ic-pos/hooks/useIcPos";

export default function ReceivePage() {
  const { merchantState } = useIcPos();
  const { identity } = useAuth();
  const search = window.location.search;
  const params = new URLSearchParams(search);

  if (!params.has("principal")) {
    if (!merchantState || !merchantState.merchant || !identity)
      return <FullpageLoading />;
  }

  const principal =
    params.get("principal") || identity?.getPrincipal().toString() || "";

  return (
    <Page>
      <div className="relative flex flex-col grow">
        <HeaderSection>
          <Link to={params.has("principal") ? "/" : "/merchant"}>
            <Button variant="ghost" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </Link>
          Receive
          <div className="w-8 h-8" />
        </HeaderSection>
        <TransactionOverlay />
        <MainSection>
          <div className="flex flex-col items-center justify-between flex-1 pt-10 pb-10 space-y-5 grow">
            <div className="text-4xl font-bold">Pay with ckBTC</div>
            <QRCodeSVG value={principal} height={300} width={300} />
            <div className="flex flex-col items-center justify-center space-y-3">
              {!params.has("principal") && (
                <div>{merchantState.merchant?.name}</div>
              )}
              <PrincipalPill principal={principal} />
            </div>
            <HistoryButton principal={principal} />
          </div>
        </MainSection>
      </div>
    </Page>
  );
}
