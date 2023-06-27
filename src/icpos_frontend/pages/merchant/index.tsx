import { Cog, LogOut } from "lucide-react";

import Accounts from "../../components/Accounts";
import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Page from "../../components/Page";
import ReceiveButton from "./components/ReceiveButton";
import SendButton from "./components/SendButton";
import { shortenPrincipal } from "../../utils/shorten-principal";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";

export default function MerchantPage() {
  const { merchantState } = useBackend();
  const { identity } = useAuth();

  if (!merchantState || !merchantState.merchant) return null;

  return (
    <>
      <Header>
        <Button variant="ghost" size="icon">
          <LogOut
            className="w-4 h-4"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </Button>
        {merchantState.merchant.name}{" "}
        <Link to="/config">
          <Button variant="ghost" size="icon">
            <Cog className="w-4 h-4" />
          </Button>
        </Link>
      </Header>
      <Page>
        <div className="flex flex-col items-center justify-center space-y-5">
          <p>
            {identity?.getPrincipal() &&
              shortenPrincipal(identity.getPrincipal().toString())}
          </p>
          <p>0 ckBTC</p>
          <ReceiveButton />
          <SendButton />
        </div>
      </Page>
    </>
  );
}
