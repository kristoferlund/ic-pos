import { QrCode, X } from "lucide-react";

import { Button } from "../../components/ui/button";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Main from "../../components/Main";
import Page from "../../components/Page";
import SelectPrincipalForm from "./components/SelectPrincipalForm";
import React from "react";
import QRReader from "../../components/QRReader";
import { Result } from "react-zxing";

export default function ReceiveSelectPrincipalPage() {
  const [qrReaderOpen, setQrReaderOpen] = React.useState(false);
  const [principal, setPrincipal] = React.useState("");

  const handleQrResult = (result: Result) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = result as any;
    if (p?.text) {
      setPrincipal(p.toString());
      setQrReaderOpen(false);
    }
  };

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
          onClick={() => setQrReaderOpen(!qrReaderOpen)}
          className="hover:text-black"
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
          <QRReader
            setVisible={setQrReaderOpen}
            visible={qrReaderOpen}
            onResult={handleQrResult}
          />
          {!qrReaderOpen && <SelectPrincipalForm principal={principal} />}
        </div>
      </Main>
    </Page>
  );
}
