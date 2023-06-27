import { Cog, LogOut, X } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Page from "../../components/Page";
import { shortenPrincipal } from "../../utils/shorten-principal";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";

export default function ReceivePage() {
  const { merchantState } = useBackend();
  const { identity } = useAuth();

  if (!merchantState || !merchantState.merchant) return null;

  return (
    <>
      <Header>
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        Receive
        <div className="w-4 h-4" />
      </Header>
      <Page>
        <div className="flex flex-col items-center justify-center space-y-5">
          <p>QR</p>
          <p>
            {merchantState.merchant.name}
            <br />
            {identity?.getPrincipal() &&
              shortenPrincipal(identity.getPrincipal().toString())}
          </p>
          <Button size={"lg"} className="w-48">
            History
          </Button>
        </div>
      </Page>
    </>
  );
}
