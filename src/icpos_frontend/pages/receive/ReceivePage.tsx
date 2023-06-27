import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Main from "../../components/Main";
import Page from "../../components/Page";
import { X } from "lucide-react";
import { shortenPrincipal } from "../../utils/shortenPrincipal";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBackend } from "../../hooks/useBackend";
import Loading from "../../components/Loading";

export default function ReceivePage() {
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
        Receive
        <div className="w-4 h-4" />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-center space-y-5">
          <p>QR</p>
          <p>
            {merchantState.merchant.name}
            <br />
            {identity?.getPrincipal() &&
              shortenPrincipal(identity.getPrincipal().toString())}
          </p>
          <Link to="/history">
            <Button size={"lg"} className="w-48">
              History
            </Button>
          </Link>
        </div>
      </Main>
    </Page>
  );
}
