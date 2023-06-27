import { QrCode, X } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Main from "../../components/Main";
import Page from "../../components/Page";
import { shortenPrincipal } from "../../utils/shortenPrincipal";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";
import Loading from "../../components/Loading";

export default function SendPage() {
  const { merchantState } = useBackend();
  const { identity } = useAuth();

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
        <div className="flex flex-col items-center justify-center space-y-5">
          <p>
            {merchantState.merchant.name}
            <br />
            {identity?.getPrincipal() &&
              shortenPrincipal(identity.getPrincipal().toString())}
          </p>
          <p>FORM</p>
          <Button size={"lg"} className="w-48">
            Send
          </Button>
        </div>
      </Main>
    </Page>
  );
}
