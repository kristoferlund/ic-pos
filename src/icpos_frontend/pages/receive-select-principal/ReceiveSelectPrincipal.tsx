import { QrCode, X } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Main from "../../components/Main";
import Page from "../../components/Page";
import SelectPrincipalForm from "./components/SelectPrincipalForm";
import { toast } from "react-hot-toast";

export default function ReceiveSelectPrincipal() {
  return (
    <Page>
      <Header>
        <Link to="/">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        Choose principal
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toast("Not yet implemented");
          }}
        >
          <QrCode className="w-4 h-4" />
        </Button>
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-between p-5 pb-10 space-y-5 grow">
          <div>
            Montitor any ckBTC address for payments. You don't have to sign in
            to access this feature.
          </div>
          <div className="grow" />
          <SelectPrincipalForm />
        </div>
      </Main>
    </Page>
  );
}
