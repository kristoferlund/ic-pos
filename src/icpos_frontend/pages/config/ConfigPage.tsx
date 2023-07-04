import { Button } from "../../components/ui/button";
import ConfigForm from "./components/ConfigForm";
import Header from "../../components/Header";
import { Link, Navigate } from "@tanstack/router";
import Main from "../../components/Main";
import Page from "../../components/Page";
import { X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

export default function ConfigPage() {
  const { hasLoggedIn } = useAuth();

  // This page requires authentication
  if (!hasLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Page>
      <Header>
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        <span>Configure Store</span>
        <div className="w-4 h-4" />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-between p-5 pb-10 space-y-5 grow">
          <div className="grow" />
          <ConfigForm />
        </div>
      </Main>
    </Page>
  );
}
